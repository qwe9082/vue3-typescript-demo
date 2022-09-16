<template>
  <div>
    <h2 class="child">Child子组件</h2>
    <button @click="incrementC">
      reactive: {{ c.count }}-{{ c.append.number }}-{{ c.append.content }}
    </button>
    <button @click="incrementD">
      shallowReactive: {{ d.count }}-{{ d.append.number }}-{{
        d.append.content
      }}
    </button>
    <br />
    <input type="text" ref="Refer" class="input" />
    <br />
    <ToDoDeleteButton
      :btName="'child'"
      :bg="'red'"
      :color="'#fff'"
      class="tddb"
      data-v="btn"
    />

    <toRefs />
  </div>
</template>

<script lang="ts">
import toRefs from "./toRefs.vue";
import {
  defineComponent,
  isReactive,
  // onBeforeMount,
  // onBeforeUnmount,
  // onBeforeUpdate,
  // onMounted,
  // onUnmounted,
  // onUpdated,
  reactive,
  ref,
  shallowReactive,
} from "vue";

export default defineComponent({
  name: "Child",
  data() {
    return {};
  },
  methods: {
    hello(str: string) {
      console.log(str);
    },
  },
  // beforeCreate () {
  //   console.log('2.0x beforeCreate');
  // },
  // created () {
  //   console.log('2.0x created');
  // },
  // beforeMount () {
  //   console.log('2.0x beforeMount');
  // },
  // mounted () {
  //   console.log('2.0x mounted');
  // },
  // beforeUpdate () {
  //   console.log('2.0x beforeUpdate');
  // },
  // updated () {
  //   console.log('2.0x updated');
  // },
  // beforeUnmount () {
  //   console.log('2.0x beforeUnmount');
  // },
  // unmounted () {
  //   console.log('2.0x unmounted');
  // },
  setup(props, { attrs, slots, emit, expose }) {
    console.log("3.0x setup called", props, attrs, slots, emit, expose);
    const c = reactive({ count: 0, append: { number: 10, content: "c" } });
    const d = shallowReactive({
      count: 100,
      append: { number: 200, content: "d" },
    });

    console.log(c, d);

    const Refer = ref<HTMLElement | null>(null);

    function incrementC() {
      c.count++;
      c.append.number++;
      c.append.content += "c";
    }

    function incrementD() {
      // d.count++;
      d.append.number++;
      d.append.content += "d";
    }

    console.log(isReactive(d.append.number));
    // onBeforeMount(() => {
    //   console.log('3.0x onBeforeMount')
    // })
    // onMounted(() => {
    //   console.log('3.0x onMounted')
    //   Refer.value && Refer.value.focus();
    // })
    // onBeforeUpdate(() => {
    //   console.log('3.0x onBeforeUpdate')
    // })
    // onUpdated(() => {
    //   console.log('3.0x onUpdated')
    // })
    // onBeforeUnmount(() => {
    //   console.log('3.0x onBeforeUnmount')
    // })
    // onUnmounted(() => {
    //   console.log('3.0x onUnmounted')
    // })

    return {
      c,
      d,
      incrementC,
      incrementD,
      Refer,
    };
  },
  components: {
    toRefs,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input {
  margin: 0;
}
</style>
