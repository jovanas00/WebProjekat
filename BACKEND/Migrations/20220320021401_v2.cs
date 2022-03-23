using Microsoft.EntityFrameworkCore.Migrations;

namespace BACKEND.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dobavljac_Klijent_ProdavnicaID",
                table: "Dobavljac");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Klijent",
                table: "Klijent");

            migrationBuilder.RenameTable(
                name: "Klijent",
                newName: "Prodavnica");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Prodavnica",
                table: "Prodavnica",
                column: "ProdavnicaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Dobavljac_Prodavnica_ProdavnicaID",
                table: "Dobavljac",
                column: "ProdavnicaID",
                principalTable: "Prodavnica",
                principalColumn: "ProdavnicaID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dobavljac_Prodavnica_ProdavnicaID",
                table: "Dobavljac");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Prodavnica",
                table: "Prodavnica");

            migrationBuilder.RenameTable(
                name: "Prodavnica",
                newName: "Klijent");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Klijent",
                table: "Klijent",
                column: "ProdavnicaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Dobavljac_Klijent_ProdavnicaID",
                table: "Dobavljac",
                column: "ProdavnicaID",
                principalTable: "Klijent",
                principalColumn: "ProdavnicaID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
