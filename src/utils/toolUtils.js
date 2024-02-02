//深度合并-深拷贝,参数同Objec.assign
function deepMerge(obj1, obj2) {
  let key;
  for (key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    // 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
    obj1[key] =
      obj1[key] &&
        obj1[key].toString() === "[object Object]" &&
        (obj2[key] && obj2[key].toString() === "[object Object]")
        ? deepMerge(obj1[key], obj2[key])
        : (obj1[key] = obj2[key]);
  }
  return deepClone(obj1)
}
//深拷贝
function deepClone(obj) {
  //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  var objClone = Array.isArray(obj) ? [] : {};
  //进行深拷贝的不能为空，并且是对象或者是
  if (obj && typeof obj === "object") {
    let key;
    for (key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}

/**
 * @description 屏幕计算
 * @param px {Number} 设计图上的像素
 * @param screenWidth {Number} 设计图上的宽度/高度
 * @return {Number} 根据屏幕宽度计算后的大小。
*/
function screenComputed(px, screenWidth = 7680) {
  // 计算方式
  // 设计图总宽度/设计图像素 = 屏幕实际的宽度/?
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  return clientWidth / (screenWidth / px)
}

// 自适应表格列宽
function flexColumnWidth(str, tableData, titleStr = "", flag = "max") {
  // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
  // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
  // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
  str = str + "";
  let columnContent = "";
  if (
    (!tableData ||
      !tableData.length ||
      tableData.length === 0 ||
      tableData === undefined) && !titleStr
  ) {
    return;
  }
  if (!str || !str.length || str.length === 0 || str === undefined) {
    return;
  }
  if (flag === "equal") {
    // 获取该列中第一个不为空的数据(内容)
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i][str] + ''.length > 0) {
        // console.log('该列数据[0]:', tableData[0][str])
        columnContent = tableData[i][str] + '';
        break;
      }
    }
  } else {
    // 获取该列中最长的数据(内容)
    let index = 0;
    for (let i = 0; i < tableData?.length; i++) {
      if (tableData[i][str] + '' === null) {
        return;
      }
      const now_temp = tableData[i][str] + "";
      const max_temp = tableData[index][str] + "";
      if (now_temp.length > max_temp.length) {
        index = i;
      }
    }
    columnContent = tableData?.length ? tableData[index][str] + '' : titleStr;
    //增加标题长度判断
    columnContent = titleStr.length >= columnContent.length ? titleStr : columnContent
  }
  // console.log('该列数据[i]:', columnContent)
  // 以下分配的单位长度可根据实际需求进行调整
  let flexWidth = 0;
  for (const char of columnContent) {
    if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) {
      // 如果是英文字符，为字符分配8个单位宽度
      flexWidth += 17;
    } else if (char >= "\u4e00" && char <= "\u9fa5") {
      // 如果是中文字符，为字符分配15个单位宽度
      flexWidth += 17;
    } else {
      // 其他种类字符，为字符分配8个单位宽度
      flexWidth += 8;
    }
  }
  if (flexWidth < 80) {
    // 设置最小宽度
    flexWidth = 80;
  }
  if (flexWidth > 300) {
    flexWidth = 300;
  }
  flexWidth = (4 * flexWidth * document.body.clientWidth) / 7680;
  // console.log('flexWidth',flexWidth);
  return flexWidth + "px";
}
//计算单位
function unitConverter(num) {
  if (!num || isNaN(num)) {
    return '0'
  }
  // 此处为防止字符串形式的数值进来，因为toFixed方法只能用于数值型数
  num = Number(num)
  if (Math.abs(num) >= 100000000) {
    return (num / 100000000) + '亿'
  } else if (Math.abs(num) >= 10000) {
    return (num / 10000) + '万'
  } else {
    return parseInt(num)
  }
}
// 大数字处理
function bigNumberTransform(value) {
  const newValue = ['', '', '']
  let fr = 1000
  let num = 3
  let text1 = ''
  let fm = 1
  while (value / fr >= 1) {
    fr *= 10
    num += 1
    // console.log('数字', value / fr, 'num:', num)
  }
  if (num <= 4) { // 千
    newValue[0] = value + ''
  } else if (num <= 8) { // 万
    text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
    // tslint:disable-next-line:no-shadowed-variable
    fm = text1 === '万' ? 10000 : 10000000
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = text1
  } else if (num <= 16) { // 亿
    text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
    text1 = (num - 8) / 4 > 1 ? '万亿' : text1
    text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
    // tslint:disable-next-line:no-shadowed-variable
    fm = 1
    if (text1 === '亿') {
      fm = 100000000
    } else if (text1 === '千亿') {
      fm = 100000000000
    } else if (text1 === '万亿') {
      fm = 1000000000000
    } else if (text1 === '千万亿') {
      fm = 1000000000000000
    }
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = text1
  }
  if (value < 1000) {
    newValue[0] = value + ''
    newValue[1] = ''
  }
  return newValue.join('')
}
//防抖
function debounce(fn, delay = 1000) {
  let timeout
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.call(this, arguments);

    }, delay);
  };
}
//请求后下载文件
function resLoadFile(res, name) {
  let blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=UTF-8' });
  let zipUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = zipUrl;
  if (name) link.download = name // 自定义文件名
  link.click(); // 下载文件
  window.URL.revokeObjectURL(zipUrl); // 释放内存
}


//是否有最后一位字符串，有则添加无则返回当前
function hasAndAddLastStr (originStr,lastStr){
    if(!originStr||!lastStr){
      return originStr
    }
    if(originStr.at(-1)===lastStr){
      return originStr
    }else{
      return originStr + lastStr
    }
}
//获取随机uuid
function guid() {
  function uid() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (uid() + uid() + "-" + uid() + "-" + uid() + "-" + uid() + "-" + uid() + uid() + uid());
}

//求最大值索引
function findGreatestIndices(arr) {
  const val = Math.max(...arr);
  const greatest = arr.reduce((indexes, element, index) => {
    if (element === val) {
      return indexes.concat([index]);
    } else {
      return indexes;
    }
  }, [])
  return greatest;
}


//指定二维数组个数
//num - 二维数组个数
//arr - 原始数组
function arrTrans(arr, num) {
const newArr = [];
while(arr.length > 0) {
newArr.push(arr.splice(0, num));
}
return newArr;
}


// 获取百分比位置对应的颜色值
const getColorAtPercentage = (percentage,gradientColorList)=> {
  const gradientColors = gradientColorList||[
    // { color: 'rgba(30, 204, 153,1)', position: 0 },
    { color: 'rgba(30,204,153,1)', position: 0 },
    { color: 'rgba(255, 179, 0, 1)', position: 50 },
    { color: 'rgba(255, 104, 83, 1)', position: 100 },
  ]
  for (let i = 0; i < gradientColors.length - 1; i++) {
    if (percentage >= gradientColors[i].position && percentage <= gradientColors[i + 1].position) {
      const lowerBound = gradientColors[i].position;
      const upperBound = gradientColors[i + 1].position;
      const lowerColor = gradientColors[i].color;
      const upperColor = gradientColors[i + 1].color;
      const ratio = (percentage - lowerBound) / (upperBound - lowerBound);
      return interpolateColors(lowerColor, upperColor, ratio);
    }
  }
  return gradientColors[0].color; // 默认返回第一个颜色
}
// 插值计算
const interpolateColors = (color1, color2, ratio)=> {
  const color1Arr = color1.match(/\d+/g).map(Number);
  const color2Arr = color2.match(/\d+/g).map(Number);
  const r = Math.round((1 - ratio) * color1Arr[0] + ratio * color2Arr[0]);
  const g = Math.round((1 - ratio) * color1Arr[1] + ratio * color2Arr[1]);
  const b = Math.round((1 - ratio) * color1Arr[2] + ratio * color2Arr[2]);
  const a = (1 - ratio) * color1Arr[3] + ratio * color2Arr[3];
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
export {
  getColorAtPercentage,
  screenComputed,
  deepClone,
  deepMerge,
  flexColumnWidth,
  unitConverter,
  bigNumberTransform,
  debounce,
  resLoadFile,
  guid,
  findGreatestIndices,
  arrTrans,
  hasAndAddLastStr
}
