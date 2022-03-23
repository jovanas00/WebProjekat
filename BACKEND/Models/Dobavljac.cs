using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{
    [Table("Dobavljac")]

    public class Dobavljac{

        [Key]
        public int DobavljacID { get; set; }

        [Required]
        public string Naziv { get; set; }

        public string AdresaFirme { get; set; }

        [JsonIgnore]
        public Prodavnica Prodavnica {get; set; }
        
        public virtual List<Proizvod> Proizvodi { get; set; }
    }
}