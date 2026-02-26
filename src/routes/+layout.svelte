<script>
  import "../app.css";
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";

  onMount(async () => {
    // Inject Vercel Analytics only in dev to avoid inline-script CSP in production
    if (dev) {
      try {
        injectAnalytics();
      } catch {}
    }
  });
</script>

<div class="scale-desktop">
  <main>
    <slot />
  </main>
</div>

<style>
  main {
    min-height: 100vh;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* Desktop-only global scale without affecting mobile */
  .scale-desktop {
    /* default (mobile/tablet) - no scaling */
    display: block; /* avoid empty ruleset & ensure normal flow */
  }

  /* Remove desktop downscaling to restore 1:1 rendering on wide screens */
  @media (min-width: 1025px) {
    @supports (zoom: 1) {
      .scale-desktop {
        zoom: 1; /* reset to 1:1 */
        width: 100%;
        margin: 0 auto;
      }
    }
    /* Fallback for browsers without zoom support (e.g., some Firefox) */
    @supports not (zoom: 1) {
      .scale-desktop {
        position: static;
        left: auto;
        transform: none; /* reset to 1:1 */
        transform-origin: initial;
        width: 100%;
        margin: 0 auto;
        overflow: visible;
        min-height: auto;
        will-change: auto;
      }
    }
  }

  /* Prevent horizontal scroll due to pre-scale width expansion */
  :global(html, body) {
    overflow-x: hidden;
  }

  @media (max-width: 768px) {
    main {
      padding: 1rem;
    }
  }
</style>
