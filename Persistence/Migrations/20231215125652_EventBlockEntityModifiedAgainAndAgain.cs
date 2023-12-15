using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EventBlockEntityModifiedAgainAndAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventBlock_Events_EventId",
                table: "EventBlock");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EventBlock",
                table: "EventBlock");

            migrationBuilder.RenameTable(
                name: "EventBlock",
                newName: "EventBlocks");

            migrationBuilder.RenameIndex(
                name: "IX_EventBlock_EventId",
                table: "EventBlocks",
                newName: "IX_EventBlocks_EventId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventBlocks",
                table: "EventBlocks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventBlocks_Events_EventId",
                table: "EventBlocks",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventBlocks_Events_EventId",
                table: "EventBlocks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EventBlocks",
                table: "EventBlocks");

            migrationBuilder.RenameTable(
                name: "EventBlocks",
                newName: "EventBlock");

            migrationBuilder.RenameIndex(
                name: "IX_EventBlocks_EventId",
                table: "EventBlock",
                newName: "IX_EventBlock_EventId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventBlock",
                table: "EventBlock",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventBlock_Events_EventId",
                table: "EventBlock",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
