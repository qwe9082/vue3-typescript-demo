<template>
  <h2>
    App父组件<button @click="incrementC">{{ c.count }}</button>
  </h2>
  <button @click="show = !show">显示隐藏Child子组件{{ c.count }}</button>
  <hr />
  <Child v-if="show" />
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef } from "vue";
import type { Ref } from "vue";
import Child from "./components/Child.vue";

export default defineComponent({
  name: "App",
  components: {
    Child,
  },
  setup() {
    const show: Ref<string | boolean> = ref(true);
    const c = shallowRef({ count: 1 });

    show.value = "33";
    show.value = false;
    function incrementC() {
      c.value.count++;
      console.log(c);
    }
    return {
      c,
      incrementC,
      show,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
