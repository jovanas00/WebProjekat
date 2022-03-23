import { brisiProizvod } from "./Prodavnica.js";

export class Proizvod{
    constructor(proizvodID, naziv, cena)
    {
        this.proizvodID = proizvodID;
        this.naziv = naziv;
        this.cena = cena;
        this.container = null;
    }

    crtajProizvod(host){
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML=this.naziv;
        tr.appendChild(el);
        el = document.createElement("td");
        el.innerHTML=this.cena;
        tr.appendChild(el);

        el = document.createElement("td");
        tr.appendChild(el);
        let dugme = document.createElement("button");
        dugme.innerHTML="Obrisi";
        el.appendChild(dugme);
        dugme.onclick = (ev) => this.obrisiProizvod();

        dugme = document.createElement("button");
        dugme.innerHTML="Promeni cenu";
        el.appendChild(dugme);
        dugme.onclick = (ev) => this.promeniCenu(input.value);
        let input = document.createElement("input");
        input.type = "number";
        input.className = "inputCena";
        el.appendChild(input);
    }



    obrisiProizvod(){
        fetch("https://localhost:5001/Proizvod/ObrisiProizvod/"+this.proizvodID,
        {
            method:"DELETE"
        }).then(r =>{
            if(r.ok){
                brisiProizvod();
            }
            else{
                r.text().then(r => console.log(r));
            }
        })
    }

    promeniCenu(cena){
        let sadrzaj = document.querySelector(".inputCena").value = "";
        fetch("https://localhost:5001/Proizvod/PromeniCenu/"+this.proizvodID+"/"+cena,
        {
            method:"PUT"
        }).then(r => {
            if(r.ok){
                brisiProizvod();
            }
            else{
                r.text().then(r => console.log(r));
            }
        })
    }
}