using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryList.Dto
{
    public class CreateGroceryItem
    {
        [Required]
        public string? Name { get; set; }
    }
}
