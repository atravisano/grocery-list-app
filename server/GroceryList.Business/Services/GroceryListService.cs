using GroceryList.Business.Exceptions;
using GroceryList.Domain;
using GroceryList.Domain.Data;
using Dto = GroceryList.Dto;

namespace GroceryList.Business
{
    public class GroceryListService : IGroceryListService
    {
        private readonly GroceryListContext _context;

        public GroceryListService(GroceryListContext context)
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

        public GroceryItem Create(Dto.CreateGroceryItem item)
        {
            var newItem = new GroceryItem()
            {
                Name = item.Name
            };

            _context.GroceryItems?.Add(newItem);
            _context.SaveChanges();

            return newItem;
        }

        public void Remove(int id)
        {
            var item = _context.GroceryItems?.FirstOrDefault(x => x.Id == id);
            if (item is null)
            {
                throw new GroceryItemNotFoundException(id);
            }

            _context.GroceryItems?.Remove(item);
            _context.SaveChanges();
        }
    }
}