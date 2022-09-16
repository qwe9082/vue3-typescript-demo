<template>
  <button
    class="todo-delete-button"
    @click="triggerDelete"
    :style="{ backgroundColor: bg, color: color }"
  >
    {{ btName }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    btName: {
      type: String,
      require: true,
    },
    bg: String,
    color: String,
  },
  setup(props, { attrs }) {
    console.log("props", props, attrs);

    return {};
  },
  methods: {
    triggerDelete() {
      console.log("triggerDelete");
    },
  },
});
</script>

<style scoped>
.todo-delete-button {
  color: #fff;
}
</style>