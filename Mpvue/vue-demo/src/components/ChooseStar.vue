<template>
    <div class="choosestar-container">
        <div class="search-container">
            <input type="text" class="search-content" placeholder="请输入要查找的明星" v-model="searchKey" @keyup.enter="searchConfirm">
            <button class="search-confirm" @click="searchConfirm">搜索</button>
        </div>
        <div class="search-result">
            <div class="search-result-item"
                v-for="(star,i) in searchStars"
                :key="i"
                @click="chooseConfirm(star)">
            <Star class="item-info" :starinfo="star"></Star>
            <div class="item-confirm">></div>
            </div>
        </div>
        <Loading v-model="showLoading" :text="加载中"></Loading>
    </div>
</template>
<script>
import Star from '@/components/Star'
import wxmp from '@/api/wxmp'
import {Loading} from 'vux'
export default {
  data () {
    return {
      stars: [],
      searchKey: '',
      searchStars: [],
      showLoading: false
    }
  },
  components: {
    Star,
    Loading
  },
  mounted () {
    const stars = (this.$route.params && this.$route.params.stars) || []
    this.stars = stars
    this.searchStars = stars
  },
  methods: {
    async searchConfirm () {
      this.searchStars = []
      this.showLoading = true
      if (this.searchKey.replace(/^\s+|\s+$/gm, '') === '') this.searchStars = this.stars
      else {
        const findstarRes = await wxmp.findstar({name: this.searchKey.replace(/^\s+|\s+$/gm, '')})
        if (findstarRes.code === -1) throw new Error(`findstar请求异常,Err:${findstarRes.data.msg}`)
        const {stars} = findstarRes.data
        this.searchStars = stars
      }
      this.showLoading = false
    },
    chooseConfirm (starinfo) {
      this.$router.push({name: 'Support', params: {starinfo}})
    }
  }
}
</script>
<style lang="scss" scoped>
.choosestar-container{
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    height: 100%;
    .search-container{
        display: flex;
        flex-direction: row;
        height: 40px;
        width: 100%;
        .search-content{
            height: 38px;
            font-size: 16px;
            width: 100%;
            border:1px solid rgb(195,195,195);
            padding: 0;
            border-radius: 10px 0 0 10px;
            padding-left: 15px;
        }
        .search-confirm{
            height: 40px;
            width: 70px;
            background-color: rgb(92, 109, 228);
            color: white;
            border-radius: 0 10px 10px 0;
            border:none;
        }
        .search-confirm:active{
            background-color: white;
            color: rgb(92, 109, 228);
            border-radius: 0 10px 10px 0;
            border:none;
        }
    }
    .search-result{
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        .search-result-item{
            height: 60px;
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1px solid rgb(195,195,195);
            .item-confirm{
                margin-left: auto;
                margin-right: 0px;
                color: rgb(195,195,195);
                font-size:16px;
            }
        }
        .search-result-item:last-child{
                border:none
        }
    }
}
</style>
