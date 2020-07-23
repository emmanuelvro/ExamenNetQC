using Business;
using Business.Interfaces;
using DAO.Repository;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Services.Description;

namespace WebExamenNet.Controllers
{
    [Route("api/products")]
    public class ProductsController : ApiController
    {
        private IProductsBsn products;
        public ProductsController(IProductsBsn products)
        {
            this.products = products;
        }

        public IHttpActionResult Get()
        {
            var result = new { 
                data = this.products.GetAllProducts(Services.lstProducts), 
                recordFiltered = this.products.GetAllProducts(Services.lstProducts).Count, 
                recordTotal = this.products.GetAllProducts(Services.lstProducts).Count 
            };
            return Ok(result);
        }
        [HttpGet]
        [Route("api/products/getbyid/{id}")]
        public IHttpActionResult GetById(int id)
        {
            return Ok(this.products.GetProductById(Services.lstProducts, id));
        }

        public IHttpActionResult Post([FromBody]Product model)
        {
            model.Id = Services.lstProducts.Count + 1;
            return Ok(this.products.InsertProduct(Services.lstProducts, model));
        }

        [HttpPut]
        [Route("api/products/update/{id}")]
        public IHttpActionResult Put(int id, [FromBody]Product model)
        {
            return Ok(this.products.UpdateProduct(Services.lstProducts, model));
        }

        [HttpDelete]
        [Route("api/products/delete/{id}")]
        public IHttpActionResult Delete(int id)
        {
            return Ok(this.products.DeleteProduct(Services.lstProducts, id));
        }
        
    }

    public static class Services
    {
        private static List<Product> _lstProducts;

        private static object cacheLock = new object();
        public static List<Product> lstProducts
        {
            get
            {
                lock (cacheLock)
                {
                    if (_lstProducts == null)
                    {
                        _lstProducts = new List<Product>();
                    }
                    return _lstProducts;
                }
            }
        }
    }
}
