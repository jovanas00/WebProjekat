import { Prodavnica } from "./Prodavnica.js";
import { brisiSadrzajProdavnica } from "./Prodavnica.js";

let container = document.createElement("div");
container.className = "mainContainer";
document.body.appendChild(container);

var listaProdavnica = [];

function preuzmiProdavnice(){
    listaProdavnica = [];
    fetch("https://localhost:5001/Prodavnica/PrikaziProdavnice",
    {
        method:"GET"
    }).then(r => {
        if(r.ok){
            r.json().then(prodavnice =>{
                prodavnice.forEach(prodavnica => {
                    var p = new Prodavnica(prodavnica.prodavnicaID, prodavnica.naziv, prodavnica.adresa);
                    listaProdavnica.push(p);
                });
                ucitajSveProdavnice();
            })
        }
    })    
}

novaProdavnicaForma();
preuzmiProdavnice();

function novaProdavnicaForma(){
    let containerMain = document.createElement("div");
    containerMain.className = "mainContainerDiv";
    container.appendChild(containerMain);
    
    let novaContainer = document.createElement("div");
    novaContainer.className = "novaProdavnicaDiv";
    containerMain.appendChild(novaContainer);

    let naslov = document.createElement("h3");
    naslov.className = "naslov";
    naslov. innerHTML = "Dodaj novu prodavnicu:";
    novaContainer.appendChild(naslov);

    let novaNaziv = document.createElement("div");
    novaNaziv.className = "novaProdavnica";
    novaContainer.appendChild(novaNaziv);

    let labelaNaziv = document.createElement("label");
    labelaNaziv.innerHTML = "Naziv prodavnice: ";
    labelaNaziv.className = "novaLabela";
    novaNaziv.appendChild(labelaNaziv);

    let inputNaziv = document.createElement("input");
    inputNaziv.type = "string";
    inputNaziv.className = "novaInput";
    novaNaziv.appendChild(inputNaziv);
 
    let novaAdresa = document.createElement("div");
    novaAdresa.className = "novaProdavnica";
    novaContainer.appendChild(novaAdresa);

    let labelaAdresa = document.createElement("label");
    labelaAdresa.innerHTML = "Adresa prodavnice: ";
    labelaAdresa.className = "novaLabela";
    novaAdresa.appendChild(labelaAdresa);

    let inputAdresa = document.createElement("input");
    inputAdresa.type = "string";
    inputAdresa.className = "novaInputAdresa";
    novaAdresa.appendChild(inputAdresa);

    let dugmiciDiv = document.createElement("div");
    dugmiciDiv.className = "novaProdavnica";
    novaContainer.appendChild(dugmiciDiv);

    let dodaj = document.createElement("button");
    dodaj.innerHTML = "Dodaj prodavnicu";
    dodaj.className = "dugme";
    dugmiciDiv.appendChild(dodaj);

    dodaj.onclick = (ev) => dodajProdavnicu(inputNaziv.value, inputAdresa.value);
}

function dodajProdavnicu(naziv, adresa){
    if(naziv == "" || adresa == ""){
        window.alert("Unesite ispravne podatke!");
        return;
    }

    else{
        let sadrzaj = document.querySelector(".novaInput").value = "";
        sadrzaj = document.querySelector(".novaInputAdresa").value = "";
        fetch("https://localhost:5001/Prodavnica/DodajProdavnicu/"+naziv+"/"+adresa,
        {
            method:"POST",
            header: {
                'Content-Type':'application/json'
            }
         }).then(r => r.json()).then(prodavnica => {
            var p = new Prodavnica(prodavnica.prodavnicaID, prodavnica.naziv, prodavnica.adresa);
            listaProdavnica.push(p);
            brisiProdavnice();
            ucitajSveProdavnice();
        })
    }
}

function ucitajSveProdavnice(){
    let containerMain = document.createElement("div");
    containerMain.className = "mainContainerDiv";
    container.appendChild(containerMain);

    let divSveProdavnice = document.createElement("div");
    divSveProdavnice.className = "divSveProdavnice";
    container.appendChild(divSveProdavnice);

    listaProdavnica.forEach((p, index) => {
        let divProdavnica = document.createElement("div");
        divProdavnica.className = "prodavnicaDivMain";
        divSveProdavnice.appendChild(divProdavnica);

        let naziv = document.createElement("h3");
        naziv.innerHTML = "Naziv: "+p.naziv;
        naziv.className = "nazivProdavnice";
        naziv.onclick=(ev)=>prikaziProdavnicu(index);
        divProdavnica.appendChild(naziv);

        let adresa = document.createElement("label");
        adresa.innerHTML = "Adresa: "+p.adresa;
        adresa.className = "adresaProdavnice";
        divProdavnica.appendChild(adresa);
        
        let obrisi = document.createElement("button");
        obrisi.innerHTML = "Obrisi prodavnicu";
        obrisi.className = "dugme";
        divProdavnica.appendChild(obrisi);

        obrisi.onclick = (ev) => obrisiProdavnicu(index);
    })
}

function prikaziProdavnicu(index){
    brisiSadrzaj();
    let prodavnica = document.createElement("div");
    prodavnica.className = "prodavnicaDiv";
    container.appendChild(prodavnica);
    listaProdavnica[index].crtajProdavnicu(prodavnica);
}

function obrisiProdavnicu(index){
    fetch("https://localhost:5001/Prodavnica/Obrisi/"+listaProdavnica[index].prodavnicaID, {
        method:"DELETE"
    }).then(r =>{
        if(r.ok){
            listaProdavnica.pop(index);
            brisiProdavnice();
            ucitajSveProdavnice();
        }
        else{
            r.text().then(r=>console.log(r));
        }
    })
}

function brisiSadrzaj(){
    var dete = document.querySelector(".divSveProdavnice");
    if(dete){
        var roditelj = dete.parentNode;
        roditelj.removeChild(dete);
    }

    var dete = document.querySelector(".novaProdavnicaDiv");
    if(dete){
        var roditelj = dete.parentNode;
        roditelj.removeChild(dete);
    }
}
function brisiProdavnice(){
    var dete = document.querySelector(".divSveProdavnice");
    console.log(dete);
    if(dete)
    {
        var roditelj = dete.parentNode;
        roditelj.removeChild(dete);
    }
}

export function crtajOpet(){
    brisiSadrzajProdavnica();
    brisiProdavnice();
    novaProdavnicaForma();
    preuzmiProdavnice();
}


