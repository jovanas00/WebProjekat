using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Models;
using System.Collections.Generic;

namespace Controllers{
    [ApiController]
    [Route("[controller]")]

    public class ProizvodController:ControllerBase{
        public ProdavnicaContext Context;
        public ProizvodController(ProdavnicaContext context){
            Context=context;
        }

        [Route("DodajProizvod/{naziv}/{cena}/{dobavljacID}")]
        [HttpPost]
        public async Task<ActionResult> DodajProizvod(string naziv, int cena, int dobavljacID){
            if(naziv.Length > 50 || string.IsNullOrWhiteSpace(naziv))
                return BadRequest("Unesite validan naziv proizvoda!");

            if(cena < 0)
                return BadRequest("Unesite validnu cenu proizvoda!");

            var dobavljac = await Context.Dobavljaci.FindAsync(dobavljacID);
            if(dobavljac==null){
                return BadRequest("Dobavljac ne postoji");
            }
            try{
                Proizvod proizvod = new Proizvod{
                    Naziv = naziv,
                    Cena = cena,
                    Dobavljac = dobavljac
                };
                Context.Proizvodi.Add(proizvod);
                await Context.SaveChangesAsync();
                return Ok(proizvod);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PrikaziProizvode/{dobavljacID}")]
        [HttpGet]
        public async Task<ActionResult> PrikaziProizvode(int dobavljacID)
        {
            var proizvodi =await Context.Proizvodi.Where(p => p.Dobavljac.DobavljacID==dobavljacID).ToListAsync();
            if(proizvodi == null)
                return BadRequest("Dobavljac nema proizvode!");
            if(dobavljacID < 0)
                return BadRequest("Dobavljac ne postoji!");
            else{
                try{
                    return Ok(proizvodi);
                }
                catch(Exception e){
                    return BadRequest(e.Message);
                }
            }
        }

        [Route("PromeniCenu/{id}/{cena}")]
        [HttpPut]
        public async Task<ActionResult> PromeniCenu(int id,int cena){
            var proizvod = await Context.Proizvodi.FindAsync(id);
            if(proizvod == null)
                return BadRequest("Trazeni proizvod ne postoji!");
            if(id < 0)
                return BadRequest("Proizvod ne postoji!");
            if(cena < 0)
                return BadRequest("Nevalidna cena!");
            try{
                proizvod.Cena=cena;
                await Context.SaveChangesAsync();
                return Ok("Cena uspesno azurirana!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisiProizvod/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiProizvod(int id){
            var proizvod = await Context.Proizvodi.FindAsync(id);
            if(proizvod==null)
                return BadRequest("Trazeni proizvod ne postoji!");
            try{
                var ime= proizvod.Naziv;
                Context.Proizvodi.Remove(proizvod);
                await Context.SaveChangesAsync();
                return Ok($"Proizvod: {ime} je obrisan");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}