<template>
    <div class="star-container">
        <img :src="starinfo.userimg" class="star-headimg">
        <div class="star-info">
            <div class="star-name">{{starinfo.name}}</div>
            <div class="star-detail animated" :class="{fadeInUp:detailChanged}">排名：No.{{starinfo.sort}} | 人气值：{{starinfo.hot}}</div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    starinfo: {type: [Object], default: () => []}
  },
  data () {
    return {
      detailChanged: false
    }
  },
  watch: {
    starinfo: function (newStarInfo, oldStarInfo) {
      this.detailChanged = false
      setTimeout(() => {
        this.detailChanged = true
      }, 0)
    }
  }
}
</script>
<style lang="scss" scoped>
.star-container{
    overflow: hidden;
    display: flex;
    flex-direction: row;
    height: 40px;
    align-items: center;
    .star-headimg{
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
    .star-info{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        .star-name{
            font-size: 16px;
        }
        .star-detail{
            margin-top: 2px;
            font-size: 10px;
            color: rgb(195,195,195);
        }
    }
}
</style>
