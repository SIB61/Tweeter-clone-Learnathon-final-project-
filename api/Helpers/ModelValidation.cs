
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using api.Dtos;

namespace api.Helpers
{
    public class Min18Years : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var user = (Signup)validationContext.ObjectInstance;

            if (user.DateOfBirth == null)
                return new ValidationResult("Date of Birth is required.");

            var age = DateTime.Today.Year - user.DateOfBirth.Year;

            return (age >= 18)
                ? ValidationResult.Success
                : new ValidationResult("Student should be at least 18 years old.");
        }
    }

    public class CodePasswordValidation : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var user = (CodeDto)validationContext.ObjectInstance;
            
            var passWord = user.Password;
            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasMinimum6Chars = new Regex(@".{6,}");

            var isValidated = hasNumber.IsMatch(user.Password) && hasUpperChar.IsMatch(user.Password) && hasMinimum6Chars.IsMatch(user.Password);

            if (!isValidated) return new ValidationResult("Must Include a Number && a upperCase and Length 8");

            return ValidationResult.Success;
        }
    }

    public class ValidatePassword : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var user = (Signup)validationContext.ObjectInstance;

            var passWord = user.Password;
            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasMinimum6Chars = new Regex(@".{6,}");

            var isValidated = hasNumber.IsMatch(user.Password) && hasUpperChar.IsMatch(user.Password) && hasMinimum6Chars.IsMatch(user.Password);

            if (!isValidated) return new ValidationResult("Must Include a Number && a upperCase and Length 6");

            return ValidationResult.Success;
        }
    }

    public class ChangePassword : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var password = (PasswordChange)validationContext.ObjectInstance;


            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasMinimum6Chars = new Regex(@".{6,}");

            var isValidated = hasNumber.IsMatch(password.newPassword) && hasUpperChar.IsMatch(password.newPassword) && hasMinimum6Chars.IsMatch(password.newPassword);


            if (!isValidated) return new ValidationResult("Must Include a Number && a upperCase and Length 6");

            return ValidationResult.Success;
        }
    }
}