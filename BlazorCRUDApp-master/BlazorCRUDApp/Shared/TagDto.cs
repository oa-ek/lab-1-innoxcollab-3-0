using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlazorCRUDApp.Shared
{
    public class TagDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }   
}
