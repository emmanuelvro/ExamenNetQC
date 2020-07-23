using DAO.Interfaces;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAO.Repository
{
    public class ProductsDAO : IProducts
    {
             

        public bool Delete(List<Product> lstProducts, int id)
        {
            try
            {
                lstProducts.RemoveAll(p => p.Id == id);
            }
            catch (Exception)
            {

                return false;
            }
            return true;
        }

        public List<Product> Get(List<Product> lstProducts)
        {
            return lstProducts;
        }

        public Product GetById(List<Product> lstProducts, int id)
        {
            return this.Get(lstProducts).Where(p => p.Id == id).FirstOrDefault();
        }

        public Product Insert(List<Product> lstProducts, Product objeto)
        {
            lstProducts.Add(objeto);
            return objeto;
        }

        public Product Update(List<Product> lstProducts, Product objeto)
        {
            Product prod = lstProducts
                .Where(p => p.Id == objeto.Id)
                .Select(p =>
                {
                    p.Name = objeto.Name;
                    p.Price = objeto.Price;
                    p.Quantity = objeto.Quantity;
                    p.Category = objeto.Category;
                    return p;
                }).FirstOrDefault();

            return prod;
        }
    }
}
