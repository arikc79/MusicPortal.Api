using Microsoft.AspNetCore.Mvc;
using MusicPortal.Api.Models;

namespace MusicPortal.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SongsController : ControllerBase
    {
        private static List<Song> songs = new()
        {
            new Song { Id = 1, Title = "Song A", Artist = "Artist A", GenreId = 1 },
            new Song { Id = 2, Title = "Song B", Artist = "Artist B", GenreId = 2 }
        };

        // GET: api/Songs
        [HttpGet]
        public IActionResult GetSongs()
        {
            return Ok(songs);
        }

        // GET: api/Songs/5
        [HttpGet("{id}")]
        public IActionResult GetSong(int id)
        {
            var song = songs.FirstOrDefault(s => s.Id == id);
            if (song == null) return NotFound();
            return Ok(song);
        }

        // POST: api/Songs
        [HttpPost]
        public IActionResult AddSong([FromBody] Song newSong)
        {
            newSong.Id = songs.Any() ? songs.Max(s => s.Id) + 1 : 1;
            songs.Add(newSong);
            return Ok(newSong);
        }

        // PUT: api/Songs/5
        [HttpPut("{id}")]
        public IActionResult UpdateSong(int id, [FromBody] Song updatedSong)
        {
            var song = songs.FirstOrDefault(s => s.Id == id);
            if (song == null) return NotFound();

            song.Title = updatedSong.Title;
            song.Artist = updatedSong.Artist;
            song.GenreId = updatedSong.GenreId;

            return Ok(song);
        }

        // DELETE: api/Songs/5
        [HttpDelete("{id}")]
        public IActionResult DeleteSong(int id)
        {
            var song = songs.FirstOrDefault(s => s.Id == id);
            if (song == null) return NotFound();

            songs.Remove(song);
            return Ok();
        }
    }
}
