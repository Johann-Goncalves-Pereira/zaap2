import qwikdev from "@qwikdev/astro";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [qwikdev(), tailwind(), partytown()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  prefetch: true,
});
