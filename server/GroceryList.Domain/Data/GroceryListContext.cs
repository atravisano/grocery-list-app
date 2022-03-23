using Microsoft.EntityFrameworkCore;

namespace GroceryList.Domain.Data
{
    public class GroceryListContext : DbContext
    {
        public DbSet<GroceryItem>? GroceryItems { get; set; }

        public GroceryListContext(DbContextOptions<GroceryListContext> options) : base(options) { }
    }
}
