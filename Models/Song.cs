namespace MusicPortal.Api.Models
{
    public class Song
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;
        public string Artist { get; set; } = null!;

        // FK
        public int GenreId { get; set; }

        // Навігаційна властивість
        public Genre Genre { get; set; } = null!;
    }
}
