<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Theme from "./components/Theme.svelte";

  export let url: string;

  let theme: "g100" = "g100";
</script>

<Theme persist {theme}>
  <main>
    <Router {url}>
      <Route path="/" component={Home} />
    </Router>
  </main>
</Theme>

<style>
  main {
    padding: 8px;
  }
</style>
