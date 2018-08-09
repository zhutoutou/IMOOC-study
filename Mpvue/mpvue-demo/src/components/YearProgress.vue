<template>
    <div class="progressbar">
         <progress percent="20" activeColor='#EA5A49'></progress>
         <p>{{year}}已经过去了{{days}}天,20%</p>
    </div>   
</template>
<script>
export default {
  methods: {
    isLeapYear () {

    },
    getDayOfYead () {

    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      start.setDate(1)
      start.setMonth(0)
      // start 一年第一天
      // 今天的时间戳减去今年第一天的时间戳
      let offset = new Date().getTime() - start().getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    }
  }
}
</script>
<style lang="scss">
.progressbar{
    width: 100%;
    progress{
        margin-bottom: 10px;
    }
}
</style>
