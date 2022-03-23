using GroceryList.Domain.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GroceryList.Domain
{
    public static class Startup
    {
        public static void ConfigureServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddDbContext<GroceryListContext>(p => p.UseSqlServer(configuration.GetConnectionString("localdb")));
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
