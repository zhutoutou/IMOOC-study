<template>
    <div class='bookinfo'>
        <div class="thumb">
            <img :src="info.image" alt="" mode="aspectFill" class="back">
            <img :src="info.image" alt="" mode="aspectFit" class="img">
            <div class="info">
                <div class="title">{{info.title}}</div>
                <div class="author">{{info.author}}</div>
            </div>
        </div>
        <div class="detail">
            <img :src="userinfo.image" alt="" class="avatar">
            {{userinfo.nickName}}
            <div class="right text-primary">
                {{info.rate}}分
                <Rate :rate='info.rate'></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags" v-if="showTags">
            <div class="badge" 
                :key="tagIndex"
                v-for="(tag,tagIndex) in info.tags">{{tag}}</div>
        </div>
        <div class="summary">
            <p 
                :key="sumIndex"
                v-for="(sum,sumIndex) in info.summary">{{sum}}</p>
        </div>
    </div>
</template>
<script>
import Rate from '@/components/Rate'
export default {
  components: {
    Rate
  },
  props: ['info'],
  computed: {
    userinfo () {
      return this.info.user_info || {}
    },
    showTags () {
      return this.info.tags && (this.info.tags.length > 0)
    }
  }
}
</script>
<style lang="scss" scoped>
.bookinfo{
    font-size: 14px;
    .thumb{
        width:750rpx;
        height:500rpx;
        overflow: hidden;
        position: relative;
        .back{
            width:100%;
            filter:blur(15px)  
        }
        .img{
            position: absolute;
            width: 100%;
            height: 300rpx;
            left: 0;
            top: 30rpx;
        }
        .info{
            color: white;
            position: absolute;
            width: 100%;
            top: 330rpx;
            left: 0;
            text-align: center;
            .title{
                font-size: 20px;
            }
            .author{
                font-size: 14px;
            }
        }
    }
    .right{
        float: right;
    }
    .detail{
        padding: 5px 10px;
        .avatar{
            vertical-align: middle;
            width: 20px;
            height: 20px;
            border-radius: 50%;
        }
    }
    .badge{
        display: inline-block;
        margin:5px;
        padding:5px;
        border-radius: 10px;
        border:1px #EA5A49 solid;
        color:#EA5A49;
    }
    .summary{
        padding: 0 15px;
        margin-top: 10px;
        font-size: 14px;
        p{
            text-indent: 2em;
        }
    }
}
</style>
