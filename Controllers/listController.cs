using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using listApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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
        //methods to update list and item
        [HttpPut]
        [Route("lists/{id}")]
        public async Task<IActionResult> updateList(int id, list li){
            if(id  != li.id){
                return BadRequest();
            }
            this.db.Entry(li).State = EntityState.Modified;
            var list = this.GetList(li.id);
            try {
                await this.db.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                if(list == null ){
                    return NotFound();
                }else{
                    throw;
                }
            }
            return NoContent();
        }  

         [HttpPut]
        [Route("items/{id}")]
        public async Task<IActionResult> updateItem(int id, item it){
            if(id  != it.id){
                return BadRequest();
            }
            this.db.Entry(it).State = EntityState.Modified;
            var item = this.GetItem(it.id);
            try {
                await this.db.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                if(item == null ){
                    return NotFound();
                }else{
                    throw;
                }
            }
            return NoContent();
        }  
        
        //delete methods for list and item
         [HttpDelete]
        [Route("items/{id}")]
        public async Task<ActionResult<item>> deleteItem(int id){
             var item = await this.db.item.FindAsync(id);
            if(item  == null){
                return BadRequest();
            }
            this.db.item.Remove(item);
            await this.db.SaveChangesAsync();
            return item;
        } 
        [HttpDelete]
        [Route("lists/{id}")]
        public async Task<ActionResult<list>> deleteList(int id){
            var list = await this.db.list.FindAsync(id);
            if(list == null){
                return BadRequest();
            }
            var items = this.dbClass.GetlistItems(id);
            this.db.list.Remove(list);  
            this.db.item.RemoveRange(items);
            await this.db.SaveChangesAsync();

            return list;
        }       
    }
}