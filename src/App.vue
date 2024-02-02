<template>
  <div class="components-area">
    <div class="title">组件记录</div>
    <div class="component-name-area">
      <div class="btn-item" :class="{ 'active': btnActiveIndex === index }" @click="changeBtnValue(btn, index)"
        v-for="(btn, index) in componentsList" :key="btn.value">{{ btn.moduleName }}</div>
      <div class="active-bg" :style="{ 'left': screenW((btnActiveIndex) * 104) + 'px' }"></div>
    </div>
    <div class="content">
      <component :is="componentsList[btnActiveIndex].moduleName"></component>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import {componentsList} from '@/components/index.js';
import useScreen from '@/hooks/useScreen.js'
const { screenW } = useScreen()
const btnActiveIndex = ref(0)

const changeBtnValue = (btn,index)=>{
  btnActiveIndex.value = index
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #001529 !important;
  color: #eae8e8;
}

.components-area {
  padding: pxTvw(8);
  margin: pxTvw(8);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  width:calc(100% - pxTvw(16*2));
  height:calc(100% - pxTvw(16*2));;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  &>.title {
    height: pxTvh(20);
    margin-bottom: pxTvw(8);
  }

  &>.component-name-area {
    width: fit-content;
    display: flex;
    align-items: center;
    height: pxTvw(40);
    margin-bottom: pxTvh(8);
    border-radius: pxTvw(4) pxTvw(4) pxTvw(4) pxTvw(4);
    background-color: #1d356a;
    position: relative;
    z-index: 1;

    .btn-item {
      width: pxTvw(104);
      height: pxTvw(34);
      position: relative;
      color: #A5ADBA;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 3;
    }

    .active-bg {
      transition: all 200ms;
      background-color: #165dff;
      border-radius: pxTvw(2) pxTvw(2) pxTvw(2) pxTvw(2);
      width: pxTvw(104);
      height: pxTvw(34);
      position: absolute;
      top: pxTvh(3);
      z-index: 2;
    }

    .active {
      transition: all 200ms;
      color: #fff;
    }
  }

  &>.content{
    flex: 1;
  }
}
</style>
