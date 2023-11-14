import createCache, { EmotionCache } from "@emotion/cache";

interface CreateEmotionCacheOptions {
  key: string;
  prepend: boolean;
}

export default function createEmotionCache(): EmotionCache {
  return createCache({ key: "css", prepend: true });
}
