﻿// <auto-generated />
using System;
using InnoXCollab.Web.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace InnoXCollab.Web.Migrations
{
    [DbContext(typeof(InnoXCollabContext))]
    partial class InnoXCollabContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EventTag", b =>
                {
                    b.Property<Guid>("EventsId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TagsId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("EventsId", "TagsId");

                    b.HasIndex("TagsId");

                    b.ToTable("EventTag");
                });

            modelBuilder.Entity("InnoXCollab.Web.Models.Domain.AdminLog", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Action")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("LogDateTime")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AdminLogs");
                });

            modelBuilder.Entity("InnoXCollab.Web.Models.Domain.Event", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FeaturedImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoldingPlace")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("HoldingTime")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("InvestorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShortDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("TypeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("UrlHandle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("InvestorId");

                    b.HasIndex("TypeId");

                    b.HasIndex("UserId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("InnoXCollab.Web.Models.Domain.Investor", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("InvestmentAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Investors");
                });

            modelBuilder.Entity("InnoXCollab.Web.Models.Domain.Tag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("InnoXCollab.Web.Models.Domain.Type", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Types");

                    b.HasData(
                        new
                        {
                            Id = new Guid("310cb7cb-f417-4417-a09d-4a5b10a4486a"),
                            Name = "Хакатон"
                        },
                        new
                        {
                            Id = new Guid("852e34a9-c1f8-4486-bb61-1111e4789d64"),
                            Name = "Акселератор"
                        },
                        new
                        {
                            Id = new Guid("1d7dcf4a-b5e2-4fcf-b2e6-498061bfc79b"),
                            Name = "Грант"
                        });
                });

            modelBuilder.Entity("InnoXCollab.Web.Models.Domain.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nationality")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EventTag", b =>
                {
                    b.HasOne("InnoXCollab.Web.Models.Domain.Event", null)
                        .WithMany()
                        .HasForeignKey("EventsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("InnoXCollab.Web.Models.Domain.Tag", null)
                        .WithMany()
                        .HasForeignKey("TagsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("InnoXCollab.Web.Models.Domain.AdminLog", b =>
                {
                    b.HasOne("InnoXCollab.Web.Models.Domain.User", "User")
                        .WithMany("AdminLogs")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("InnoXCollab.Web.Models.Domain.Event", b =>
                {
                    b.HasOne("InnoXCollab.Web.Models.Domain.Investor", "Investor")
                        .WithMany("Events")
                        .HasForeignKey("InvestorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("InnoXCollab.Web.Models.Domain.Type", "Type")
                        .WithMany("Events")
                        .HasForeignKey("TypeId");

                    b.HasOne("InnoXCollab.Web.Models.Domain.User", "User")
                        .WithMany("Events")
                        .HasForeignKey("UserId");

                    b.Navigation("Investor");

                    b.Navigation("Type");

                    b.Navigation("User");
                });

            modelBuilder.Entity("InnoXCollab.Web.Models.Domain.Investor", b =>
                {
                    b.Navigation("Events");
                });

            modelBuilder.Entity("InnoXCollab.Web.Models.Domain.Type", b =>
                {
                    b.Navigation("Events");
                });

            modelBuilder.Entity("InnoXCollab.Web.Models.Domain.User", b =>
                {
                    b.Navigation("AdminLogs");

                    b.Navigation("Events");
                });
#pragma warning restore 612, 618
        }
    }
}
