<script lang="ts">
  import { onMount } from 'svelte';

  let vantaRef!: HTMLElement;

  // dynamically import libraries only on the client to avoid SSR errors
  onMount(() => {
    let vantaEffect: any;

    // immediately-invoked async function to load libs only in browser
    (async () => {
    const [{ default: NET }, THREE] = await Promise.all([
      import('vanta/dist/vanta.net.min.js'),
      import('three')
    ]);

    const vantaEffect = NET({
      el: vantaRef,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x3f8eff,
      backgroundColor: 0x0
    });

    })();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  });


</script>

<div class="fixed top-0 left-0 w-full h-full -z-10" bind:this={vantaRef}></div>
