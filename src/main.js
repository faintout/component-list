import { createApp } from 'vue'
import {componentsList} from '@/components/index.js';
import App from './App.vue'
import "@/style/global.scss"
/**
 * element-plus
 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

//组件统一加载
const app = createApp(App)
componentsList.forEach(({moduleName,moduleConfig})=>{
    app.component(moduleName,moduleConfig)
})
app.use(ElementPlus, {locale: zhCn});
app.mount('#app')
