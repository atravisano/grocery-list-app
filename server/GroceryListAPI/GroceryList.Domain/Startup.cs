using GroceryList.Domain.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryList.Domain
{
    public static class Startup
    {
        public static void ConfigureServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            services
                .AddEntityFrameworkSqlServer()
                .AddDbContext<GroceryListContext>(p => p.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=GroceryList;Trusted_Connection=True;MultipleActiveResultSets=true"));
        }

        public static void Configure(IApplicationBuilder app)
        {
            // Migrate the database to the latest version on application startup.
            var serviceScopeFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
            using var serviceScope = serviceScopeFactory.CreateScope();
            serviceScope?.ServiceProvider?.GetService<GroceryListContext>()?.Database.Migrate();
        }
    }
}
