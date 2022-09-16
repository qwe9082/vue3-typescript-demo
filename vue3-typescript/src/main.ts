import { createApp } from 'vue'
import App from './App.vue'
import ToDoDeleteButton from './common/ToDoDeleteButton.vue';

const app = createApp(App)
app.component('ToDoDeleteButton', ToDoDeleteButton);


app.mount('#app');

