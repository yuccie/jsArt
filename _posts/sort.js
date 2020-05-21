let whichfn = process.argv[2];
// 控制台拿到的参数是字符串
let n;
if (n) {
  n = + process.argv[3]
}

// 辅助生成数组函数
function genArray(n = 5000) {
  return Array(n)
    .fill(0)
    .map((item) => Math.random());
}

// 默认5000项
let arr = genArray(n);

console.time("运行时间为");
switch (whichfn) {
  case "bubbleSort":
    bubbleSort(arr);
    break;
  case "bubbleSortPro":
    bubbleSortPro(arr);
    break;
  case "selectSort":
    selectSort(arr);
    break;
  case "selectSortPro":
    selectSortPro(arr);
    break;
  case "selectSort":
    selectSort(arr);
    break;
  case "insertSort":
    insertSort(arr);
    break;
  case "insertSortPro":
    insertSortPro(arr);
    break;
  case "shellSort":
    shellSort(arr);
    break;
  case "mergeSort":
    mergeSort(arr);
    break;
  case "quickSort":
    quickSort(arr);
    break;
  case "quickSortPro":
    quickSortPro(arr);
    break;
  case "countSort":
    countSort(arr);
    break;
  case "bucketSort":
    bucketSort(arr);
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
  // console.log(arr);
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
      // console.log(arr);
      return false;
    }
  }
  // console.log(arr);
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
  // console.log(arr);
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
  // console.log(arr);
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
  // console.log(arr);
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
  // console.log(arr);
}

// 希尔排序
function shellSort(arr) {
  // 外层循环逐步缩小增量 gap 的值
  for (let gap = 5; gap > 0; gap = Math.floor(gap / 2)) {
    // 中层和内层是插入排序
    // 普通插入排序从第1个元素开始，这里分组了，要看每一组的第1个元素
    // 共分成了 gap 组，第一组的第1个元素索引为 gap
    // 第一组元素索引为 0, 0+gap, 0+2*gap，...，第二组元素索引为 1, 1+gap, 2+2*gap，...
    for (let i = gap; i < arr.length; i++) {
      let current_ele = arr[i];
      // 普通插入排序时，j 每次减少1，即与前面的每个元素比较
      // 这里 j 每次减少 gap，只会与当前元素相隔 n*(gap-1) 的元素比较，也就是只会与同组的元素比较
      let ordered_index = i - gap;
      while (ordered_index >= 0 && arr[ordered_index] > current_ele) {
        arr[ordered_index + gap] = arr[ordered_index];
        ordered_index -= gap;
      }
      arr[ordered_index + gap] = current_ele;
    }
  }
  console.log(arr);
  // return arr
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
  var pivotIndex = Math.floor(arr.length / 2);
  // splice返回的是数组，因此[0]就可以取出具体的值
  var pivot = arr.splice(pivotIndex, 1)[0]; // 务必要注意，这里修改数组，数组的长度已经发生变化了
  var left = [];
  var right = [];
  // 注意这里的数组长度是动态变化的，不能一开始就用变量缓存长度
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSortPro(left).concat([pivot], quickSortPro(right));
}

// 计数排序
function countSort(arr) {
  let count_arr = [],
    result_arr = [];
  // 统计出现次数
  for (let i = 0; i < arr.length; i++) {
    count_arr[arr[i]] = count_arr[arr[i]] ? count_arr[arr[i]] + 1 : 1;
  }
  // 遍历统计数组，放入结果数组
  for (let i = 0; i < count_arr.length; i++) {
    while (count_arr[i] > 0) {
      result_arr.push(i);
      count_arr[i]--;
    }
  }
  return result_arr;
}

// 桶排序
function bucketSort(arr, num = 50) {
  let buckets = [],
    min = Math.min(...arr),
    max = Math.max(...arr);
  // 初始化 num 个桶
  for (let i = 0; i < num; i++) buckets[i] = [];
  // (最大值-最小值)/桶数，得到每个桶最小最大值的差，即区间
  // 比如 range 为10, 0号桶区间为0-10，1号桶10-20，...
  let range = (max - min + 1) / num;
  for (let i = 0; i < arr.length; i++) {
    // (元素-最小值)/区间，取整数部分，就是应该放入的桶的索引
    let bucket_index = Math.floor((arr[i] - min) / range),
      bucket = buckets[bucket_index];
    // 空桶直接放入
    if (bucket.length) {
      bucket.push(arr[i]);
    }
    // 非空，插入排序
    else {
      let i = bucket.length - 1;
      while (i >= 0 && bucket[i] > arr[i]) {
        bucket[i + 1] = bucket[i];
        i--;
      }
      bucket[i + 1] = arr[i];
    }
  }
  // 合并所有桶
  let result = [];
  buckets.forEach((bucket) => {
    result = result.concat(bucket);
  });
  return result;
}

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
