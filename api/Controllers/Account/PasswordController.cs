using System.Security.Cryptography;
using System.Text;
using api.Dtos;
using api.Helper;
using api.Helpers;
using api.Middleware;
using AutoMapper;
using core.Interfaces;
using core.Interfaces.Email;
using core.Interfaces.Redis;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Account
{
    [ApiController]
    [Route("[controller]")]
    public class PasswordController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        private readonly IRedisService _resetCode;
        private readonly IMailService _mail;
        private readonly IMapper _mapper;


        public PasswordController(IRedisService resetCode, IUnitOfWork unitOfWork, ITokenService tokenService,IMailService mail, IMapper mapper)
        {
           
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
            _mail = mail;
            _mapper = mapper;
            _resetCode = resetCode;
        }

    
       
        [HttpPost("forget-password")]
        public async Task<IActionResult> ForgetPassword(string email)
        {

            if(!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.Email == email))
                return NotFound(new Response<string>("Email doesn't Exits"));
            
            var code = new RandomCode().randomCode(6);

            var userName = await _unitOfWork.UserRepository.FilterOneAsync(filter => filter.Email == email, projectionExpression: filter => filter.UserName);

            bool result = await _mail.SendAsync(email, userName, code, new CancellationToken());


            if(result ){
                await _resetCode.SetAsync(email+code, code, TimeSpan.FromMinutes(5));
                return Ok(new Response<string>("Code has been send to " + email));
            }

            return BadRequest(new Response<String>("An error ocured"));
        }


        [HttpGet]
        [Route("resetcode-check")]
        public async Task<IActionResult> ResetCodeCheck(string code, string email)
        {
            return await _resetCode.GetAsync(email+code) == code ? Ok(new Response<bool>(true)) : BadRequest(new Response<bool>(false));
        }


        [HttpPost]
        [Route("code-password")]
        public async Task<IActionResult> ResetPassword(CodeDto codeDto)
        {
            if(await _resetCode.GetAsync(codeDto.Email+codeDto.Code) != codeDto.Code)
                return NotFound(new Response<String>("Invalid or Expired Code"));

    
            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.Email == codeDto.Email);

            using var hmac = new HMACSHA512();

            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(codeDto.Password));
            user.PasswordSalt = hmac.Key;

            _unitOfWork.UserRepository.ReplaceOneAsync(user.id, user);

            if(await _unitOfWork.Commit()) {
                await _resetCode.DeleteAsync(codeDto.Email+codeDto.Code);
                 return Ok(new Response<String>("Password Reset Successfully"));

            }
            return BadRequest(new Response<String>("Error"));
        } 
        


        [Authorize]
        [HttpPost]
        [Route("change-password")]
        public async Task<IActionResult> ChangePassword(PasswordChange passwordChange)
        {
            if(!ModelState.IsValid) return BadRequest(new string("Not Valid Model"));
            
            if(!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.id == User.GetUserId())) return NotFound(new Response<string>("Not found"));

        
            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == User.GetUserId());
        
        
            using var checkHmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = checkHmac.ComputeHash(Encoding.UTF8.GetBytes(passwordChange.oldPassword));

            for(int i = 0; i < computedHash.Length; i++){
                if(computedHash[i] != user.PasswordHash[i]){
                    return BadRequest(new Response<String>("Wrong Password"));
                }
            }

            using var hmac = new HMACSHA512();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordChange.newPassword));
            user.PasswordSalt = hmac.Key;

            _unitOfWork.UserRepository.ReplaceOneAsync(user.id, user);
          
        
            return await _unitOfWork.Commit() ? Ok(new Response<string>("Changed Password")): BadRequest(new Response<string>("Error while changing password"));
        }
    }
}