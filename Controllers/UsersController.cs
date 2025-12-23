using Microsoft.AspNetCore.Mvc;
using MusicPortal.Api.Models;

namespace MusicPortal.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        // Тимчасове сховище 
        private static List<User> users = new()
        {
            new User { Id = 1, Name = "admin", Email = "admin@music.com" },
            new User { Id = 2, Name = "user1", Email = "user1@music.com" }
        };

        // GET: api/users
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(users);
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public IActionResult AddUser([FromBody] User newUser)
        {
            newUser.Id = users.Max(u => u.Id) + 1;
            users.Add(newUser);
            return Ok(newUser);
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User updatedUser)
        {
            var user = users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound();

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            return Ok(user);
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound();

            users.Remove(user);
            return Ok();
        }
    }
}
