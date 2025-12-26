using Microsoft.EntityFrameworkCore;
using MusicPortal.Api.Models;

namespace MusicPortal.Api.Data
{
    public class MusicPortalDbContext : DbContext
    {
        
        public MusicPortalDbContext(DbContextOptions<MusicPortalDbContext> options)
            : base(options)
        {
        }

        // Таблиці БД
        public DbSet<User> Users => Set<User>();
        public DbSet<Song> Songs => Set<Song>();
        public DbSet<Genre> Genres => Set<Genre>();
    }
}
