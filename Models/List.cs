using System.Collections.Generic;

namespace listApp.Models
{
    public class list
    {
        public list(int id,string name){
            this.id = id;
            this.name = name;
        }
        public int id { get; set; }
        public string name { get; set; } 

    }
}