<script lang="ts">
  import '../app.css';
</script>

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
