using System.ComponentModel.DataAnnotations;

namespace GroceryList.Domain
{
    public class GroceryItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }
    }
}