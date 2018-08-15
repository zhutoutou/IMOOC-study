<template>
    <div>
        <TopSwiper :tops='tops'></TopSwiper>
        <Card v-for="(book,index) in books" 
            :key='index'
            :book='book'>   
        </Card>
        <p class="text-footer" v-if="!more">没有更多数据</p>
    </div>
</template>
<script>
// 25条数据
// 每次加载10条
// 0页 0-10
// 1页 10-20
// 2页 20-30(5)
// page 当前第几页

// 没有更多数据
// 1.page =0 不能显示这条提醒
// 2.page >0 数据长度<10 停止触底加载
import {get} from '@/utils'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
export default {
  data () {
    return {
      books: [],
      tops: [],
      page: 0,
      more: true
    }
  },
  components: {
    Card,
    TopSwiper
  },
  methods: {
    async getList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      try {
        let books = await get('/weapp/bookList', {page: this.page})

        if (books.list.length < 10 && this.page > 0) {
          this.more = false
        }
        if (init) {
          this.books = books.list
        } else {
          // 下拉刷新，不能直接覆盖books,而是累加
          this.books = this.books.concat(books.list)
        }
        console.log(books)
      } catch (err) {
        console.log(err)
      } finally {
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      }
    },
    async getTop () {
      const tops = await get('/weapp/top')
      this.tops = tops.list
    }
  },
  //   启动
  mounted () {
    this.getList(true)
    this.getTop()
  },
  //   上拉
  onPullDownRefresh () {
    this.getList(true)
    this.getTop()
  },
  //   下拉
  onReachBottom () {
    if (!this.more) {
      return false
    }
    this.page += 1
    this.getList()
  }
}
</script>

<style>

</style>
