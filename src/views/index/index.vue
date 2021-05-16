<template>
  <div class="index">
    <div class="new-users">
        <div class="day-users">
          <i class="icon-png day-icon"></i>
          <span class="new-label">今日新增用户：</span>
          <span class="new-nums">100</span>
        </div>
        <div class="week-users">
          <i class="icon-png week-icon"></i>
          <span class="new-label">本周新增用户：</span>
          <span class="new-nums">100</span>
        </div>
        <div class="month-users">
          <i class="icon-png month-icon"></i>
          <span class="new-label">本月新增用户：</span>
          <span class="new-nums">100</span>
        </div>
    </div>
    <div class="line1">
      <v-echart :options="option" autoresize theme="light"/>
    </div>
    
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
export default {
    name: 'index',
    components: {
      'v-echart': ECharts
    },
    data() {
      return {
        date: '',
        option : {
            xAxis: [{
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }]
        }
      }
    },
    created() {
      // this.getDate();
      setInterval(() => {
        this.date = this.$moment().format('YYYY/MM/DD HH:mm:ss');
      }, 1000)
    },
    methods: {
      getDate() {
        this.date = new Date();
      }
    }
}
</script>

<style lang='scss'>
.index {
  width: 100%;
  height: 100%;
  .new-users {
    width: 100%;
    height: 1rem;
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .day-users {
      .day-icon {
        background: url('./../../assets/images/day.png');
        background-size: 100% 100%;
      }
    }
    .week-users {
      .week-icon {
        background: url('./../../assets/images/week.png');
        background-size: 100% 100%;
      }
    }
    .month-users {
      .month-icon {
        background: url('./../../assets/images/month.png');
        background-size: 100% 100%;
      }
    }
  }
  .new-label {
    font-size: 0.18rem;
    font-weight: 600;
  }
  .new-nums {
    font-size: 0.2rem;
    color: red;
  }
  .icon-png {
    display: inline-block;
    width: 0.24rem;
    height: 0.24rem;
    vertical-align: top;
    margin-right: 0.05rem;
  }
  .line1 {
    width: 100%;
    height: 2.5rem;
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>