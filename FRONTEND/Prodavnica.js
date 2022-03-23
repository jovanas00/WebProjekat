import { Dobavljac, obrisiPrethodniSadrzaj } from "./Dobavljac.js";
import { crtajOpet } from "./main.js";

export class Prodavnica{
    constructor(prodavnicaID, naziv, adresa){
        this.prodavnicaID = prodavnicaID;
        this.naziv = naziv;
        this.adresa = adresa;
        this.container = null;
        this.listaDobavljaca = [];
    }

    crtajProdavnicu(host){
        this.container = document.createElement("div");
        this.container.className = "prodavnicaDiv";
        host.appendChild(this.container);

        let prodavnica = document.createElement("div");
        prodavnica.className = "prodavnicaSadrzaj";
        this.container.appendChild(prodavnica);

        let nazad = document.createElement("button");
        nazad.innerHTML = "❮❮❮";
        nazad.className = "vratiSe";
        prodavnica.appendChild(nazad);
        nazad.onclick = (ev) => crtajOpet();

        let naziv = document.createElement("h2");
        naziv.innerHTML = "Naziv: "+this.naziv;
        naziv.className = "nazivProdavnice";
        prodavnica.appendChild(naziv);

        let adresa = document.createElement("h4");
        adresa.innerHTML = "Adresa: "+this.adresa;
        adresa.className = "adresaProdavnice";
        prodavnica.appendChild(adresa);

        let dobavljaci = document.createElement("div");
        dobavljaci.className = "dobavljaci";
        this.container.appendChild(dobavljaci);
        this.preuzmiDobavljace(dobavljaci);
    }

    preuzmiDobavljace(host){
        fetch("https://localhost:5001/Dobavljac/VratiDobavljace/"+this.prodavnicaID,
        {
            method:"GET"

        }).then(r => {
            if(r.ok)
            {
                r.json().then(dobavljaci =>{
                    this.listaDobavljaca = [];
                    dobavljaci.forEach(dobavljac => {
                        let d = new Dobavljac(dobavljac.dobavljacID, dobavljac.naziv, dobavljac.adresaFirme);
                        this.listaDobavljaca.push(d);
                        console.log(d);
                        d.preuzmiProizvode();
                    });
                    this.proizvodiForma(host);
                })
            }
            else{
                r.text().then(r => console.log(r));
            }
        })
    }

    proizvodiForma(host){
        if(this.listaDobavljaca.length < 1){
            alert("Prodavnica nema dobavljace!");
            let novContainer = document.createElement("div");
            novContainer.className = "novaProdavnicaDiv";
            host.appendChild(novContainer);    
            this.novDobavljacForma(novContainer);
        }
        else{
            let proizvodi = document.createElement("div");
            proizvodi.className = "proizvodi";
            host.appendChild(proizvodi);

            let proizvodiZaglavlje = document.createElement("div");
            proizvodiZaglavlje.className = "proizvodiZaglavlje";
            proizvodi.appendChild(proizvodiZaglavlje);

            let proizvodiForma = document.createElement("div");
            proizvodiForma.className = "proizvodiForma"; 
            proizvodi.appendChild(proizvodiForma);

            let proizvodiIzgled = document.createElement("div");
            proizvodiIzgled.className = "proizvodiIzgled"; 
            proizvodi.appendChild(proizvodiIzgled);


            let selectDiv = document.createElement("div");
            selectDiv.className = "selectDiv";
            proizvodiZaglavlje.appendChild(selectDiv);
            this.crtajSelect(selectDiv);

            let prikaziProizvode = document.createElement("button");
            prikaziProizvode.innerHTML = "Prikazi proizvode";
            prikaziProizvode.className = "prikaziDugme";
            proizvodiZaglavlje.appendChild(prikaziProizvode);
            prikaziProizvode.addEventListener("click", () =>{
                brisiDobavljace();
                brisiProizvod();
                this.novProizvodForma(proizvodiForma);
                this.prikaziProizvod(proizvodiIzgled);
            })

            let dodajDobavljaca = document.createElement("button");
            dodajDobavljaca.innerHTML = "Dodaj dobavljaca";
            dodajDobavljaca.className = "prikaziDugme";
            proizvodiZaglavlje.appendChild(dodajDobavljaca);
            dodajDobavljaca.addEventListener("click", () =>{
                brisiDobavljace();
                brisiProizvod();
                this.novDobavljacForma(proizvodiForma);
                this.prikaziDobavljace(proizvodiIzgled);
            })
        }
    }

    crtajSelect(host){
        let select = document.createElement("select");
        select.className = "selectDobavljac";
        host.appendChild(select);

        this.listaDobavljaca.forEach((dobavljac, index) => {
            let opcija = document. createElement("option");
            opcija.className = "opcijaDobavljac";
            opcija.innerHTML = dobavljac.naziv;
            opcija.value = index;
            select.appendChild(opcija);
        })
    }  

    novProizvodForma(host){
        brisiProizvod();

        let novProizvodDiv = document.createElement("div");
        novProizvodDiv.className = "novProizvodDiv";
        host.appendChild(novProizvodDiv);

        let nazivDiv = document.createElement("div");
        nazivDiv.className = "naslov";
        novProizvodDiv.appendChild(nazivDiv);

        let naziv = document.createElement("h3");
        naziv.className = "naziv";
        naziv.innerHTML = "Dodaj nov proizvod:";
        nazivDiv.appendChild(naziv);

        nazivDiv = document.createElement("div");
        nazivDiv.className = "nazivProizvod";
        novProizvodDiv.appendChild(nazivDiv);

        let nazivLabela = document.createElement("label");
        nazivLabela.className = "nazivProizvodLabela";
        nazivLabela.innerHTML = "Naziv proizvoda: ";
        nazivDiv.appendChild(nazivLabela);

        let nazivInput = document.createElement("input");
        nazivInput.className = "nazivProizvodInput";
        nazivInput.type = "string";
        nazivDiv.appendChild(nazivInput);

        let cenaDiv = document.createElement("div");
        cenaDiv.className = "nazivProizvod";
        novProizvodDiv.appendChild(cenaDiv);

        let cenaLabela = document.createElement("label");
        cenaLabela.className = "nazivProizvodLabela";
        cenaLabela.innerHTML = "Cena proizvoda: ";
        cenaDiv.appendChild(cenaLabela);

        let cenaInput = document.createElement("input");
        cenaInput.className = "nazivProizvodInput";
        cenaInput.type = "number";
        cenaDiv.appendChild(cenaInput);

        let selectDiv = document.createElement("div");
        novProizvodDiv.appendChild(selectDiv);


        let dodaj = document.createElement("button");
        dodaj.className = "dugme";
        dodaj.innerHTML = "Dodaj proizvod";
        selectDiv.appendChild(dodaj);
        dodaj.addEventListener("click", () => {
            this.dodajProizvod(nazivInput.value, cenaInput.value);
            brisiProizvod();
        })
    }

    prikaziProizvod(host){
        let index = document.querySelector(".selectDobavljac").value;
        console.log(index);
        this.listaDobavljaca[index].prikaziSveProizvode(host);
    }

    novDobavljacForma(host){
        let dodajDiv = document.createElement("div");
        dodajDiv.className = "dodajDobavljacaDiv";
        host.appendChild(dodajDiv);

        let nazivDiv = document.createElement("div");
        nazivDiv.className = "naslov";
        dodajDiv.appendChild(nazivDiv);

        let naziv = document.createElement("h3");
        naziv.className = "naziv";
        naziv.innerHTML = "Dodaj novog dobavljača:";
        nazivDiv.appendChild(naziv);

        nazivDiv = document.createElement("div");
        nazivDiv.className = "divDobavljac";
        dodajDiv.appendChild(nazivDiv);

        naziv = document.createElement("label");
        naziv.className = "labelaDobavljac";
        naziv.innerHTML = "Naziv dobavljaca: ";
        nazivDiv.appendChild(naziv);

        let nazivInput = document.createElement("input");
        nazivInput.type = "string";
        nazivInput.className = "inputDobavljac";
        nazivDiv.appendChild(nazivInput);

        let adresaDiv = document.createElement("div");
        adresaDiv.className = "divDobavljac";
        dodajDiv.appendChild(adresaDiv);

        let adresa = document.createElement("label");
        adresa.className = "labelaDobavljac";
        adresa.innerHTML = "Adresa dobavljaca: ";
        adresaDiv.appendChild(adresa);

        let adresaInput = document.createElement("input");
        adresaInput.type = "string";
        adresaInput.className = "inputDobavljacAdresa";
        adresaDiv.appendChild(adresaInput);
        

        let dugmeDiv = document.createElement("div");
        dugmeDiv.className = "divDobavljac";
        dodajDiv.appendChild(dugmeDiv);

        let dodaj = document.createElement("button");
        dodaj.className = "dodajDobavljac";
        dodaj.innerHTML = "Dodaj dobavljaca";
        dugmeDiv.appendChild(dodaj);
        dodaj.addEventListener("click", () => {
            this.dodajDobavljaca(nazivInput.value, adresaInput.value);
            // brisiDobavljace();
            // this.brisiSelect();
            // this.crtajSelect(document.querySelector(".selectDiv"));    
            brisiSadrzaj();
            this.preuzmiDobavljace(document.querySelector(".dobavljaci"));

        })
    }

    prikaziDobavljace(host){

        if(this.listaDobavljaca.length < 1){
            alert("Prodavnica nema dobavljace!");
        }
        else{
            let dobavljaci = document.createElement("div");
            dobavljaci.className = "dobavljaciDiv";
            host.appendChild(dobavljaci);

            this.crtajPrikazDobavljaci(dobavljaci);

            var teloTabele = obrisiPrethodniSadrzaj();
          
            this.listaDobavljaca.forEach(d =>{
                console.log(d);
                d.crtajDobavljaca(teloTabele);
            })
        }
    }

    crtajPrikazDobavljaci(host){

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
        var zag=["Naziv", "Adresa"];
        zag.forEach(el=>{
            th = document.createElement("th");
            th.innerHTML=el;
            tr.appendChild(th);
        })
    }

    obrisiDobavljaca(host, index){
        this.listaDobavljaca[index].obrisiDobavljaca();
        this.listaDobavljaca.pop(index);

        this.brisiDobavljace();
        this.prikaziDobavljace(host);
    }

    dodajDobavljaca(naziv, adresa){
        let sadrzaj = document.querySelector(".inputDobavljac").value = "";
        sadrzaj = document.querySelector(".inputDobavljacAdresa").value = "";
        fetch("https://localhost:5001/Dobavljac/DodajDobavljaca/"+naziv+"/"+adresa+"/"+this.prodavnicaID,
        {
            method:"POST",
            header:{
                'Content-Type':'application/json'
            }
        }).then(r => r.json()).then(dobavljac => {
            var d = new Dobavljac(dobavljac.dobavljacID, dobavljac.naziv, dobavljac.adresaFirme);
            this.listaDobavljaca.push(d);
        })
    }


    dodajProizvod(naziv, cena){
        let index = document.querySelector(".selectDobavljac").value;
        console.log(index);
        if (index == null)
            alert("Odaberite dobavljaca");
        this.listaDobavljaca[index].dodajProizvod(naziv, cena);
    }


    // brisiProizvodeDobavljaca(){
    //     var dete = document.querySelector(".proizvodiDobavljacaDiv");
    //     if(dete){
    //         var roditelj = dete.parentNode;
    //         roditelj.removeChild(dete);
    //     }
    // }

    // brisiSadrzaj(){
    //     var dete = document.querySelector(".proizvodi");
    //     if(dete){
    //         var roditelj = dete.parentNode;
    //         roditelj.removeChild(dete);
    //     }
    // }

    brisiSelect(){
        var dete = document.querySelector(".selectDobavljac");
        var roditelj = dete.parentNode;
        roditelj.removeChild(roditelj.firstChild);
    }
}
export function brisiSadrzaj(){
    var dete = document.querySelector(".proizvodi");
    if(dete){
        var roditelj = dete.parentNode;
        roditelj.removeChild(dete);
    }
}

export function brisiSadrzajProdavnica(){
    
    var dete = document.querySelector(".dodajDobavljacaDiv");  
    if(dete){
        var roditelj = dete.parentNode;    
        roditelj.removeChild(dete);
    }

    dete = document.querySelector(".dobavljaciDiv");
    if(dete){
        var roditelj = dete.parentNode;
        roditelj.removeChild(dete);
    }

    dete = document.querySelector(".prodavnicaDiv");
    if(dete){
        var roditelj = dete.parentNode;
        roditelj.removeChild(dete);
    }
}

export function brisiProizvod(){
    var dete = document.querySelector(".novProizvodDiv");
    if(dete){
        var roditelj = dete.parentNode;
        roditelj.removeChild(dete);
    }
    var dete = document.querySelector(".proizvodiDobavljacaDiv");
    if(dete){
        var roditelj = dete.parentNode;
        roditelj.removeChild(dete);
    }
}



export function brisiDobavljace(){
    var dete = document.querySelector(".dodajDobavljacaDiv");
    if(dete){
        var roditelj = dete.parentNode;
        roditelj.removeChild(dete);
    }
    var dete = document.querySelector(".dobavljaciDiv");
    if(dete){
        var roditelj = dete.parentNode;
        roditelj.removeChild(dete);
    }
}

