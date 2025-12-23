using Microsoft.AspNetCore.Mvc;
using MusicPortal.Api.Models;

namespace MusicPortal.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private static List<Genre> genres = new()
        {
            new Genre { Id = 1, Name = "Rock" },
            new Genre { Id = 2, Name = "Pop" },
        };

        // GET: api/Genres
        [HttpGet]
        public IActionResult GetGenres()
        {
            return Ok(genres);
        }

        // GET: api/Genres/5
        [HttpGet("{id}")]
        public IActionResult GetGenre(int id)
        {
            var genre = genres.FirstOrDefault(g => g.Id == id);
            if (genre == null) return NotFound();
            return Ok(genre);
        }

        // POST: api/Genres
        [HttpPost]
        public IActionResult AddGenre([FromBody] Genre newGenre)
        {
            newGenre.Id = genres.Any() ? genres.Max(g => g.Id) + 1 : 1;
            genres.Add(newGenre);
            return Ok(newGenre);
        }

        // PUT: api/Genres/5
        [HttpPut("{id}")]
        public IActionResult UpdateGenre(int id, [FromBody] Genre updatedGenre)
        {
            var genre = genres.FirstOrDefault(g => g.Id == id);
            if (genre == null) return NotFound();

            genre.Name = updatedGenre.Name;
            return Ok(genre);
        }

        // DELETE: api/Genres/5
        [HttpDelete("{id}")]
        public IActionResult DeleteGenre(int id)
        {
            var genre = genres.FirstOrDefault(g => g.Id == id);
            if (genre == null) return NotFound();

            genres.Remove(genre);
            return Ok();
        }
    }
}
