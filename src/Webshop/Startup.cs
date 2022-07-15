using System.Web.Http;
using Microsoft.Owin;
using Owin;
using Ucommerce.Headless.Documentation;
using Umbraco.Web;
using Webshop;

[assembly: OwinStartup("Startup", typeof(Startup))]

namespace Webshop
{
    public class Startup : UmbracoDefaultOwinStartup
    {
        protected override void ConfigureMiddleware(IAppBuilder app)
        {
            base.ConfigureMiddleware(app);

            var config = new HttpConfiguration();

            app.UseUcommerceDocumentation();

            app.UseWebApi(config);

            config.MapHttpAttributeRoutes();
            config.EnsureInitialized();
        }
    }
}
