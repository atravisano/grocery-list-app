using Microsoft.Extensions.DependencyInjection;

namespace GroceryList.Business
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services)
        {
            services.AddScoped<IGroceryListService, GroceryListService>();

            return services;
        }
    }
}
