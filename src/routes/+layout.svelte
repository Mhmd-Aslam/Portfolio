<script>
  import '../app.css';
  import { onMount, onDestroy } from 'svelte';
  import { dev } from '$app/environment';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  /** @type {any} */
  let vantaEffect;
  /** @type {any} */
  let vantaBgEl;

  // Scroll state and helpers must be defined at component scope (not inside onMount)
  let lastScroll = 0;
  let ticking = false;
  function handleScroll() {
    lastScroll = (typeof window !== 'undefined' ? (window.scrollY || window.pageYOffset) : 0);
    requestTick();
  }
  function requestTick() {
    if (!ticking && typeof window !== 'undefined') {
      window.requestAnimationFrame(updateVantaParams);
      ticking = true;
    }
  }
  function updateVantaParams() {
    ticking = false;
    if (typeof window === 'undefined') return;
    if (vantaEffect && typeof vantaEffect.setOptions === 'function') {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollPct = Math.min(lastScroll / maxScroll, 1);
      const maxDistance = 10 + scrollPct * 40;
      const spacing = 15 + scrollPct * 25;
      const color = lerpColor(0x00ff88, 0x3388ff, scrollPct);
      vantaEffect.setOptions({ maxDistance, spacing, color });
    }
  }
  function lerpColor(a, b, t) {
    const ar = (a >> 16) & 0xff, ag = (a >> 8) & 0xff, ab = a & 0xff;
    const br = (b >> 16) & 0xff, bg = (b >> 8) & 0xff, bb = b & 0xff;
    const rr = Math.round(ar + (br - ar) * t);
    const rg = Math.round(ag + (bg - ag) * t);
    const rb = Math.round(ab + (bb - ab) * t);
    return (rr << 16) + (rg << 8) + rb;
  }

  /**
   * @param {string} src
   * @returns {Promise<void>}
   */
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src='${src}']`)) return resolve();
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  onMount(async () => {
    // Inject Vercel Analytics only in dev to avoid inline-script CSP in production
    if (dev) {
      try { injectAnalytics(); } catch {}
    }
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
    await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js');
    vantaEffect = window.VANTA.NET && window.VANTA.NET({
      el: vantaBgEl,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      maxDistance: 10,
      spacing: 15,
      color: 0x00ff88
    });
    window.addEventListener('scroll', handleScroll, { passive: true });
  });

  // Clean up scroll listener and Vanta on component destroy (must be registered at init time)
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
    }
    if (vantaEffect && typeof vantaEffect.destroy === 'function') {
      vantaEffect.destroy();
    }
  });
</script>

<div id="vanta-bg" bind:this={vantaBgEl} style="position:fixed;z-index:-1;top:0;left:0;width:100vw;height:100vh;background:linear-gradient(135deg,#181c2f 0%,#1a263a 100%);"></div>
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

  /* Prefer zoom on desktop to also scale layout box (fixes extra scroll) */
  @media (min-width: 1025px) {
    @supports (zoom: 1) {
      .scale-desktop {
        zoom: 0.55; /* affects layout size so scroll ends exactly at content */
        width: 100%;
        margin: 0 auto;
      }
    }
    /* Fallback for browsers without zoom support (e.g., some Firefox) */
    @supports not (zoom: 1) {
      .scale-desktop {
        position: relative;
        left: 50%;
        transform: translateX(-50%) scale(0.55);
        transform-origin: top center;
        width: calc(100% / 0.55);
        margin: 0;
        overflow: visible;
        min-height: auto;
        will-change: transform;
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
