using Microsoft.EntityFrameworkCore;
using listApp.Models;

namespace listApp.Data
{
    public class listContext : DbContext
    {
        public DbSet<list> list { get; set;}       
         public DbSet<item> item { get; set;}       

         protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source = ListDb.db");
    }
}