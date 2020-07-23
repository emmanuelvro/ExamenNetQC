using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces
{
    public interface IProductsBsn
    {
        List<Product> GetAllProducts(List<Product> lstproducts);
        Product GetProductById(List<Product> lstproducts, int id);
        Product UpdateProduct(List<Product> lstproducts,Product product);
        Product InsertProduct(List<Product> lstproducts, Product product);
        bool DeleteProduct(List<Product> lstproducts, int id);

    }
}
