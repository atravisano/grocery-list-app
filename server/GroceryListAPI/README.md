# Grocery List API

A .NET 6 application that stores the shopping list items in a database using Entity Framework Core.

## Project Structure

### API

An ASP.NET Core Web API project used to deliver data to any client.

### Business

Business is meant for services. For example, retrieving grocery items from a Grocery-List service.

### Domain

Stores Entity Framework models and configuration. As a rule, domain logic should be stored in the Business project.

### DTO

The Data transfer objects project is meant to create a simple model for the calling code that does not show sensitive data and does not show irrelevant data to the calling client. DTOs are common when mapping from an Entity Framework model.

## Running the Project

First, you'll need .NET 6 or Visual Studio 2022 installed.

Then, you'll need to update your database to the current version. You can use the command prompt to update your entity framework database using `dotnet ef` or you can use the Package Manager Console (with the default project pointing to `core-blog.domain`) and run `Update-Database`. This runs all of the migrations and creates the database in its current form

Finally, run the project in Visual Studio 2022 or by running the command `dotnet run --project .\GroceryList.Api\GroceryList.Api.csproj`. Optionally, you can open your browser and go to <https://localhost:7050/swagger/index.html> if you'd like to test the API with Swagger.
