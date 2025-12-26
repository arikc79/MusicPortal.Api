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

        // DbContext + конфігурація приходять через DI
        public AuthController(
            MusicPortalDbContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/Auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // 1. Шукаємо користувача по імені
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Name == request.Name);

            // 2. Якщо не знайдено — Unauthorized
            if (user == null)
                return Unauthorized("Invalid credentials");

            // 3. Перевірка пароля (СПРОЩЕНО для ДЗ)
            // ❗ Зараз без хешування — тільки для навчання
            if (user.PasswordHash != request.Password)
                return Unauthorized("Invalid credentials");

            // 4. Генеруємо JWT
            var token = GenerateJwtToken(user);

            return Ok(new LoginResponse
            {
                Token = token
            });
        }

        // ---------------- private ----------------

        private string GenerateJwtToken(User user)
        {
            var jwtSection = _configuration.GetSection("Jwt");

            // Claims — дані, які зашиваємо в токен
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role)
            };

            // Ключ підпису
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSection["Key"]!)
            );

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            // Формуємо токен
            var token = new JwtSecurityToken(
                issuer: jwtSection["Issuer"],
                audience: jwtSection["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    int.Parse(jwtSection["ExpiresMinutes"]!)
                ),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
