using dto = GroceryList.Dto;
using domain = GroceryList.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using GroceryList.Business;
using AutoMapper;
using System.ComponentModel.DataAnnotations;
using GroceryList.Business.Exceptions;

namespace GroceryListAPI.Controllers
{
    [ApiController]
    [Route("groceries")]
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

        /// <summary>
        /// Add To Grocery List
        /// </summary>
        /// <param name="item">New grocery item</param>
        /// <returns>New grocery item with an ID</returns>
        /// <response code="201">Item added</response>
        /// <response code="400">One or more validation issues with the request</response>
        [HttpPost(Name = "Create Grocery Item")]
        [Produces(MediaTypeNames.Application.Json, Type = typeof(dto.GroceryItem))]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ProblemDetails))]
        public IActionResult Post([FromBody, Required] dto.CreateGroceryItem item)
        {
            var newItem = _groceryListService.Create(item);
            var dto = _mapper.Map<domain.GroceryItem, dto.GroceryItem>(newItem);
            return Created("/groceries", dto);
        }

        /// <summary>
        /// Remove From Grocery List
        /// </summary>
        /// <param name="id">ID of the grocery item</param>
        /// <response code="204">Item deleted</response>
        /// <response code="404">Item not found</response>
        [HttpDelete("{id}", Name = "Delete Grocery Item")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Delete([FromRoute, Required] int id)
        {
            try
            {
              _groceryListService.Remove(id);
              return NoContent();
            }
            catch (GroceryItemNotFoundException)
            {
                return NotFound();
            }
        }

    }
}