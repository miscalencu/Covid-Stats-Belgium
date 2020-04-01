namespace ApiStatsApp.Code.Core.Stats
{
    public class ConfirmedDM : IStat
    {
        public string DATE { get; set; }
        public string CASES { get; set; }
        public string NIS5 { get; set; }
        public string TX_DESCR_NL { get; set; }
        public string TX_DESCR_FR { get; set; }
        public string TX_ADM_DSTR_DESCR_NL { get; set; }
        public string TX_ADM_DSTR_DESCR_FR { get; set; }
        public string TX_PROV_DESCR_NL { get; set; }
        public string TX_PROV_DESCR_FR { get; set; }
        public string TX_RGN_DESCR_NL { get; set; }
        public string TX_RGN_DESCR_FR { get; set; }
    }
}
