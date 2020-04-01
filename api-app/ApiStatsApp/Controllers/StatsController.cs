using ApiStatsApp.Code.Core;
using ApiStatsApp.Code.Core.Stats;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;

namespace ApiStatsApp.Controllers
{
    [ApiController]
    [EnableCors("AllowOrigin")]
    [Route("[controller]/[action]")]
    public class StatsController : ControllerBase
    {
        private readonly IMemoryCacheService _cacheService;

        public StatsController(IMemoryCacheService memoryCacheService)
        {
            _cacheService = memoryCacheService;   
        }

        [HttpGet]
        public JsonResult GetConfirmedASDM([FromQuery]string filterStr)
        {
            Dictionary<string, string> filter = JsonConvert
                .DeserializeObject<IEnumerable<KeyValuePair<string, string>>>(filterStr)
                .ToDictionary(x => x.Key, x => x.Value);
            var response = GetData<ConfirmedASDM>();

            response.Data = response.Data
                .Where(d => (filter["startDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["startDate"]) > 0)))
                .Where(d => (filter["endDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["endDate"]) < 0)))
                .Where(d => (filter["region"] == "ALL" || (String.IsNullOrEmpty(d.REGION) && String.IsNullOrEmpty(filter["region"])) || d.REGION == filter["region"]))
                .Where(d => (filter["province"] == "ALL" || (String.IsNullOrEmpty(d.PROVINCE) && String.IsNullOrEmpty(filter["province"])) || d.PROVINCE == filter["province"]))
                .Where(d => (filter["ageGroup"] == "ALL" || (String.IsNullOrEmpty(d.AGEGROUP) && String.IsNullOrEmpty(filter["ageGroup"])) || d.AGEGROUP == filter["ageGroup"]))
                .Where(d => (filter["sex"] == "ALL" || (String.IsNullOrEmpty(d.SEX) && String.IsNullOrEmpty(filter["sex"])) || d.SEX == filter["sex"]))
                .AsEnumerable();

            return new JsonResult(response);
        }


        [HttpGet]
        public JsonResult GetData([FromQuery]StatType type)
        {
            return type switch
            {
                StatType.CasesDateASP => new JsonResult(GetData<ConfirmedASDM>()),
                _ => null,
            };
        }

        [HttpGet]
        public JsonResult GetFilterData([FromQuery]StatType type, [FromQuery]string field, [FromQuery]string re) {
            switch (type)
            {
                case StatType.CasesDateASP:
                    IEnumerable<ConfirmedASDM> data = GetData<ConfirmedASDM>().Data;
                    switch (field)
                    {
                        case "region":
                            return new JsonResult(data.Select(d => d.REGION).OrderBy(d => d).Distinct());
                        case "province":
                            return new JsonResult(data.Where(d => (d.REGION == re || re == "ALL")).Select(d => d.PROVINCE).OrderBy(d => d).Distinct());
                        case "ageGroup":
                            return new JsonResult(data.Select(d => d.AGEGROUP).OrderBy(d => d).Distinct());
                        case "sex":
                            return new JsonResult(data.Select(d => d.SEX).OrderBy(d => d).Distinct());
                        default:
                            break;
                    }
                    break;
            }

            return null;
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
