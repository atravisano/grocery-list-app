using dto = GroceryList.Dto;
using domain = GroceryList.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mime;
using GroceryList.Business;
using AutoMapper;

namespace GroceryListAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    public class GroceryItemController : ControllerBase
    {
        private readonly IGroceryListService _groceryListService;
        private readonly IMapper _mapper;

        public GroceryItemController(IGroceryListService groceryListService, IMapper mapper)
        {
            _groceryListService = groceryListService;
            _mapper = mapper;
        }

        [HttpPost(Name = "Create Grocery Item")]
        [Produces(MediaTypeNames.Application.Json, Type = typeof(dto.GroceryItem))]
        [ProducesResponseType((int)HttpStatusCode.Created)]
        public IActionResult Post([FromBody] dto.CreateGroceryItem item)
        {
            var newItem = _groceryListService.Create(item);
            var location = Url.RouteUrl(new { Action = "Get", Controller = "GroceryList" });

            var dto = _mapper.Map<domain.GroceryItem, dto.GroceryItem>(newItem);
            return Created(location ?? "", dto);
        }

        [HttpDelete("{id}", Name = "Delete Grocery Item")]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        public IActionResult Delete([FromRoute]int id)
        {
            _groceryListService.Remove(id);
            return NoContent();
        }

    }
}