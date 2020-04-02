namespace ApiStatsApp.Code.Core.Stats
{
    public class ConfirmedDHosp : IStat
    {
        public string DATE { get; set; }
        public string PROVINCE { get; set; }
        public string REGION { get; set; }
        public string NR_REPORTING { get; set; }
        public string TOTAL_IN { get; set; }
        public string TOTAL_IN_ICU { get; set; }
        public string TOTAL_IN_RESP { get; set; }
        public string TOTAL_IN_ECMO { get; set; }
        public string NEW_IN { get; set; }
        public string NEW_OUT { get; set; }
    }
}
