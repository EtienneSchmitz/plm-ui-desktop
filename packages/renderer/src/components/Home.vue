<template>
  <div v-if="tasks">
    <div v-for="item in tasks" :key="item.ID">{{ item.ID }} - {{ item.Name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskList",
  data() {
    return {
      tasks: [] as { ID: number; Name: string }[],
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
