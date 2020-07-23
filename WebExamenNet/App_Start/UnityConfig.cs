using Business;
using Business.Interfaces;
using DAO.Interfaces;
using DAO.Repository;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace WebExamenNet
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<IProducts, ProductsDAO>();
            container.RegisterType<IProductsBsn, ProductsBsn>();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}