using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{
    [Table("Prodavnica")]

    public class Prodavnica{
        [Key]
        public int ProdavnicaID{ get; set; }

        public string Naziv { get; set; }

        public string Adresa { get; set; }

        public virtual List<Dobavljac>  ListaDobavljaca { get; set; }
    }

}