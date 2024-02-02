let componentsUrlList = import.meta.glob('@/components/*/index.vue')
let componentsList = []
for (let path in componentsUrlList) {
    if (Object.prototype.hasOwnProperty.call(componentsUrlList, path)) {
        let moduleName = path.replace(/.*\/([^/]+)\/index\.vue/, '$1')
        let moduleConfig = await componentsUrlList[path]()
        componentsList.push({
            moduleName,
            moduleConfig:moduleConfig.default
        })
    }
}
export {
    componentsList
}