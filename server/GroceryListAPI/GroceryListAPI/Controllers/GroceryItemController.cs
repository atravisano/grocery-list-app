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
    public class GroceryItemController : ControllerBase
    {
        private readonly ILogger<GroceryItemController> _logger;

        public GroceryItemController(ILogger<GroceryItemController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "Create Grocery Item")]
        [Produces(MediaTypeNames.Application.Json, Type = typeof(dto.GroceryItem))]
        [ProducesResponseType((int)HttpStatusCode.Created)]
        public IActionResult Post([FromBody] dto.CreateGroceryItem item)
        {
            var location = Url.RouteUrl(new { Action = "Get", Controller = "GroceryList" });
            if (location == null)
            {
                return NotFound(); // temp
            }
            return Created(location, new dto.GroceryItem() { Id = 1, Name = item.Name });
        }

    }
}