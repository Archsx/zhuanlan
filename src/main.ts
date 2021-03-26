import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/css/bootstrap-reset.scss'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
