namespace GroceryList.Business.Exceptions
{
    public class GroceryItemNotFoundException : Exception
    {
        private readonly int _id;

        public override string Message => $"Grocery item with ID of '{_id}' not found.";

        public GroceryItemNotFoundException(int id)
        {
            _id = id;
        }
    }
}
