using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GroceryList.Business
{
    public static class Startup
    {
        public static void ConfigureServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddScoped<IGroceryListService, GroceryListService>();
        }
    }
}
