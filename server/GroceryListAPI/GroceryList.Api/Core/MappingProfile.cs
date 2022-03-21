using AutoMapper;
using Domain = GroceryList.Domain;
using Dto = GroceryList.Dto;

namespace GroceryList.Api.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.GroceryItem, Dto.GroceryItem>();
        }
    }
}
