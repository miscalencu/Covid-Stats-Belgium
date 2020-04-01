using System;
using System.Collections.Generic;

namespace ApiStatsApp.Code.Core.Stats
{
    public class StatsResponse<T> where T : IStat
    {
        public string Source { get; set; }
        public DateTime DownloadDate { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}
