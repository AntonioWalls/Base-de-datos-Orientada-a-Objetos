using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configuración de Swagger para la documentación de la API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuración para evitar ciclos en las respuestas JSON
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// Configuración de CORS
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

// Configuración del pipeline de la aplicación
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(misReglasCors);

app.UseAuthorization();

app.MapControllers();

app.Run();
