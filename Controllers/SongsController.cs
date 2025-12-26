using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicPortal.Api.Data;
using MusicPortal.Api.Models;
using Microsoft.AspNetCore.Authorization;


namespace MusicPortal.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class SongsController : ControllerBase
    {
        private readonly MusicPortalDbContext _context;

        public SongsController(MusicPortalDbContext context)
        {
            _context = context;
        }

        // GET: api/Songs
        [HttpGet]
        public async Task<IActionResult> GetSongs()
        {
            var songs = await _context.Songs
                .Include(s => s.Genre)
                .ToListAsync();

            return Ok(songs);
        }

        // GET: api/Songs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSong(int id)
        {
            var song = await _context.Songs
                .Include(s => s.Genre)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (song == null)
                return NotFound();

            return Ok(song);
        }

        // POST: api/Songs
        [HttpPost]
        public async Task<IActionResult> AddSong([FromBody] Song newSong)
        {
            _context.Songs.Add(newSong);
            await _context.SaveChangesAsync();

            return Ok(newSong);
        }

        // PUT: api/Songs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSong(int id, [FromBody] Song updatedSong)
        {
            var song = await _context.Songs.FindAsync(id);
            if (song == null)
                return NotFound();

            song.Title = updatedSong.Title;
            song.Artist = updatedSong.Artist;
            song.GenreId = updatedSong.GenreId;

            await _context.SaveChangesAsync();

            return Ok(song);
        }

        // DELETE: api/Songs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSong(int id)
        {
            var song = await _context.Songs.FindAsync(id);
            if (song == null)
                return NotFound();

            _context.Songs.Remove(song);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
