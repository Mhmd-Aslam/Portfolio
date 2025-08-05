<script>
  import '../app.css';
  import { onMount, onDestroy } from 'svelte';
  /** @type {any} */
  let vantaEffect;
  /** @type {any} */
  let vantaBgEl;

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
    // All browser-dependent code below
    let lastScroll = 0;
    let ticking = false;
    function handleScroll() {
      lastScroll = window.scrollY || window.pageYOffset;
      requestTick();
    }
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateVantaParams);
        ticking = true;
      }
    }
    function updateVantaParams() {
      ticking = false;
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Clean up scroll listener and Vanta on destroy
    onDestroy(() => {
      window.removeEventListener('scroll', handleScroll);
      if (vantaEffect && typeof vantaEffect.destroy === 'function') {
        vantaEffect.destroy();
      }
    });
  });
</script>

<div id="vanta-bg" bind:this={vantaBgEl} style="position:fixed;z-index:-1;top:0;left:0;width:100vw;height:100vh;background:linear-gradient(135deg,#181c2f 0%,#1a263a 100%);"></div>
<main>
  <slot />

</main>

<style>
  main {
    min-height: 100vh;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    main {
      padding: 1rem;
    }
  }
</style>
