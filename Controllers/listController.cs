using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using listApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace listApp.Data
{
     [ApiController]
    public class listController : ControllerBase
    {
        private listRepo dbClass = new listRepo();
        //get Methods
        [HttpGet]
        [Route("lists")]
        public IEnumerable<list> GetList(){
            return this.dbClass.GetLists();
        }
         [HttpGet]
        [Route("lists/{id}")]
        public list GetList(int id){
            return this.dbClass.GetList(id);
        }
            [HttpGet]
        [Route("listItems/{id}")]
        public IEnumerable<item> GetlistItems(int id){
            return this.dbClass.GetlistItems(id);
        }
         [HttpGet]
        [Route("items")]
        public IEnumerable<item> GetItems(){
            return this.dbClass.GetItems();
        }
         [HttpGet]
        [Route("items/{id}")]
        public item GetItem(int id){
            return this.dbClass.GetItem(id);
        }
        
        //post methods
        private listContext db = new listContext();
                
        [HttpPost]
        [Route("lists")]
        public async Task<ActionResult<list>> createList(list l)
        {
            
                if(l == null){
                    return BadRequest();
                }
                   this.db.list.Add(l);
                   await this.db.SaveChangesAsync();
                 
                return CreatedAtAction(nameof(GetList), new {id = l.id}, l);
         
        }
        [HttpPost]
        [Route("items")]
        public async Task<ActionResult<item>> createItem(item it){
            var list = this.GetList(it.listId);
            if(it == null || list == null )
                return BadRequest();
            
            this.db.item.Add(it);
            await this.db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetItem), new{id = it.id},it);
        }      
        
    }
}