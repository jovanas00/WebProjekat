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
    public class DobavljacController: ControllerBase{

        public ProdavnicaContext Context;

        public DobavljacController(ProdavnicaContext context){
            Context=context;
        }


        [Route("DodajDobavljaca/{naziv}/{adresa}/{prodavnicaID}")]
        [HttpPost]
        public async Task<ActionResult> DodajDobavljaca(string naziv, string adresa, int prodavnicaID){
            var prodavnica = await Context.Prodavnice.FindAsync(prodavnicaID);
            if(prodavnica == null){
                return BadRequest("Prodavnica ne postoji!");
            }
            if(string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50)
                return BadRequest("Naziv dobavljaca nije validan!");
            if(string.IsNullOrWhiteSpace(adresa) || adresa.Length > 50)
                return BadRequest("Naziv dobavljaca nije validan!");
            if(prodavnicaID < 0)
                return BadRequest("Prodavnica ne postoji!");
            try{
                Dobavljac dobavljac = new Dobavljac{
                    Naziv = naziv,
                    AdresaFirme = adresa,
                    Prodavnica = prodavnica
                };
                Context.Dobavljaci.Add(dobavljac);
                prodavnica.ListaDobavljaca.Add(dobavljac);
                await Context.SaveChangesAsync();
                return Ok(dobavljac);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiDobavljace/{prodavnicaID}")]
        [HttpGet]
        public async Task<ActionResult> VratiDobavljace(int prodavnicaID)
        {
            var dobavljaci = await Context.Dobavljaci.Where(d => d.Prodavnica.ProdavnicaID==prodavnicaID).Include( p => p.Proizvodi).ToListAsync();
            if(dobavljaci == null)
            {
                return BadRequest("Prodavnica nema dobavljace!");
            }
            if(prodavnicaID < 0)
                return BadRequest("Prodavnica ne postoji!");
            else{
                try{
                    return Ok(dobavljaci);
                }
                catch(Exception e){
                    return BadRequest(e.Message);
                }
            }
        }

        [Route("ObrisiDobavljaca/{dobavljacID}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiDobavljaca(int dobavljacID){
            
            if(dobavljacID <0 ){
                return BadRequest("Greska pri trazenju dobavljaca!");
            }
            
            try{
                var dobavljac = await Context.Dobavljaci.FindAsync(dobavljacID);
                Prodavnica prodavnica = dobavljac.Prodavnica;
                Context.Dobavljaci.Remove(dobavljac);
                await Context.SaveChangesAsync();
                return Ok("Dobavljac uklonjen!");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }       
    }
}