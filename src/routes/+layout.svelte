<script>
  import '../app.css';
  import { onMount, onDestroy } from 'svelte';
  let vantaEffect;
  let vantaBgEl;

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
    // @ts-ignore
    vantaEffect = window.VANTA.NET && window.VANTA.NET({
      el: vantaBgEl,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00
    });
  });

  onDestroy(() => {
    if (vantaEffect && typeof vantaEffect.destroy === 'function') {
      vantaEffect.destroy();
    }
  });
</script>

<div id="vanta-bg" bind:this={vantaBgEl} style="position:fixed;z-index:-1;top:0;left:0;width:100vw;height:100vh;background:linear-gradient(135deg,#181c2f 0%,#1a263a 100%);"></div>
<main>
  <slot />
  <div style="color:red;text-align:center;margin-top:2rem;">If you see this message, the slot is rendering.</div>
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
