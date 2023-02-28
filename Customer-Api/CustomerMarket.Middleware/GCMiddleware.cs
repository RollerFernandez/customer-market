//using Microsoft.AspNetCore.Http;
//using System;
//using System.Threading.Tasks;

//namespace Middleware
//{
//    public class GCMiddleware : IMiddleware
//    {
//        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
//        {
//            await next(context);
//            GC.Collect(2, GCCollectionMode.Forced, true);
//            GC.WaitForPendingFinalizers();
//        }
//    }
//}
