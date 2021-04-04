import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './css/reset.scss'
import './css/custom.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
