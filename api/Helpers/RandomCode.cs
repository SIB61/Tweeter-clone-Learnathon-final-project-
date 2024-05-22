using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace api.Helpers
{
    public  class RandomCode
    {
        public  string randomCode(int length)  
        {  
            string validChars = "0123456789";  
            Random random = new Random();  
            char[] chars = new char[length];  
            for (int i = 0; i < length; i++)  
            {  
                chars[i] = validChars[random.Next(0, validChars.Length)];  
            }  
            return new string(chars);
        }  



        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}