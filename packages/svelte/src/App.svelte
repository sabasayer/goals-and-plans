<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Theme from "./components/Theme.svelte";

  export let url: string;

  let theme: "g10" = "g10";
</script>

<Theme persist bind:theme>
  <Router {url}>
    <Route path="/" component={Home} />
  </Router>
</Theme>
