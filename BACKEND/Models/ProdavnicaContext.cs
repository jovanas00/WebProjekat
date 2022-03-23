using Microsoft.EntityFrameworkCore;

namespace Models{
    public class ProdavnicaContext:DbContext
    {
        public DbSet<Prodavnica> Prodavnice { get; set; }
        public DbSet<Dobavljac> Dobavljaci { get; set; }
        public DbSet<Proizvod> Proizvodi { set; get; }

        public ProdavnicaContext(DbContextOptions options): base(options)
        {}
    }
}