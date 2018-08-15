<template>
  <div class='rate'>
    <span>☆☆☆☆☆</span>
    <div class="hollow" :style="style">★★★★★</div>
  </div>
</template>
<script>
// vue-tiny-rate
export default {
  props: {
    rate: {type: [Number, String], default: '0'}
  },
  computed: {
    style () {
      return `width:${this.rate / 2}em`
    }
  }
}
</script>
<style lang='scss' scoped>
.rate{
  position: relative;
  display: inline-block;
  .hollow{
    position: absolute;
    display: inline-block;
    top:0;
    left:0;
    width:0;
    overflow:hidden;
  }
}
</style>


