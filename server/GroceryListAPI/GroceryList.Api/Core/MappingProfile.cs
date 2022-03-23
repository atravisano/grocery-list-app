using AutoMapper;
using Domain = GroceryList.Domain;
using Dto = GroceryList.Dto;

namespace GroceryList.Api.Core
{
    /// <summary>
    /// AutoMapper class that maps domain properties to DTO properties.
    /// </summary>
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.GroceryItem, Dto.GroceryItem>();
        }
    }
}
