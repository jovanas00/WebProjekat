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
    public class ProdavnicaController : ControllerBase{
        public ProdavnicaContext Context;
        public ProdavnicaController(ProdavnicaContext context)
        {
            Context=context;
        }

        [Route("DodajProdavnicu/{naziv}/{adresa}")]
        [HttpPost]
        public async Task<ActionResult> DodajProdavnicu(string naziv,string adresa)
        {
            
            if(naziv.Length>50 || string.IsNullOrWhiteSpace(naziv) )
                return BadRequest("Nevalidan naziv!");
            if(adresa.Length>50 || string.IsNullOrWhiteSpace(adresa) )
                return BadRequest("Nevalidna adresa!");
            try{
                Prodavnica prodavnica= new Prodavnica{
                    Naziv = naziv,
                    Adresa = adresa
                };
                Context.Prodavnice.Add(prodavnica);
                await Context.SaveChangesAsync();
                return Ok(prodavnica);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [Route("PrikaziProdavnice")]
        [HttpGet]
        public async Task<ActionResult> PrikaziProdavnice()
        {
            var prodavnice = Context.Prodavnice.Include(p => p.ListaDobavljaca);
            try{
                var prodavnica = await prodavnice.ToListAsync();
                return Ok(prodavnica);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Obrisi/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiProdavnicu(int id){
    
            if(id < 0)
                return BadRequest("Prodavnica ne postoji!");
            try{
                var prodavnica = await Context.Prodavnice.FindAsync(id);
                Context.Prodavnice.Remove(prodavnica);
                await Context.SaveChangesAsync();
                return Ok("Prodavnica uspešno uklonjena!");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}