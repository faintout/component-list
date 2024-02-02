import { reactive, onMounted, onBeforeUnmount, toRefs ,computed} from 'vue'
import { debounce } from '@/utils/toolUtils.js'
const screenBaseWH = {
    width:1920,
    height:1080
}
export default function () {
    //展示的数据  可以通过App.vue 界面去隐藏
    const state = reactive({
        clientWidth : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        clientHeight : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    })
    /**
     * @description 根据设计图计算宽高比例后的结果
     * @param {number} px 设计图所示数值 px
     * @param {boolean} isHeight 是否为高度,
     * @param {number} screenWidth 设计图大小，宽或高,
     * @return {number} 转换后的比例尺寸
    */
    const screenComputed = computed(()=>{
        return (px,isHeight = false,screenWidth = screenBaseWH.width,screenHeight = screenBaseWH.height)=>{
            screenWidth = isHeight?screenHeight:screenWidth
            return isHeight?state.clientHeight / (screenWidth / px):state.clientWidth / (screenWidth / px)
        }
    })
    const screenW = computed(()=>{
        return (px,screenWidth = screenBaseWH.width)=>{
            return state.clientWidth / (screenWidth / px)
        }
    })
    const screenH = computed(()=>{
        return (px,screenHeight = screenBaseWH.height)=>{
            return state.clientHeight / (screenHeight / px)
        }
    })

    const screenChange = ()=>{
        state.clientWidth =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        state.clientHeight =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
    //现实之后调用 挂载完毕
    onMounted(() => {
        window.addEventListener('resize',debounce(screenChange,300))
    })

    //在隐藏之前调用 卸载之前
    onBeforeUnmount(() => {
        window.removeEventListener('resize',screenChange)
    })

    return {
        ...toRefs(state),
        screenW,
        screenH,
        screenComputed,
    }
}