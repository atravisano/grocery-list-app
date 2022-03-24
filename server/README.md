# Grocery List API

This is a .NET 6 application that stores, adds, or deletes shopping list items in a database using Entity Framework Core.

## Project Structure

### API

This is an ASP.NET Core Web API project used to deliver data to any client.

### Business

This Business project is meant for services. For example, retrieving grocery items from a Grocery-List service.

### Domain

This project stores Entity Framework models and configuration. As a rule, domain logic should be stored in the Business project.

### DTO

The Data Transfer Objects project is designed to create a simple model for the calling code that does not show sensitive or irrelevant data to the calling client. DTOs are common when mapping from an Entity Framework model.

## Running the Project

To use this demo, you will first need to install .NET 6 or Visual Studio 2022. You will also need to install SQL Server.

You will then need to update your database to the latest version.

### Command Line

Use the command prompt to update your entity framework database using `dotnet ef database update --project GroceryList.Api/GroceryList.Api.csproj`.

### Package Manager Console

Use the Package Manager Console in Visual Studio (with the default project `GroceryList.Api` selected) and run `Update-Database`. This runs all of the migrations and creates the database in its current form.

Finally, run the project in Visual Studio 2022 or by running the command `dotnet run --project .\GroceryList.Api\GroceryList.Api.csproj`. If you would like to test the API with Swagger, you can open your browser and go to <https://localhost:7050/swagger/index.html>.
