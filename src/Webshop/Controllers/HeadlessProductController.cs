using System;
using System.Linq;
using System.Threading;
using System.Web.Http;
using NSwag.Annotations;
using Ucommerce.Extensions;
using Ucommerce.Headless.API.Controllers;
using Ucommerce.Headless.API.Models.V1.ViewModels;
using Ucommerce.Headless.Domain;
using Ucommerce.Headless.Infrastructure;
using Ucommerce.Headless.Mvc.ModelBinders.ClaimBinder;
using Ucommerce.Infrastructure;
using Ucommerce.Infrastructure.Logging;
using Ucommerce.Search;
using Ucommerce.Search.Models;

namespace Webshop.Controllers
{
    [RoutePrefix("api/v1/products")]
    public class HeadlessProductController : BaseController
    {
        private readonly ILoggingService _loggingService;
        private readonly IIndex<Product> _productIndex;
        private readonly IIndex<ProductCatalog> _productCatalogIndex;

        public HeadlessProductController()
        {
            _productIndex = ObjectFactory.Instance.Resolve<IIndex<Product>>();
            _productCatalogIndex = ObjectFactory.Instance.Resolve<IIndex<ProductCatalog>>();
            _loggingService = ObjectFactory.Instance.Resolve<ILoggingService>();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="storeId"></param>
        /// <param name="legacyStoreId"></param>
        /// <param name="request"></param>
        /// <param name="token"></param>
        [HttpGet]
        [Route("")]
        [Ucommerce.Headless.Authentication.Authorize]
        public IHttpActionResult GetProducts(
            [OpenApiIgnore] [FromClaim(Name = HeadlessConstants.ClaimTypes.CLIENT_ID)] Guid storeId)
        {
            try
            {
                var catalogs = _productCatalogIndex.Find().Where(x => x.ProductCatalogGroup == storeId).ToList();
                var categoryIds = catalogs.Results.SelectMany(x => x.Categories)
                                          .ToList();
                var products = _productIndex.Find()
                                            .Where(x => x.Categories.Contains(categoryIds))
                                            .ToList();
                return Ok(products.Results);
            }
            catch (Exception ex)
            {
                _loggingService.Error<HeadlessProductController>(ex,
                                                                 "Error happened while getting price groups, {message}",
                                                                 ex.Message);
                return InternalServerError();
            }
        }
    }
}
