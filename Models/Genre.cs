using System.Collections.Generic;

namespace MusicPortal.Api.Models
{
    public class Genre
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        // Навігаційна колекція 
        public ICollection<Song> Songs { get; set; } = new List<Song>();
    }
}
