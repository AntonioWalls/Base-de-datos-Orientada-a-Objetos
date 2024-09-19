using Microsoft.EntityFrameworkCore;
using API_AntonioWalls.Models;
using System.Text.Json.Serialization;
using API_AntonioWalls.Models_Instancia1;
using AutoMapper;
using API_AntonioWalls.Mappings;
using Microsoft.Extensions.DependencyInjection;
using API_AntonioWalls.Models_Instancia2;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//agregando automapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);
builder.Services.AddAutoMapper(typeof(MappingProfile2).Assembly);

//Aquí es donde se agregan los contextos de la base de datos, en este caso son llamados LinkedServerContext
//Sucursal1Context y Sucursal2Context

builder.Services.AddDbContext<LinkedServerContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("cadenaSQL")));
builder.Services.AddDbContext<Sucursal1Context>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("cadenaSQL2")));
builder.Services.AddDbContext<Sucursal2Context>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("cadenaSQL3")));


builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

var misReglasCors = "ReglasCors";
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: misReglasCors, builder =>
    {
        builder.AllowAnyHeader();
        builder.AllowAnyOrigin();
        builder.AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(misReglasCors);

app.UseAuthorization();

app.MapControllers();

app.Run();
