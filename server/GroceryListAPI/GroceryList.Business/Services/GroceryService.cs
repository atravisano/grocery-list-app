using GroceryList.Domain;
using GroceryList.Domain.Data;

namespace GroceryList.Business
{
    public class GroceryService : IGroceryService
    {
        private readonly GroceryListContext _context;

        public GroceryService(GroceryListContext context)
        {
            _context = context;
        }

        public GroceryItem[] GetAll()
        {
            var items = _context.GroceryItems;
            if (items == null)
            {
                return Array.Empty<GroceryItem>();
            }

            return items.ToArray();
        }
    }
}