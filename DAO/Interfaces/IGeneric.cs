using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAO.Interfaces
{
    public interface IGeneric<T>
    {
        T Insert(List<T> lst,T objeto);
        List<T> Get(List<T> lst);
        T GetById(List<T> lst,int id);
        T Update(List<T> lst,T objeto);
        bool Delete(List<T> lst,int id);
    }
}
