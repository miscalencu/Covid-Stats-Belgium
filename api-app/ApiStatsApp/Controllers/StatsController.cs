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
        public JsonResult GetCasesDateMCum([FromQuery]string filterStr)
        {
            Dictionary<string, string> filter = JsonConvert
                .DeserializeObject<IEnumerable<KeyValuePair<string, string>>>(filterStr)
                .ToDictionary(x => x.Key, x => x.Value);
            var response = GetData<ConfirmedCumDM>();
            var lang = filter["lang"];

            response.Data = response.Data
                .Where(d => (
                    filter["region"] == "ALL"
                    || (((lang == "FR" && String.IsNullOrEmpty(d.TX_RGN_DESCR_FR)) || (lang == "NL" && String.IsNullOrEmpty(d.TX_RGN_DESCR_NL))) && String.IsNullOrEmpty(filter["region"]))
                    || ((lang == "FR" && d.TX_RGN_DESCR_FR == filter["region"]) || (lang == "NL" && d.TX_RGN_DESCR_NL == filter["region"])))
                    )
                .Where(d => (
                    filter["province"] == "ALL"
                    || (((lang == "FR" && String.IsNullOrEmpty(d.TX_PROV_DESCR_FR)) || (lang == "NL" && String.IsNullOrEmpty(d.TX_PROV_DESCR_NL))) && String.IsNullOrEmpty(filter["province"]))
                    || ((lang == "FR" && d.TX_PROV_DESCR_FR == filter["province"]) || (lang == "NL" && d.TX_PROV_DESCR_NL == filter["province"])))
                    )
                .Where(d => (
                    filter["district"] == "ALL"
                    || (((lang == "FR" && String.IsNullOrEmpty(d.TX_ADM_DSTR_DESCR_FR)) || (lang == "NL" && String.IsNullOrEmpty(d.TX_ADM_DSTR_DESCR_NL))) && String.IsNullOrEmpty(filter["district"]))
                    || ((lang == "FR" && d.TX_ADM_DSTR_DESCR_FR == filter["district"]) || (lang == "NL" && d.TX_ADM_DSTR_DESCR_NL == filter["district"])))
                    )
                .Where(d => (
                    filter["city"] == "ALL"
                    || (((lang == "FR" && String.IsNullOrEmpty(d.TX_DESCR_FR)) || (lang == "NL" && String.IsNullOrEmpty(d.TX_DESCR_NL))) && String.IsNullOrEmpty(filter["city"]))
                    || ((lang == "FR" && d.TX_DESCR_FR == filter["city"]) || (lang == "NL" && d.TX_DESCR_NL == filter["city"])))
                    )
                .AsEnumerable();

            return new JsonResult(response);
        }

        [HttpGet]
        public JsonResult GetCasesDateASP([FromQuery]string filterStr)
        {
            Dictionary<string, string> filter = JsonConvert
                .DeserializeObject<IEnumerable<KeyValuePair<string, string>>>(filterStr)
                .ToDictionary(x => x.Key, x => x.Value);
            var response = GetData<ConfirmedDASP>();

            response.Data = response.Data
                .Where(d => (filter["startDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["startDate"]) >= 0)))
                .Where(d => (filter["endDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["endDate"]) <= 0)))
                .Where(d => (filter["region"] == "ALL" || (String.IsNullOrEmpty(d.REGION) && String.IsNullOrEmpty(filter["region"])) || d.REGION == filter["region"]))
                .Where(d => (filter["province"] == "ALL" || (String.IsNullOrEmpty(d.PROVINCE) && String.IsNullOrEmpty(filter["province"])) || d.PROVINCE == filter["province"]))
                .Where(d => (filter["ageGroup"] == "ALL" || (String.IsNullOrEmpty(d.AGEGROUP) && String.IsNullOrEmpty(filter["ageGroup"])) || d.AGEGROUP == filter["ageGroup"]))
                .Where(d => (filter["sex"] == "ALL" || (String.IsNullOrEmpty(d.SEX) && String.IsNullOrEmpty(filter["sex"])) || d.SEX == filter["sex"]))
                .AsEnumerable();

            return new JsonResult(response);
        }

        [HttpGet]
        public JsonResult GetCasesDateTests([FromQuery]string filterStr)
        {
            Dictionary<string, string> filter = JsonConvert
                .DeserializeObject<IEnumerable<KeyValuePair<string, string>>>(filterStr)
                .ToDictionary(x => x.Key, x => x.Value);
            var response = GetData<ConfirmedDTests>();

            response.Data = response.Data
                .Where(d => (filter["startDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["startDate"]) >= 0)))
                .Where(d => (filter["endDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["endDate"]) <= 0)))
                .AsEnumerable();

            return new JsonResult(response);
        }

        [HttpGet]
        public JsonResult GetCasesDateMort([FromQuery]string filterStr)
        {
            Dictionary<string, string> filter = JsonConvert
                .DeserializeObject<IEnumerable<KeyValuePair<string, string>>>(filterStr)
                .ToDictionary(x => x.Key, x => x.Value);
            var response = GetData<ConfirmedDMort>();

            response.Data = response.Data
                .Where(d => (filter["startDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["startDate"]) >= 0)))
                .Where(d => (filter["endDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["endDate"]) <= 0)))
                .Where(d => (filter["region"] == "ALL" || (String.IsNullOrEmpty(d.REGION) && String.IsNullOrEmpty(filter["region"])) || d.REGION == filter["region"]))
                .Where(d => (filter["ageGroup"] == "ALL" || (String.IsNullOrEmpty(d.AGEGROUP) && String.IsNullOrEmpty(filter["ageGroup"])) || d.AGEGROUP == filter["ageGroup"]))
                .Where(d => (filter["sex"] == "ALL" || (String.IsNullOrEmpty(d.SEX) && String.IsNullOrEmpty(filter["sex"])) || d.SEX == filter["sex"]))
                .AsEnumerable();

            return new JsonResult(response);
        }

        [HttpGet]
        public JsonResult GetCasesDateHosp([FromQuery]string filterStr)
        {
            Dictionary<string, string> filter = JsonConvert
                .DeserializeObject<IEnumerable<KeyValuePair<string, string>>>(filterStr)
                .ToDictionary(x => x.Key, x => x.Value);
            var response = GetData<ConfirmedDHosp>();

            response.Data = response.Data
                .Where(d => (filter["startDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["startDate"]) >= 0)))
                .Where(d => (filter["endDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["endDate"]) <= 0)))
                .Where(d => (filter["region"] == "ALL" || (String.IsNullOrEmpty(d.REGION) && String.IsNullOrEmpty(filter["region"])) || d.REGION == filter["region"]))
                .Where(d => (filter["province"] == "ALL" || (String.IsNullOrEmpty(d.PROVINCE) && String.IsNullOrEmpty(filter["province"])) || d.PROVINCE == filter["province"]))
                .AsEnumerable();

            return new JsonResult(response);
        }

        [HttpGet]
        public JsonResult GetCasesDateM([FromQuery]string filterStr)
        {
            Dictionary<string, string> filter = JsonConvert
                .DeserializeObject<IEnumerable<KeyValuePair<string, string>>>(filterStr)
                .ToDictionary(x => x.Key, x => x.Value);
            var response = GetData<ConfirmedDM>();
            var lang = filter["lang"];

            response.Data = response.Data
                .Where(d => (filter["startDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["startDate"]) >= 0)))
                .Where(d => (filter["endDate"] == "" || String.IsNullOrEmpty(d.DATE) || (d.DATE.CompareTo(filter["endDate"]) <= 0)))
                .Where(d => (
                    filter["region"] == "ALL" 
                    || (((lang == "FR" && String.IsNullOrEmpty(d.TX_RGN_DESCR_FR)) || (lang == "NL" && String.IsNullOrEmpty(d.TX_RGN_DESCR_NL))) && String.IsNullOrEmpty(filter["region"])) 
                    || ((lang == "FR" && d.TX_RGN_DESCR_FR == filter["region"]) || (lang == "NL" && d.TX_RGN_DESCR_NL == filter["region"])))
                    )
                .Where(d => (
                    filter["province"] == "ALL"
                    || (((lang == "FR" && String.IsNullOrEmpty(d.TX_PROV_DESCR_FR)) || (lang == "NL" && String.IsNullOrEmpty(d.TX_PROV_DESCR_NL))) && String.IsNullOrEmpty(filter["province"]))
                    || ((lang == "FR" && d.TX_PROV_DESCR_FR == filter["province"]) || (lang == "NL" && d.TX_PROV_DESCR_NL == filter["province"])))
                    )
                .Where(d => (
                    filter["district"] == "ALL"
                    || (((lang == "FR" && String.IsNullOrEmpty(d.TX_ADM_DSTR_DESCR_FR)) || (lang == "NL" && String.IsNullOrEmpty(d.TX_ADM_DSTR_DESCR_NL))) && String.IsNullOrEmpty(filter["district"]))
                    || ((lang == "FR" && d.TX_ADM_DSTR_DESCR_FR == filter["district"]) || (lang == "NL" && d.TX_ADM_DSTR_DESCR_NL == filter["district"])))
                    )
                .Where(d => (
                    filter["city"] == "ALL"
                    || (((lang == "FR" && String.IsNullOrEmpty(d.TX_DESCR_FR)) || (lang == "NL" && String.IsNullOrEmpty(d.TX_DESCR_NL))) && String.IsNullOrEmpty(filter["city"]))
                    || ((lang == "FR" && d.TX_DESCR_FR == filter["city"]) || (lang == "NL" && d.TX_DESCR_NL == filter["city"])))
                    )
                .AsEnumerable();

            return new JsonResult(response);
        }

        [HttpGet]
        public JsonResult GetData([FromQuery]StatType type)
        {
            return type switch
            {
                StatType.CasesDateASP => new JsonResult(GetData<ConfirmedDASP>()),
                StatType.CasesDateM => new JsonResult(GetData<ConfirmedDM>()),
                _ => null,
            };
        }

        [HttpGet]
        public JsonResult GetFilterData([FromQuery]StatType type, [FromQuery]string field, [FromQuery]string lang, [FromQuery]string re) {
            switch (type)
            {
                case StatType.CasesDateASP:
                    {
                        IEnumerable<ConfirmedDASP> data = GetData<ConfirmedDASP>().Data;
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
                    }
                    break;
                case StatType.CasesDateM:
                    {
                        IEnumerable<ConfirmedDM> data = GetData<ConfirmedDM>().Data;
                        switch (field)
                        {
                            case "region":
                                return new JsonResult(data
                                    .Select(d => lang == "FR" ? d.TX_RGN_DESCR_FR : d.TX_RGN_DESCR_NL).OrderBy(d => d).Distinct());
                            case "province":
                                return new JsonResult(data
                                    .Where(d => ((lang == "FR" ? d.TX_RGN_DESCR_FR : d.TX_RGN_DESCR_NL) == re) || re == "ALL")
                                    .Select(d => lang == "FR" ? d.TX_PROV_DESCR_FR : d.TX_PROV_DESCR_NL)
                                    .OrderBy(d => d).Distinct());
                            case "district":
                                {
                                    var refs = re.Split('|'); // Region|Province
                                    return new JsonResult(data
                                        .Where(d => ((lang == "FR" ? d.TX_RGN_DESCR_FR : d.TX_RGN_DESCR_NL) == refs[0]) || refs[0] == "ALL")
                                        .Where(d => ((lang == "FR" ? d.TX_PROV_DESCR_FR : d.TX_PROV_DESCR_NL) == refs[1]) || refs[1] == "ALL")
                                        .Select(d => lang == "FR" ? d.TX_ADM_DSTR_DESCR_FR : d.TX_ADM_DSTR_DESCR_NL)
                                        .OrderBy(d => d).Distinct());
                                }
                            case "city":
                                {
                                    var refs = re.Split('|'); // Region|Province|District
                                    return new JsonResult(data
                                        .Where(d => ((lang == "FR" ? d.TX_RGN_DESCR_FR : d.TX_RGN_DESCR_NL) == refs[0]) || refs[0] == "ALL")
                                        .Where(d => ((lang == "FR" ? d.TX_PROV_DESCR_FR : d.TX_PROV_DESCR_NL) == refs[1]) || refs[1] == "ALL")
                                        .Where(d => ((lang == "FR" ? d.TX_ADM_DSTR_DESCR_FR : d.TX_ADM_DSTR_DESCR_NL) == refs[2]) || refs[2] == "ALL")
                                        .Select(d => lang == "FR" ? d.TX_DESCR_FR : d.TX_DESCR_NL)
                                        .OrderBy(d => d).Distinct());
                                }
                            default:
                                break;
                        }
                    }
                    break;
                case StatType.CasesDateCumM:
                    {
                        IEnumerable<ConfirmedCumDM> data = GetData<ConfirmedCumDM>().Data;
                        switch (field)
                        {
                            case "region":
                                return new JsonResult(data
                                    .Select(d => lang == "FR" ? d.TX_RGN_DESCR_FR : d.TX_RGN_DESCR_NL).OrderBy(d => d).Distinct());
                            case "province":
                                return new JsonResult(data
                                    .Where(d => ((lang == "FR" ? d.TX_RGN_DESCR_FR : d.TX_RGN_DESCR_NL) == re) || re == "ALL")
                                    .Select(d => lang == "FR" ? d.TX_PROV_DESCR_FR : d.TX_PROV_DESCR_NL)
                                    .OrderBy(d => d).Distinct());
                            case "district":
                                {
                                    var refs = re.Split('|'); // Region|Province
                                    return new JsonResult(data
                                        .Where(d => ((lang == "FR" ? d.TX_RGN_DESCR_FR : d.TX_RGN_DESCR_NL) == refs[0]) || refs[0] == "ALL")
                                        .Where(d => ((lang == "FR" ? d.TX_PROV_DESCR_FR : d.TX_PROV_DESCR_NL) == refs[1]) || refs[1] == "ALL")
                                        .Select(d => lang == "FR" ? d.TX_ADM_DSTR_DESCR_FR : d.TX_ADM_DSTR_DESCR_NL)
                                        .OrderBy(d => d).Distinct());
                                }
                            case "city":
                                {
                                    var refs = re.Split('|'); // Region|Province|District
                                    return new JsonResult(data
                                        .Where(d => ((lang == "FR" ? d.TX_RGN_DESCR_FR : d.TX_RGN_DESCR_NL) == refs[0]) || refs[0] == "ALL")
                                        .Where(d => ((lang == "FR" ? d.TX_PROV_DESCR_FR : d.TX_PROV_DESCR_NL) == refs[1]) || refs[1] == "ALL")
                                        .Where(d => ((lang == "FR" ? d.TX_ADM_DSTR_DESCR_FR : d.TX_ADM_DSTR_DESCR_NL) == refs[2]) || refs[2] == "ALL")
                                        .Select(d => lang == "FR" ? d.TX_DESCR_FR : d.TX_DESCR_NL)
                                        .OrderBy(d => d).Distinct());
                                }
                            default:
                                break;
                        }
                    }
                    break;
                case StatType.CasesDateHosp:
                    {
                        IEnumerable<ConfirmedDASP> data = GetData<ConfirmedDASP>().Data;
                        switch (field)
                        {
                            case "region":
                                return new JsonResult(data.Select(d => d.REGION).OrderBy(d => d).Distinct());
                            case "province":
                                return new JsonResult(data.Where(d => (d.REGION == re || re == "ALL")).Select(d => d.PROVINCE).OrderBy(d => d).Distinct());
                            default:
                                break;
                        }
                    }
                    break;
                case StatType.CasesDateMort:
                    {
                        IEnumerable<ConfirmedDMort> data = GetData<ConfirmedDMort>().Data;
                        switch (field)
                        {
                            case "region":
                                return new JsonResult(data.Select(d => d.REGION).OrderBy(d => d).Distinct());
                            case "ageGroup":
                                return new JsonResult(data.Select(d => d.AGEGROUP).OrderBy(d => d).Distinct());
                            case "sex":
                                return new JsonResult(data.Select(d => d.SEX).OrderBy(d => d).Distinct());
                            default:
                                break;
                        }
                    }
                    break;
                case StatType.CasesDateTests:
                    {
                        IEnumerable<ConfirmedDASP> data = GetData<ConfirmedDASP>().Data;
                        switch (field)
                        {
                            default:
                                break;
                        }
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
                case nameof(ConfirmedDASP):
                    apiPart = "COVID19BE_CASES_AGESEX";
                    break;
                case nameof(ConfirmedDM):
                    apiPart = "COVID19BE_CASES_MUNI";
                    break;
                case nameof(ConfirmedCumDM):
                    apiPart = "COVID19BE_CASES_MUNI_CUM";
                    break;
                case nameof(ConfirmedDHosp):
                    apiPart = "COVID19BE_HOSP";
                    break;
                case nameof(ConfirmedDMort):
                    apiPart = "COVID19BE_MORT";
                    break;
                case nameof(ConfirmedDTests):
                    apiPart = "COVID19BE_TESTS";
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

                strData = strData
                    .Replace("Li�ge", "Liège")
                    .Replace("R�gion", "Région")
                    .Replace("S�re", "Sûre")
                    .Replace("h�teau", "hâteau")
                    .Replace("Anh�e", "Anhée")
                    .Replace("B�tgenbach", "Bütgenbach")
                    .Replace("Chi�vres", "Chièvres")
                    .Replace("Ch�tele", "Châtelet")
                    .Replace("d�", "d'")
                    .Replace("l�", "l'");
                
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
