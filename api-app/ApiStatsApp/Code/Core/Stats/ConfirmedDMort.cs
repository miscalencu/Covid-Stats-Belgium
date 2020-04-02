namespace ApiStatsApp.Code.Core.Stats
{
    public class ConfirmedDMort : IStat
    {
        public string DATE { get; set; }
        public string REGION { get; set; }
        public string AGEGROUP { get; set; }
        public string SEX { get; set; }
        public int DEATHS { get; set; }
    }
}
