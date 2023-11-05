using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EventToPhotosConnectionAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "EventId",
                table: "Photos",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_EventId",
                table: "Photos",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Events_EventId",
                table: "Photos",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Events_EventId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_EventId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "Photos");
        }
    }
}
