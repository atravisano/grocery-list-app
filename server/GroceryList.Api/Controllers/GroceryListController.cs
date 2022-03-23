using Dto = GroceryList.Dto;
using Domain = GroceryList.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using GroceryList.Business;
using AutoMapper;

namespace GroceryListAPI.Controllers
{
    [ApiController]
    [Route("groceries")]
    [Produces(MediaTypeNames.Application.Json)]
    public class GroceryListController : ControllerBase
    {
        private readonly IGroceryListService _groceryListService;
        private readonly IMapper _mapper;

        public GroceryListController(IGroceryListService groceryService, IMapper mapper)
        {
            _groceryListService = groceryService;
            _mapper = mapper;
        }

        /// <summary>
        /// Grocery List
        /// </summary>
        /// <returns>List of all grocery shopping items</returns>
        /// <response code="200">Success</response>
        [HttpGet(Name = "Grocery List")]
        [Produces(MediaTypeNames.Application.Json, Type = typeof(Dto.GroceryItem[]))]
        public IActionResult GetAll()
        {
            var items = _groceryListService.GetAll();
            var dtos = _mapper.Map<Domain.GroceryItem[], Dto.GroceryItem[]>(items);
            return Ok(dtos);
        }
    }
}