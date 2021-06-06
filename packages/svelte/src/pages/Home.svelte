<script>
  import { Modal, DataTable, Button } from "carbon-components-svelte";

  let visible = false;

  function toggle() {
    console.log("toggle");
    visible = !visible;
  }

  let headers = [
    { key: "name", value: "Name" },
    { key: "protocol", value: "Protocol" },
    { key: "port", value: "Port" }, 
    { key: "rule", value: "Rule" },
  ];

  let rows = [
    {
      id: "a",
      name: "Load Balancer 3",
      protocol: "HTTP",
      port: 3000,
      rule: "Round robin",
    },
    {
      id: "b",
      name: "Load Balancer 1",
      protocol: "HTTP",
      port: 443,
      rule: "Round robin",
    },
    {
      id: "c",
      name: "Load Balancer 2",
      protocol: "HTTP",
      port: 80,
      rule: "DNS delegation",
    },
    {
      id: "d",
      name: "Load Balancer 6",
      protocol: "HTTP",
      port: 3000,
      rule: "Round robin",
    },
    {
      id: "e",
      name: "Load Balancer 4",
      protocol: "HTTP",
      port: 443,
      rule: "Round robin",
    },
    {
      id: "f",
      name: "Load Balancer 5",
      protocol: "HTTP",
      port: 80,
      rule: "DNS delegation",
    },
  ];
</script>

<Button on:click={toggle}>Open</Button>

<Modal
  open={visible}
  modalHeading="Create database"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  size="lg"
  on:click:button--secondary={toggle}
  on:open
  on:close={toggle}
  on:submit
>
  <DataTable {headers} {rows} />
</Modal>
