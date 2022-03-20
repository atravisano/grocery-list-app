using System.ComponentModel.DataAnnotations;

namespace GroceryList.Domain
{
    public class GroceryItem
    {
        [Required]
        public string? Name { get; set; }
    }
}