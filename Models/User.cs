namespace MusicPortal.Api.Models
{
    public class User
    {
        public int Id { get; set; }       // Унікальний ідентифікатор
        
        public   string? Name { get; set; }  // Ім’я користувача
        public    string? Email { get; set; } // Email користувача
    }
}
