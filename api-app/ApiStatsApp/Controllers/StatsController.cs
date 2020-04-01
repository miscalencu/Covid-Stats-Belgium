using ApiStatsApp.Code.Core;
using ApiStatsApp.Code.Core.Stats;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace ApiStatsApp.Controllers
{
    [ApiController]
    [EnableCors("AllowOrigin")]
    [Route("[controller]")]
    public class StatsController : ControllerBase
    {
        private readonly IMemoryCacheService _cacheService;

        public StatsController(IMemoryCacheService memoryCacheService)
        {
            _cacheService = memoryCacheService;   
        }

        [HttpGet]
        public JsonResult Get([FromQuery]StatType type)
        {
            return type switch
            {
                StatType.CasesDateASP => new JsonResult(GetData<ConfirmedASDM>()),
                _ => null,
            };
        }

        public StatsResponse<T> GetData<T>() where T : IStat
        {
            var apiUrl = "https://epistat.sciensano.be/Data/{0}.json";
            var apiPart = "";
            switch (typeof(T).Name)
            {
                case nameof(ConfirmedASDM):
                    apiPart = "COVID19BE_CASES_AGESEX";
                    break;
                default:
                    break;
            }

            apiUrl = String.Format(apiUrl, apiPart);

            string cacheKey = apiPart;
            StoredResponse<T> cachedObject = _cacheService.Get<StoredResponse<T>>(cacheKey);
            string source = "cached";
            if (cachedObject == null)
            {
                source = "online";
                using WebClient client = new WebClient
                {
                    Encoding = Encoding.UTF8
                };
                string strData = client.DownloadString(apiUrl);

                strData = strData.Replace("Li�ge", "Liege");

                cachedObject = new StoredResponse<T>()
                {
                    DownloadDate = DateTime.Now,
                    Data = JsonConvert.DeserializeObject<List<T>>(strData)
                };

                _cacheService.Add<StoredResponse<T>>(cachedObject, cacheKey, TimeSpan.FromHours(1));
            }

            return new StatsResponse<T>() {
                Source = source,
                DownloadDate = cachedObject.DownloadDate,
                Data = cachedObject.Data
            };
        }
    }
}
