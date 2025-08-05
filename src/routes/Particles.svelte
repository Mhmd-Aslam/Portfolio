<script lang="ts">
  import Particles from 'svelte-particles';

  // Example cyber/techy config, can be customized
  const options = {
    background: {
      color: { value: 'transparent' }
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        resize: true
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 }
      }
    },
    particles: {
      color: { value: '#00ffea' },
      links: {
        color: '#00ffea',
        distance: 120,
        enable: true,
        opacity: 0.4,
        width: 1
      },
      collisions: { enable: false },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: false,
        speed: 1.5,
        straight: false
      },
      number: {
        density: { enable: true, area: 900 },
        value: 60
      },
      opacity: { value: 0.5 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 4 } }
    },
    detectRetina: true
  };
</script>

<style>
.particles-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>

<div class="particles-bg">
  <Particles id="tsparticles" options={options} />
</div>
