using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MusicPortal.Api.Data;
using MusicPortal.Api.DTOs;
using MusicPortal.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MusicPortal.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly MusicPortalDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(
            MusicPortalDbContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Name == request.Name);

            if (user == null || user.PasswordHash == null)
                return Unauthorized("Invalid credentials");

            if (user.PasswordHash.Trim() != request.Password.Trim())
                return Unauthorized("Invalid credentials");

            // 🔐 ГЕНЕРАЦІЯ JWT
            var jwtSection = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSection["Key"]!)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSection["Issuer"],
                audience: jwtSection["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            // ❗ ВАЖЛИВО: ПОВЕРТАЄМО ОБʼЄКТ З token
            return Ok(new LoginResponse
            {
                Token = tokenString
            });
        }
    }
}
