<!--
 * @Description: 
 * @Version: 1.0.0
 * @Autor: wangke
 * @Date: 2022-09-15 10:46:04
 * @LastEditors: wangke
 * @LastEditTime: 2022-09-15 11:47:36
-->
<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <button @click="add.c++">c is: {{ add.c }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
import { ref, reactive, defineComponent } from 'vue';
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup () {
    const count = ref(0);
    const add = reactive({c: 0});

    return {
      count,
      add,
    };
  },
  beforeMount () {
    console.log('beforeMount');
  },
  mounted () {
    console.log('mounted');
  },
  onBeforeMount () {
    console.log('onBeforeMount')
  },
  onMounted () {
    console.log('onMounted');
  }
})
</script>
