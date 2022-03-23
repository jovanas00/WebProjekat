import { Proizvod } from "./Proizvod.js";
import { brisiDobavljace } from "./Prodavnica.js";

export class Dobavljac{
    constructor(dobavljacID, naziv, adresaFirme){
        this.dobavljacID = dobavljacID;
        this.naziv = naziv;
        this.adresaFirme = adresaFirme;
        this.listaProizvoda = [];
        this.container = null;
    }

    crtajDobavljaca(host){
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML=this.naziv;
        tr.appendChild(el);
        el = document.createElement("td");
        el.innerHTML=this.adresaFirme;
        tr.appendChild(el);
    }
    

    preuzmiProizvode(){
        fetch("https://localhost:5001/Proizvod/PrikaziProizvode/"+this.dobavljacID,
        {
            method:"GET"
        }).then(r => {
            if(r.ok){
                r.json().then(proizvodi =>{
                    this.listaProizvoda = [];
                    proizvodi.forEach(proizvod => {
                        let p = new Proizvod(proizvod.proizvodID, proizvod.naziv, proizvod.cena);
                        this.listaProizvoda.push(p);
                    });
                })
            }
            else{
                r.text().then(r=>console.log(r));
            }
        })
    }

    dodajProizvod(naziv, cena){
        if(naziv == "" || cena == ""){
            alert("Unesite ispravne podatke");
            return;
        }
        // if(cena <= 0 || typeof(cena) !== "number"){
        //     alert("Unesite ispravnu cenu");
        //     return;
        // }

        fetch("https://localhost:5001/Proizvod/DodajProizvod/"+naziv+"/"+cena+"/"+this.dobavljacID,
        {
            method:"POST",
            header:{
                'Content-Type':'application/json'
            }
        }).then(r => {
            if(r.ok){
                var teloTabele = obrisiPrethodniSadrzaj();
                console.log(teloTabele);
                r.json().then(proizvod =>{
                    var p = new Proizvod(proizvod.proizvodID, proizvod.naziv, proizvod.cena);
                    this.listaProizvoda.push(p);
                    p.crtajProizvod(teloTabele);
                })
            }
        })
    }

    prikaziSveProizvode(host){
        this.preuzmiProizvode();
        
        let proizvodiDiv = document.createElement("div");
        proizvodiDiv.className = "proizvodiDobavljacaDiv";
        host.appendChild(proizvodiDiv);

        let dobavljacDiv = document.createElement("div");
        dobavljacDiv.className = "dobavljacDiv";
        proizvodiDiv.appendChild(dobavljacDiv);
            
        let nazivDobavljaca = document.createElement("h3");
        nazivDobavljaca.className = "dobavljacPodaci";
        nazivDobavljaca.innerHTML = "Naziv dobavljaca: "+this.naziv;
        dobavljacDiv.appendChild(nazivDobavljaca);

        let adresaDobavljaca = document.createElement("label");
        adresaDobavljaca.className = "dobavljacPodaci";
        adresaDobavljaca.innerHTML = "Adresa dobavljaca: "+this.adresaFirme;
        dobavljacDiv.appendChild(adresaDobavljaca);

    	let proizvodDiv = document.createElement("div");
        proizvodDiv.className = "prozvodDobavljacDiv";
        proizvodiDiv.appendChild(proizvodDiv);

        this.crtajPrikazProizvodi(proizvodDiv);
        var teloTabele = obrisiPrethodniSadrzaj();
        this.listaProizvoda.forEach((proizvod) => {
            proizvod.crtajProizvod(teloTabele);
        })
    }

    crtajPrikazProizvodi(host){

        let kontPrikaz = document.createElement("div");
        kontPrikaz.className="Prikaz";
        host.appendChild(kontPrikaz);

        var tabela = document.createElement("table");
        tabela.className="tabela";
        kontPrikaz.appendChild(tabela);

        var tabelahead= document.createElement("thead");
        tabela.appendChild(tabelahead);

        var tr = document.createElement("tr");
        tabelahead.appendChild(tr);

        var tabelaBody = document.createElement("tbody");
        tabelaBody.className="TabelaPodaci";
        tabela.appendChild(tabelaBody);

        let th;
        var zag=["Naziv", "Cena/din"];
        zag.forEach(el=>{
            th = document.createElement("th");
            th.innerHTML=el;
            tr.appendChild(th);
        })
    }

    
    // brisiSadrzaj(){
    //     var dete = document.querySelector(".novaCenaDiv");
    //     var roditelj = dete.parentNode;
    //     roditelj.removeChild(dete);
    // }
}

export function obrisiPrethodniSadrzaj()
    {
    var telo = document.querySelector(".TabelaPodaci");
    var roditelj = telo.parentNode;
        roditelj.removeChild(telo);

        var teloTabele = document.createElement("tbody");
        teloTabele.className="TabelaPodaci";
        roditelj.appendChild(teloTabele);
        return teloTabele;    
}