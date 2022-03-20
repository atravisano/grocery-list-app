using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryList.Domain.Data
{
    public class GroceryListContext : DbContext
    {
        public DbSet<GroceryItem>? GroceryItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=GroceryList;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
    }
}
