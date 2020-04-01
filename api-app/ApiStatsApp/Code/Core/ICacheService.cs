using System;

namespace ApiStatsApp.Code.Core
{
    public interface ICacheService
    {
        void Add<T>(T o, string key, TimeSpan? expiresAfter = null) where T : class;
        void Clear(string key);
        bool Exists(string key);
        T Get<T>(string key) where T : class;
    }
}
