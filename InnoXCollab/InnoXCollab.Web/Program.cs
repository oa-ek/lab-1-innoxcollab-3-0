using InnoXCollab.Web.Data;
using InnoXCollab.Web.Models.Domain;
using InnoXCollab.Web.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();

builder.Services.AddDbContext<InnoXCollabContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("InnoXCollabConnectionString")));

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped(typeof(IGenericRepository<Event>), typeof(EventRepository));
builder.Services.AddScoped(typeof(IGenericRepository<Tag>), typeof(TagRepository));
builder.Services.AddScoped<IImageRepository, CloudinaryImageRepository>();




var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
