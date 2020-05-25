let whichfn = process.argv[2];
// 控制台拿到的参数是字符串
let n;
if (process.argv[3]) {
  n = +process.argv[3];
}

// 辅助生成数组函数
function genArray(n = 5000) {
  return Array(n)
    .fill(0)
    .map((item) => Math.floor(Math.random() * 100));
}

// 默认5000项
let arr = genArray(n);
let res = [];
console.time("运行时间为");
switch (whichfn) {
  case "bubbleSort":
    res = bubbleSort(arr);
    // console.log(res);
    break;
  case "bubbleSortPro":
    res = bubbleSortPro(arr);
    // console.log(res);
    break;
  case "selectSort":
    res = selectSort(arr);
    // console.log(res);
    break;
  case "selectSortPro":
    res = selectSortPro(arr);
    // console.log(res);
    break;
  case "selectSort":
    res = selectSort(arr);
    // console.log(res);
    break;
  case "insertSort":
    res = insertSort(arr);
    // console.log(res);
    break;
  case "insertSortPro":
    res = insertSortPro(arr);
    // console.log(res);
    break;
  case "shellSort":
    res = shellSort(arr);
    // console.log(res);
    break;
  case "mergeSort":
    res = mergeSort(arr);
    // console.log(res);
    break;
  case "quickSort":
    res = quickSort(arr);
    // console.log(res);
    break;
  case "quickSortPro":
    res = quickSortPro(arr);
    // console.log(res);
    break;
  case "countSort":
    res = countSort(arr);
    // console.log(res);
    break;
  case "bucketSort":
    res = bucketSort(arr);
    // console.log(res);
    break;
  case "bucketSortPro":
    res = bucketSortPro(arr);
    // console.log(res);
    break;
  case "heapSort":
    res = heapSort(arr);
    // console.log(res);
    break;
  // case "lsdSort":
  //   lsdSort(arr);
  //   break;
  // case "msdSort":
  //   msdSort(arr);
  //   break;
  default:
    console.log("未定义函数");
}
console.timeEnd("运行时间为");

// 冒泡排序
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }
  return arr;
}

// 冒泡排序
// 优化一：添加falg，若已经有序，则无需再排序
// 优化二：内层循环每次少一次，因为最后项已经排序好
function bubbleSortPro(arr) {
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    let flag = true;

    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false;
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
    if (flag) {
      return arr;
    }
  }
  return arr;
}

// 选择排序
function selectSort(arr) {
  let len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    // 存放最小值索引
    let minIdx = i;

    // 每次从最小索引后一项开始比较
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // 内层循环结束，minIdx会得到新的最小索引值
    // 如果minIdx没变，则无影响，如果变了，则更换最小值位置
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

function selectSortPro(arr) {
  let len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    // 假设arr[i]是最小值，再拷贝一份给min
    let min = arr[i];

    // 循环一次，可以从 i+1 开始找到新的最小值。
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < min) {
        // 这里会频繁操作数组，反而效率更低
        [arr[j], min] = [min, arr[j]];
      }
    }

    // 将新的最小值赋值给 假设的最小值，即 arr[i]
    arr[i] = min;
  }
  return arr;
}

// 插入排序
function insertSort(arr) {
  let len = arr.length;
  if (len <= 1) return arr;

  // i=1，我们认为第一项(i=0)已排好序了
  for (let i = 1; i < len; i++) {
    let temp = arr[i];

    // 定义在这里，因为for循环外要用
    let j = i - 1;
    // 已排序数组的最大索引就是i-1，其实就是倒着比，
    // 如果新来的元素比已排序数组最后一个小，则将已排序数组最大值后移一位
    // 如果新来的元素比已排序数组最后一个大，则直接放在最后即可
    for (; j >= 0; j--) {
      if (arr[j] > temp) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }

    // 等到内层循环完，也就移动完了，也就空出一个位置，或者直接放在最后
    // 最后执行完j--，所以这里是j+1
    arr[j + 1] = temp;
  }
  return arr;
}

// 插入排序，可以想象打扑克牌，来一张新牌，我们会在已排好的牌里找到位置，
// 先移动后面几张牌腾出个空，然后将新牌放在空里。

// 插入排序优化
function insertSortPro(arr) {
  for (let i = 1; i < arr.length; i++) {
    // 待插入的新值
    let temp = arr[i];

    // 已排序部分的第1个和最后1个
    let left = 0;
    let right = i - 1;
    // 先找位置
    while (left <= right) {
      // 不再是从最后一个位置开始向前每个都比较，而是比较中间的元素
      let middle = parseInt((left + right) / 2);
      if (temp < arr[middle]) {
        // 如果新值比中间值还小，只需将右侧索引变为中间索引 -
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    // while结束，已经找到了一个大于或等于当前元素的位置 left
    // 再修改数组：把 left 到 i 之间的元素向后移动一个位置
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }

    // 插入新元素
    arr[left] = temp;
  }
  return arr;
}

// 希尔排序
// function shellSort(arr) {
//   // 外层循环逐步缩小增量 gap 的值
//   for (let gap = 5; gap > 0; gap = Math.floor(gap / 2)) {
//     // 中层和内层是插入排序
//     // 普通插入排序从第1个元素开始，这里分组了，要看每一组的第1个元素
//     // 共分成了 gap 组，第一组的第1个元素索引为 gap
//     // 第一组元素索引为 0, 0+gap, 0+2*gap，...，第二组元素索引为 1, 1+gap, 2+2*gap，...
//     for (let i = gap; i < arr.length; i++) {
//       let current_ele = arr[i];
//       // 普通插入排序时，j 每次减少1，即与前面的每个元素比较
//       // 这里 j 每次减少 gap，只会与当前元素相隔 n*(gap-1) 的元素比较，也就是只会与同组的元素比较
//       let ordered_index = i - gap;
//       while (ordered_index >= 0 && arr[ordered_index] > current_ele) {
//         arr[ordered_index + gap] = arr[ordered_index];
//         ordered_index -= gap;
//       }
//       arr[ordered_index + gap] = current_ele;
//     }
//   }
//   console.log(arr);
//   // return arr
// }
// function shellSort(arr) {
//   // 1. 定义gap，也就是分的组数，例如gap为5，数组length为10，则分五组。
//   // 10个人分5组，也就是[arr[0], arr[5]]、[arr[1], arr[6]]...分别为一组
//   // 分成几组，其实就是间隔几个
//   for (let gap = 5; gap > 0; gap = Math.floor(gap/2)) {

//     // 可以想象成，现在遍历的是分组后的数组，虽然数组位置没变，但是要想象成已经分组了。
//     for (let i = gap; i < arr.length; i++) {
//       // i = gap，其实就是遍历分好组的数组的第一组。
//       let curItem = arr[i];
//       let prevIdx = i - gap; // 每一组最开始的位置

//       // 比较同一个组内的元素，如果前面的比当前的还大，就将其向后移动
//       while(prevIdx >= 0 && arr[prevIdx] > curItem) {
//         arr[prevIdx + gap] = arr[prevIdx];
//         prevIdx -= gap;
//       }
//       // 移动元素后，将新元素插入
//       arr[prevIdx + gap] = curItem;
//     }
//   }
//   return arr;
// }

function shellSort(arr) {
  for (let gap = 2; gap > 0; gap = Math.floor(gap / 2)) {
    // 分几组，其实就是间隔几个元素
    for (let i = gap; i < arr.length; i++) {
      let temp = arr[i]; // 这里的temp就是待排序的元素，这里缓存下，以备后面比较时用
      let prevIdx = i - gap; // 同一组内，前一个元素的索引

      while (prevIdx >= 0 && arr[prevIdx] > temp) {
        arr[prevIdx + gap] = arr[prevIdx];
        // 从分好组的最右侧开始匹配，每次的元素索引，其实就是prevIdx - gap
        prevIdx -= gap;
      }
      arr[prevIdx + gap] = temp;
    }
  }
  return arr;
}

// 归并排序
function mergeSort(arr) {
  function merge(left, right) {
    let result = [];

    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        // 把最小的依次放在result里面
        // 每次操作，数组都会变化
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    //经过上面一次循环，只能左子列或右子列一个不为空，或者都为空
    while (left.length) {
      // 不能使用concat，因为会死循环
      result.push(left.shift());
    }
    while (right.length) {
      result.push(right.shift());
    }
    return result;
  }

  let len = arr.length;
  if (len <= 1) return arr;

  let middle = Math.floor(len / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

// 快速排序
function quickSort(arr) {
  if (!arr || arr.length < 2) return arr;
  const pivot = arr.pop();
  let left = arr.filter((item) => item < pivot);
  let right = arr.filter((item) => item >= pivot);
  return quickSort(left).concat([pivot], quickSort(right));
}

// 快速排序优化版
// 优化一：原生api效率更高
function quickSortPro(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  // splice返回的是数组，因此[0]就可以取出具体的值
  let pivot = arr.splice(pivotIndex, 1)[0]; // 务必要注意，这里修改数组，数组的长度已经发生变化了
  let left = [];
  let right = [];
  // 注意这里的数组长度是动态变化的，不能一开始就用变量缓存长度
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSortPro(left).concat([pivot], quickSortPro(right));
}

// function quickSort(arr) {
//   if (arr.length <= 1) return arr;

//   // 取第1个元素为基准值
//   let pivot = arr[0];
//   // 分割为左小右大两个数组，以及包含元素本身的中间数组
//   let left = [];
//   let middle = [pivot];
//   let right = [];

//   for (let index = 1; index < arr.length; index++) {
//     // 如果有与本身一样大的元素，放入 middle 数组，解决重复元素的问题
//     if (arr[index] === pivot) {
//       middle.push(arr[index]);
//     } else if (arr[index] < pivot) {
//       left.push(arr[index]);
//     } else {
//       right.push(arr[index]);
//     }
//   }
//   // 递归并连接
//   return quickSort(left).concat(middle, quickSort(right));
// }

// 计数排序
// 有使用限制：针对有限非负整数集
function countSort(arr) {
  let res = [];
  let countArr = [];
  // 数组内对应元素出现的次数
  for (let i = 0; i < arr.length; i++) {
    let key = arr[i];
    // 注意这里是前++
    countArr[key] = countArr[key] ? ++countArr[key] : 1;
  }

  // 遍历计数数组，将元素放在结果数组中
  for (let i = 0; i < countArr.length; i++) {
    while (countArr[i] > 0) {
      res.push(i);
      countArr[i]--;
    }
  }
  return res;
}

// 桶排序
function bucketSortPro(arr, num = 3) {
  let buckets = [];
  let min = Math.min(...arr);
  let max = Math.max(...arr);

  // 初始化 num 个桶
  for (let i = 0; i < num; i++) buckets[i] = [];

  // (最大值-最小值)/桶数，得到每个桶最小最大值的差，即区间
  // 比如 range 为10, 0号桶区间为0-10，1号桶10-20，...
  let range = (max - min + 1) / num;

  for (let i = 0; i < arr.length; i++) {
    // (元素-最小值)/区间，取整数部分，就是应该放入的桶的索引
    let idx = Math.floor((arr[i] - min) / range);
    let bucket = buckets[idx];

    // 空桶直接放入
    if (!bucket.length) {
      bucket.push(arr[i]);
    } else {
      // 非空，插入排序
      let j = bucket.length - 1;
      while (j >= 0 && bucket[j] > arr[i]) {
        bucket[j + 1] = bucket[j];
        j--;
      }
      bucket[j + 1] = arr[i];
    }
  }

  // 合并所有桶
  let result = [];
  buckets.forEach(bucket => {
    if (bucket.length) {
      result = result.concat(bucket);
    }
  });
  return result;
}
// 运行时间为: 9.174ms

function bucketSort(arr, num = 3) {
  // 计数排序，是用一个空数组把值作为下标找到其位置，再把出现的次数给存起来。但局限于非负整数
  // 桶排序，就是其升级版，可以将计数排序中每个索引当成每个桶。
  // 还可以借助成绩来记忆，100分，用10、20、30、...100等10个桶分别来装，则步长就是10
  let len = arr.length;
  if (len < 2) return arr;

  let buckets = []; // 桶
  let res = []; // 结果数组
  let min = (max = arr[0]); // 最值
  let space;
  let n = 0;

  // 如果用的桶数量太多，即每个桶里只有一个元素，则没有意义，此时修改桶数量
  let bucketNum = Math.floor(len / num);
  while (bucketNum < 2) {
    num--;
    bucketNum = Math.floor(len / num);
  }

  // 获取元素的最值，为后续计算步长准备
  for (let i = 0; i < len; i++) {
    min = min <= arr[i] ? min : arr[i];
    max = max >= arr[i] ? max : arr[i];
  }

  // 步长，1只是保险值
  space = (max - min + 1) / num;

  // 遍历数组，将每个阶段的数据分别放在对应的桶里
  for (let j = 0; j < len; j++) {
    // idx就是对应桶的编号
    let idx = Math.floor((arr[j] - min) / space);

    if (buckets[idx]) {
      // 插入排序，排序每个桶里的数据
      let k = buckets[idx].length - 1;
      while (k >= 0 && buckets[idx][k] > arr[j]) {
        buckets[idx][k + 1] = buckets[idx][k];
        // 移动元素
        k--;
      }
      buckets[idx][k + 1] = arr[j];
    } else {
      // 空桶，需要初始化
      buckets[idx] = [];
      buckets[idx].push(arr[j]);
    }
  }
  // 

  // 因为每个桶里都已经是排好序的了，此时只需要遍历合并即可
  while (n < num) {
    // 跳过没有值的桶
    if (buckets[n]) {
      res = res.concat(buckets[n]);
    }
    n++;
  }
  return res;
}
// 运行时间为: 12.074ms

// 堆排序
// 参考：https://www.jianshu.com/p/670085d43a0b
// 参考：https://segmentfault.com/a/1190000015487916
// 参考：https://blog.csdn.net/luanpeng825485697/article/details/78056421
// 参考：https://www.cnblogs.com/chengxiao/p/6129630.html
// 参考：https://segmentfault.com/a/1190000016329895

// 建最大堆
var len; //定义成全局变量
function buildHeap(arr) {
  len = arr.length;
  // 从堆的最后一个非叶子节点开始调整
  for (var i = Math.floor(arr.length / 2); i >= 0; i--) {
    adjustHeap(arr, i)  //调整堆
  }
}

function adjustHeap(arr, i) {
  var left = 2 * i + 1;   // 左节点位置
  let right = 2 * i + 2;  //右节点位置
  let largest = i;        // 最大值位置

  //如果左节点存在并且左节点大于 当前最大节点，交换位置
  if (left < len && arr[left] > arr[largest]) {
    largest = left
  }
  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }
  //如果发现修改了，则交换位置
  if (largest !== i) {
    swap(arr, i, largest);
    adjustHeap(arr, largest)
  }

}
//交换位置
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// 堆排序算法
function heapSort(arr) {
  buildHeap(arr)  //建堆
  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);  //堆顶一定是最大元素，将堆顶和尾部元素交换，最大元素就保存在尾部，并且不参与后面的调整
    len--; //  去掉这个是从大到小排序
    adjustHeap(arr, 0) ///将最大的元素进行调整，将最大的元素调整到堆顶
  }
  return arr

}
// var array = [11, 43, 24, 76, 89, 43, 65]
// heapSort(array)
// console.log(array) //打印结果 [ 11, 24, 43, 43, 65, 76, 89 ]



// 基数排序
// 参考：https://segmentfault.com/a/1190000021342923
// 参考：https://segmentfault.com/a/1190000012923917，司徒正美
function lsdSort(arr) {
  // 找出最大元素
  let max_num = Math.max(...arr),
    // 获取其位数
    max_len = getLengthOfNum(max_num);
  console.log(`最大元素是 ${max_num}，长度 ${max_len}`);
  // 外层遍历位数，内层遍历数组
  // 外层循环以最大元素的位数作为遍历次数
  for (let digit = 1; digit <= max_len; digit++) {
    // 初始化0-9 10个数组，这里暂且叫做桶
    let buckets = [];
    for (let i = 0; i < 10; i++) buckets[i] = [];
    // 遍历数组
    for (let i = 0; i < arr.length; i++) {
      // 取出一个元素
      let ele = arr[i];
      // 获取当前元素该位上的值
      let value_of_this_digit = getSpecifiedValue(ele, digit);
      // 根据该值，决定当前元素要放到哪个桶里
      buckets[value_of_this_digit].push(ele);
      console.log(buckets);
    }
    // 每次内层遍历结束，把所有桶里的元素依次取出来，覆盖原数组
    let result = [];
    buckets
      .toString()
      .split(",")
      .forEach((val) => {
        if (val) result.push(parseInt(val));
      });
    // 得到了一个排过序的新数组，继续下一轮外层循环，比较下一位
    arr = result;
    console.log(arr);
  }
}

// msd排序
function msdSort(arr) {
  // 最大元素
  let max_num = Math.max(...arr);
  // 获取其位数作为初始值，最小值为1，也就是个位
  let digit = getLengthOfNum(max_num);
  return msd(arr, digit);
}
// msd排序辅助函数
function getLengthOfNum(num) {
  return (num += "").length;
}
function getSpecifiedValue(num, position) {
  return (num += "").split("").reverse().join("")[position - 1] || 0;
}
// msd排序辅助函数
function msd(arr, digit) {
  // 建10个桶
  let buckets = [];
  for (let i = 0; i < 10; i++) buckets[i] = [];
  // 遍历数组，入桶。这里跟 LSD 一样
  for (let i = 0; i < arr.length; i++) {
    let ele = arr[i];
    let value_of_this_digit = getSpecifiedValue(ele, digit);
    buckets[value_of_this_digit].push(ele);
  }
  // 结果数组
  let result = [];
  // 遍历每个桶
  for (let i = 0; i < buckets.length; i++) {
    // 只剩一个元素，直接加入结果数组
    if (buckets[i].length === 1) result = result.concat(buckets[i]);
    // 还有多个元素，但是已经比较到个位了
    // 说明是重复元素的情况，也直接加入结果数组
    else if (buckets[i].length && digit === 1)
      result = result.concat(buckets[i]);
    // 还有多个元素，并且还没有比较结束，递归比较下一位
    else if (buckets[i].length && digit !== 1)
      result = result.concat(msd(buckets[i], digit - 1));
    // 空桶就不作处理了
  }
  return result;
}
