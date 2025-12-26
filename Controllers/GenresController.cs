using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicPortal.Api.Data;
using MusicPortal.Api.Models;

namespace MusicPortal.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly MusicPortalDbContext _context;

        public GenresController(MusicPortalDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetGenres()
        {
            return Ok(await _context.Genres.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGenre(int id)
        {
            var genre = await _context.Genres.FindAsync(id);
            return genre == null ? NotFound() : Ok(genre);
        }

        [HttpPost]
        public async Task<IActionResult> AddGenre(Genre genre)
        {
            _context.Genres.Add(genre);
            await _context.SaveChangesAsync();
            return Ok(genre);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGenre(int id, Genre updated)
        {
            var genre = await _context.Genres.FindAsync(id);
            if (genre == null) return NotFound();

            genre.Name = updated.Name;
            await _context.SaveChangesAsync();
            return Ok(genre);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            var genre = await _context.Genres.FindAsync(id);
            if (genre == null) return NotFound();

            _context.Genres.Remove(genre);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
