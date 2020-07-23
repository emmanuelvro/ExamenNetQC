using Business.Interfaces;
using DAO.Interfaces;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class ProductsBsn : IProductsBsn
    {
        private IProducts products;

        public ProductsBsn(IProducts products)
        {
            this.products = products;
        }
        public List<Product> GetAllProducts(List<Product> lstProducts)
        {
            return this.products.Get(lstProducts);
        }
        public Product GetProductById(List<Product> lstProducts, int id)
        {
            return this.products.GetById(lstProducts,id);
        }
        public Product UpdateProduct(List<Product> lstProducts,Product product)
        {
            return this.products.Update(lstProducts, product);
        }
        public Product InsertProduct(List<Product> lstProducts, Product product)
        {
            return this.products.Insert(lstProducts, product);
        }
        public bool DeleteProduct(List<Product> lstProducts, int id)
        {
            return this.products.Delete(lstProducts, id);
        }

    }
}
