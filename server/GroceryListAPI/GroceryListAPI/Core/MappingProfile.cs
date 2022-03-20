using AutoMapper;
using domain = GroceryList.Domain;
using dto = GroceryList.Dto;

namespace GroceryList.Api.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<domain.GroceryItem, dto.GroceryItem>();
        }
    }
}
