using GroceryList.Domain;

namespace GroceryList.Business
{
    public interface IGroceryListService
    {
        GroceryItem Create(Dto.CreateGroceryItem item);
        GroceryItem[] GetAll();
    }
}