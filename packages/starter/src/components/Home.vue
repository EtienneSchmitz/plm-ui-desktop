<template>
  <form>
    <input type="button" value="Test watching" />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "TaskList",
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    fetch("http://localhost:8080/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((tasks) => {
        this.tasks = tasks;
      });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
