using GroceryList.Domain;

namespace GroceryList.Business
{
    public interface IGroceryService
    {
        GroceryItem[] GetAll();
    }
}