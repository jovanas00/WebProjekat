using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{
    [Table("Proizvod")]
    public class Proizvod{
        [Key]
        public int ProizvodID { get; set; }

        public string Naziv { get; set; }

        public int Cena { get; set; }

        [JsonIgnore]
        public Dobavljac Dobavljac { get; set; }
    }
}