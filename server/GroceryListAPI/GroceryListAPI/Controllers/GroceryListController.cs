using Dto = GroceryList.Dto;
using Domain = GroceryList.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using GroceryList.Business;
using AutoMapper;

namespace GroceryListAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    public class GroceryListController : ControllerBase
    {
        private readonly IGroceryService _groceryService;
        private readonly IMapper _mapper;

        public GroceryListController(IGroceryService groceryService, IMapper mapper)
        {
            _groceryService = groceryService;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetGroceryList")]
        [Produces(MediaTypeNames.Application.Json, Type = typeof(Dto.GroceryItem[]))]
        public IActionResult GetAll()
        {
            var items = _groceryService.GetAll();
            var dtos = _mapper.Map<Domain.GroceryItem[], Dto.GroceryItem[]>(items);
            return Ok(dtos);
        }
    }
}