namespace MusicPortal.Api.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;     // Логін / імʼя користувача
        public string Email { get; set; } = null!;    // Email

        public string PasswordHash { get; set; } = null!; // Хеш пароля
        public string Role { get; set; } = "Admin";       // Роль (поки тільки Admin)
    }
}
