namespace ApiStatsApp.Code.Core.Stats
{
    public class VaccinesD : IStat
    {
        public string DATE { get; set; }

        public string REGION { get; set; }

        public string AGEGROUP { get; set; }

        public string SEX { get; set; }

        public string DOSE { get; set; }

        public string COUNT { get; set; }
    }
}
