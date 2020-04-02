namespace ApiStatsApp.Code.Core.Stats
{
    public class ConfirmedDHosp : IStat
    {
        public string DATE { get; set; }
        public string PROVINCE { get; set; }
        public string REGION { get; set; }
        public int NR_REPORTING { get; set; }
        public int TOTAL_IN { get; set; }
        public int TOTAL_IN_ICU { get; set; }
        public int TOTAL_IN_RESP { get; set; }
        public int TOTAL_IN_ECMO { get; set; }
        public int NEW_IN { get; set; }
        public int NEW_OUT { get; set; }
    }
}
