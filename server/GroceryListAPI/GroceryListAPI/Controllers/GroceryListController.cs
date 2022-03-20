using dto = GroceryList.Dto;
using domain = GroceryList.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mime;

namespace GroceryListAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    public class GroceryListController : ControllerBase
    {
        private readonly ILogger<GroceryListController> _logger;

        public GroceryListController(ILogger<GroceryListController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetGroceryList")]
        [Produces(MediaTypeNames.Application.Json, Type = typeof(dto.GroceryItem[]))]
        public IActionResult Get()
        {
            return Ok(new dto.GroceryItem[]
            {
                new (){ Id = 1, Name = "Tomatoes" },
                new (){ Id = 2, Name = "Milk" }
            });
        }
    }
}