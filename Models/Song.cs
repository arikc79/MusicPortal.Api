namespace MusicPortal.Api.Models
{
    public class Song
    {
        public int Id { get; set; }          // Унікальний ідентифікатор
        public string? Title { get; set; }    // Назва пісні
        public string? Artist { get; set; }   // Виконавець
        public int GenreId { get; set; }     // Зв’язок із жанром
    }
}
