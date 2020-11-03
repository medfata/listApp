using System.Collections.Generic;
using System.Data.Common;
using listApp.Models;
using System.Linq;
namespace listApp.Data
{
    public class listRepo
    {
        private  listContext db = new listContext();

        public IEnumerable<list> GetLists(){
            return this.db.list;
        }
       
       public IEnumerable<item> GetItems(){
           return this.db.item;
       }
        public list GetList(int id){
            return this.db.list.FirstOrDefault(list => list.id ==id);
        }
        public item GetItem(int id){
            return this.db.item.FirstOrDefault(item => item.id == id);
        }
        public IEnumerable<item> GetlistItems(int listId){
            return this.db.item.Where(item => item.listId == listId);
        }

    }
}