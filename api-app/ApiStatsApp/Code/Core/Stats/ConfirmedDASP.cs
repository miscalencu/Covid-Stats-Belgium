namespace ApiStatsApp.Code.Core.Stats
{
    public class ConfirmedDASP : IStat
    {
        public string DATE { get; set; }
        public string PROVINCE { get; set; }
        public string REGION { get; set; }
        public string AGEGROUP { get; set; }
        public string SEX { get; set; }
        public string CASES { get; set; }
    }
}
