using Microsoft.OpenApi.Models;
using System.Reflection;

const string corsPolicyName = "_OnlyConfiguredOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var origins = builder.Configuration.GetValue<string>("CorsOrigins").Split(";");
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName,
    builder =>
    {
        builder
            .WithOrigins(origins)
            .WithMethods("GET", "POST", "OPTIONS", "DELETE")
            .WithHeaders("Origin", "Content-Type");
            
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
    options.SwaggerDoc("v1", new OpenApiInfo() { Title = "Grocery Shopping List API", Version = "v1" });
});

// Dependency Injection
builder.Services.AddAutoMapper(typeof(Program).GetTypeInfo().Assembly);
GroceryList.Domain.Startup.ConfigureServices(builder.Services, builder.Configuration);
GroceryList.Business.Startup.ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors(corsPolicyName);

app.MapControllers();

app.Run();
