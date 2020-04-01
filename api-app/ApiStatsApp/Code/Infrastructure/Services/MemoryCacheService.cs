using Microsoft.Extensions.Caching.Memory;
using ApiStatsApp.Code.Core;
using System;

namespace ApiStatsApp.Code.Infrastructure.Services
{
    public class MemoryCacheService : IMemoryCacheService
    {
        private readonly IMemoryCache _memoryCache;

        public MemoryCacheService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public void Add<T>(T o, string key, TimeSpan? expiresAfter = null) where T : class
        {
            if (!_memoryCache.TryGetValue<T>(key, out T cacheEntry))
            {
                // Key not in cache, so get data.
                cacheEntry = o;

                var cacheEntryOptions = new MemoryCacheEntryOptions();
                // Set cache options.
                if (expiresAfter != null)
                {
                    cacheEntryOptions
                        // Keep in cache for this time, reset time if accessed.
                        .SetAbsoluteExpiration(expiresAfter.Value);
                }

                // Save data in cache.
                _memoryCache.Set(key, cacheEntry, cacheEntryOptions);
            }
        }

        public void Clear(string key)
        {
            _memoryCache.Remove(key);
        }

        public bool Exists(string key)
        {
            return _memoryCache.TryGetValue(key, out object cacheEntry);
        }

        public T Get<T>(string key) where T : class
        {
            if (_memoryCache.TryGetValue<T>(key, out T cacheEntry))
            {
                return cacheEntry;
            }

            return null;
        }
    }
}
