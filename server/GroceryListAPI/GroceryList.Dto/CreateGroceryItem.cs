using System.ComponentModel.DataAnnotations;

namespace GroceryList.Dto
{
    public class CreateGroceryItem
    {
        [Required]
        public string? Name { get; set; }
    }
}
