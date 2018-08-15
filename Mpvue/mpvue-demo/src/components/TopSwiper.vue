<template>
    <div class="swiper">
            <swiper
                indicator-dots='true'
                indicator-color='#EA5A49'
                autoplay='true'
                interval='6000'
                duration='1000'
                circular='true'
            >
            <div v-for="(imgUrl,imgIndex) in imgUrls"
                :key="imgIndex">
                <swiper-item>
                    <div 
                        <img class="slide-image"
                            v-for="(img,index) in imgUrl"
                            @click="bookDetail(img)" 
                            :key="index"
                            :src="img.image" 
                            mode="aspectFit" 
                        alt="">
                </swiper-item>
            </div>        
        </swiper>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: {
    tops: {type: [Array], default: []}
  },
  computed: {
    imgUrls () {
      return _.chunk(this.tops, 3)
    }
  },
  watch: {
    tops () {
    //   console.log('发生改变', this.tops)
    }
  },
  methods: {
    bookDetail (item) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper{
    margin-top: 5px;
    .slide-image{
        width:33%;
        height: 250rpx;
    }
}
</style>
