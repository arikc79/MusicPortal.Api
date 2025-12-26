using Microsoft.EntityFrameworkCore;
using MusicPortal.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Контролери
builder.Services.AddControllers();

// EF Core + SQL Server
builder.Services.AddDbContext<MusicPortalDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Swagger (мінімальна, стабільна конфігурація)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS для React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();
