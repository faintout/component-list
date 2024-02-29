const componentsUrlList = import.meta.glob('@/components/*/index.vue')
import { defineAsyncComponent } from 'vue'
let componentsList = []
for (let path in componentsUrlList) {
    if (Object.prototype.hasOwnProperty.call(componentsUrlList, path)) {
        const moduleName = path.replace(/.*\/([^/]+)\/index\.vue/, '$1')
        const moduleConfig = defineAsyncComponent(componentsUrlList[path])
        componentsList.push({
            moduleName,
            moduleConfig
        })
    }
}
export {
    componentsList
}