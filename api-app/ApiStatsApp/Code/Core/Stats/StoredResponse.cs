using System;
using System.Collections.Generic;

namespace ApiStatsApp.Code.Core.Stats
{
    public class StoredResponse<T> where T : IStat
    {
        public DateTime DownloadDate { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}
