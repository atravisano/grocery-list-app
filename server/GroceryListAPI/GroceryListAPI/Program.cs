using System.Reflection;

const string corsPolicyName = "_OnlyConfiguredOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName,
    builder =>
    {
        builder
            .WithOrigins(new string[] { "http://localhost:4200" })
            .WithMethods("GET", "POST", "PUT", "OPTIONS")
            .WithHeaders("Origin", "Content-Type");
            
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
