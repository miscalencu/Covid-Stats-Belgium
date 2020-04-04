using Newtonsoft.Json;
using System.Collections.Generic;

namespace ApiStatsApp.Code.Core.Stats
{
    public class ConfirmedDTests : IStat
    {
        public string DATE { get; set; }
        public string TESTS { get; set; }
    }

    public class ConfirmedDTestsRespose {
        public string SASJSONExport { get; set; }

        [JsonProperty("SASTableData+COVID19BE_TESTS")]
        public IEnumerable<ConfirmedDTests> SASTableData_COVID19BE_TESTS { get; set; }
    }
}
