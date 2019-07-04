<template>
  <div class="main-progress">
    <div class="y-axis"></div>
    <div class="rouler">
      <template v-for="(item, index) in dateList">
        <div
          :class="[
            'column',
            'column-' + item.startTime,
          ]"
          :style="style(item, index)"
          :key="index"
        ></div>
      </template>

      <div class="y-axis">
        <template v-for="item in 5">
          <p :key="item" class="y-axis-tick">
            <span class="y-axis-label">数据智能-智能分析平台</span>
          </p>
        </template>
      </div>

      <div class="x-axis">
        <template v-for="item in finDateArr">
          <span :key="item" class="x-axis-tick">
            <span class="x-axis-label">{{item}}</span>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectProgress",
  props: {
    dateRange: {
      type: Object,
      default: () => ({})
    },
    dateList: {
      type: Array,
      default: () => []
    },
    monthList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: "line",
      validator: val => ["line", "circle", "dashboard"].indexOf(val) > -1
    },
    status: {
      type: String,
      validator: val => ["success", "exception", "warning"].indexOf(val) > -1
    },
    color: {
      type: [String, Array, Function],
      default: ""
    },
    format: Function
  },
  data() {
    return {
      obj: {
        xGap: "100px",
        yGap: "50px"
      },
      finDateArr: []
    };
  },
  watch: {
    dateRange(newVal) {
      this.formatXAxis(2);
    }
  },
  methods: {
    style(item, index) {
      let dateList = this.dateList,
        dateRange = this.dateRange;
      let startMonthDays = this.getMonthDays(dateRange.minDate);
      let beginGap =
        startMonthDays - Number(String(dateRange.minDate).slice(-2));

      let itemMonthDays = this.getMonthDays(item.startTime);
      let itemGap = itemMonthDays - Number(String(item.startTime).slice(-2));
      return {
        left: `${((itemGap + beginGap) / 6) *
          Number(this.obj.xGap.replace("px", ""))}px`,
        bottom: `${(index + 1) * Number(this.obj.yGap.replace("px", ""))}px`,
        width: `${3 * (index + 1) * Number(this.obj.yGap.replace("px", ""))}px`
      };
    },
    // 遍历设置变量
    setVariable(obj) {
      let tempArr = Object.keys(obj);
      if (!tempArr.length) return;
      tempArr.forEach(key => {
        document.documentElement.style.setProperty(`--${key}`, obj[key]);
      });
    },

    // 格式化日期
    formatDate(date, fmt) {
      date = date == undefined ? new Date() : date;
      date = date instanceof Date ? date : new Date(date);
      fmt = fmt || "yyyy-MM-dd HH:mm:ss";
      var obj = {
        y: date.getFullYear(), // 年份，注意必须用getFullYear
        M: date.getMonth() + 1, // 月份，注意是从0-11
        d: date.getDate(), // 日期
        q: Math.floor((date.getMonth() + 3) / 3), // 季度
        w: date.getDay(), // 星期，注意是0-6
        H: date.getHours(), // 24小时制
        h: date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
        m: date.getMinutes(), // 分钟
        s: date.getSeconds(), // 秒
        S: date.getMilliseconds() // 毫秒
      };
      var week = ["天", "一", "二", "三", "四", "五", "六"];
      for (var i in obj) {
        fmt = fmt.replace(new RegExp(i + "+", "g"), function(m) {
          var val = obj[i] + "";
          if (i == "w") return (m.length > 2 ? "星期" : "周") + week[val];
          for (var j = 0, len = val.length; j < m.length - len; j++)
            val = "0" + val;
          return m.length == 1 ? val : val.substring(val.length - m.length);
        });
      }
      return fmt;
    },

    // 横轴时间撮及日期格式列表
    formatXAxis(base = 2) {
      let dateRange = {
        minDate: "2019-04-06",
        maxDate: "2019-06-06"
      };
      var start = new Date(dateRange.minDate);
      var end = new Date(dateRange.maxDate);
      let arr = [start.getTime()]; // 起始日期
      let dateList = [];
      while (start.getTime() < end.getTime()) {
        let time = start.getTime() + base * 86400000;
        arr.push(time);
        start = new Date(time);
        // arr.push(Number(this.formatDate(start, "yyyyMMdd")));
      }
      if (end.getTime() > arr[arr.length - 1]) {
        arr.push(end.getTime());
      }

      dateList = arr.map(item => new Date(item));
      console.log("dateList", dateList);
      // this.finDateArr = dateList;
      return arr;
    },

    // 得出每个项目距离开始日期的gap
    setTime(base = 2) {
      let projectDateList1 = [
        "2019-04-06",
        "2019-04-07",
        "2019-04-08",
        "2019-04-11"
      ];
      projectDateList1 = projectDateList1.map(item => new Date(item).getTime());
      console.log("projectDateList1", projectDateList1.length);

      // 去重之后的总数组
      let allDateList = [...projectDateList1, ...this.xAlisTimeList].filter(
        (ele, index, array) => {
          return index === array.indexOf(ele);
        }
      );
      // 需要排序
      allDateList = allDateList.sort();

      console.log("this.xAlisTimeList", this.xAlisTimeList.length);
      console.log("allDateList", allDateList, allDateList.length);

      let finnalArr = projectDateList1.map(item => {
        // debugger;
        let tempList = this.xAlisTimeList;
        if (tempList.includes(item)) {
          console.log("总数组包含的索引：", allDateList.indexOf(item));
          console.log("包含的话直接乘以base就好");
        } else {
          console.log("总数组不包含的索引：", allDateList.indexOf(item));
          console.log(
            "如果不包含，则需要计算",
            (item - tempList[0]) / (86400000 * base)
          );
        }
      });

      console.log(
        "projectDateList1",
        projectDateList1.map(item => new Date(item))
      );
      console.log("allDateList11", allDateList.map(item => new Date(item)));
    },

    // 根据起止日期，base得出相应的时间列表
    formatXAxis(base = 2) {
      let arr = [],
        dateRange = this.dateRange;
      var start = new Date(dateRange.minDate);
      var end = new Date(dateRange.maxDate);
      while (start.getTime() < end.getTime()) {
        let time = start.getTime() + base * 86400000;
        start = new Date(time);
        arr.push(Number(this.formatDate(start, "yyyyMMdd")));
      }
      this.finDateArr = arr;
      console.log("this.finDateArr", this.finDateArr);
      console.log("this.dateList", this.dateList);
    },
    //  获取一个月的天数
    getMonthDays(params) {
      params = String(params);
      let date = new Date(params.slice(0, 4), params.slice(4, 6), 0);
      return date.getDate();
    },
    // 绘制
    drawProject() {
      let dateList = this.dateList,
        dateRange = this.dateRange;
      let startMonthDays = this.getMonthDays(dateRange.minDate);
      let beginGap =
        startMonthDays - Number(String(dateRange.minDate).slice(-2));

      dateList.forEach(item => {
        let itemMonthDays = this.getMonthDays(item.startDate);
        let itemGap = itemMonthDays - Number(String(item.startDate).slice(-2));

        dom.style = {
          left: `${(itemGap + beginGap) * 20}px`,
          // bottom: `${(item.startDate - dateRange.minDate) * 40}px`,
          bottom: "100px"
        };
        console.log(dom);
      });
    },

    // 设置横轴刻度，低效先搁置
    setXAxis(base = 2) {
      let tempDateArr = [],
        dateRange = this.dateRange,
        finDateArr = [],
        dateRangeList = this.monthList;

      for (let item of dateRangeList) {
        // debugger;
        if (~item.indexOf(dateRange.minDate.slice(0, 6))) {
          // 起始日期
          tempDateArr[0] = {
            index: 0,
            splitNum: Math.floor(
              (Number(item) - Number(dateRange.minDate)) / base
            ),
            remainder: (Number(item) - Number(dateRange.minDate)) % base,
            startDate: Number(dateRange.minDate),
            endDate: Number(item)
          };
        } else if (~item.indexOf(dateRange.maxDate.slice(0, 6))) {
          // 终止日期
          tempDateArr[tempDateArr.length] = {
            index: tempDateArr.length - 1,
            splitNum: Math.floor(Number(dateRange.maxDate.slice(-2)) / base),
            remainder: Number(dateRange.maxDate.slice(-2)) % base,
            startDate: Number(dateRange.maxDate.slice(0, 6) + "01"),
            endDate: Number(dateRange.maxDate)
          };
        } else {
          // 中间月份
          tempDateArr.push({
            splitNum: Math.floor(Number(item.slice(-2)) / base),
            remainder: Number(item.slice(-2)) % base,
            startDate: Number(item.slice(0, 6) + "01"),
            endDate: Number(item)
          });
        }
      }
      // 每个月多少天
      console.log("tempDateArr", tempDateArr);

      for (let date of tempDateArr) {
        if (date.index === tempDateArr[0].index) {
          // debugger
          finDateArr.push(date.startDate);
          while (date.splitNum) {
            finDateArr.push(date.startDate + date.splitNum * base);
            date.splitNum--;
          }
        } else if (date.index === tempDateArr[tempDateArr.length - 1].index) {
          finDateArr.push(date.startDate);
          while (date.splitNum) {
            finDateArr.push(date.startDate + date.splitNum * base);
            date.splitNum--;
          }
        } else {
          finDateArr.push(date.startDate);
          while (date.splitNum) {
            finDateArr.push(date.startDate + date.splitNum * base);
            date.splitNum--;
          }
        }
      }
      // 再排序
      console.log("finDateArr", finDateArr.sort());
      this.finDateArr = finDateArr.sort();
    }
  },

  created() {
    this.setVariable(this.obj);
  }
};
</script>

<style lang="less" scoped>
.main-progress {
  .rouler {
    height: 300px;
    position: relative;
    // 只x方向可以消除一部分iview的颜色
    overflow-x: scroll;

    .y-axis {
      position: absolute;
      bottom: 25px;
      height: 300px;
      border-left: 1px solid #ccc;
      left: calc(var(--xGap) * 1);
      .y-axis-tick {
        margin-bottom: var(--yGap);
        width: 15px;
        border-bottom: 1px solid #ccc;
        position: relative;
        .y-axis-label {
          position: absolute;
          left: -155px;
          top: -10px;
          width: 150px;
          text-align: left;
          white-space: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;
        }
        &:first-child {
          margin-top: 50px;
        }
      }
    }

    .x-axis {
      white-space: nowrap;
      position: absolute;
      border-bottom: 1px solid #ccc;
      bottom: 25px;
      left: calc(var(--xGap) * 1);
      .x-axis-tick {
        display: inline-block;
        height: 10px;
        margin-right: var(--xGap);
        border-left: 1px solid #ccc;
        position: relative;
        bottom: -6px;
        &:first-child {
          margin-left: calc(var(--xGap) * 1);
        }
        // &:nth-child(7n + 7) {
        //   height: 15px;
        //   .x-axis-label {
        //     position: absolute;
        //     top: 19px;
        //     left: -5px;
        //   }
        // }
        .x-axis-label {
          position: absolute;
          top: 14px;
          left: -5px;
        }
      }
    }

    .column {
      position: absolute;
      // bottom: calc(var(--yGap) * 5);
      // left: calc(var(--xGap) * 4);
      // width: calc(var(--xGap) * 4);
      height: 15px;
      background: pink;
    }
  }
}
</style>
