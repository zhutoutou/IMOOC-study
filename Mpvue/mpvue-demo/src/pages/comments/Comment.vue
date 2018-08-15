<template>
    <div class="container">
        <CommentList type='user' :comments='comments' v-if="userinfo.openId"></CommentList>
        <div v-if="userinfo.openId">
          <div class="page-title">我的图书</div>
          <Card v-for="(book,index) in books"
                :book="book"
                :key="index"></Card>
          <div v-if="!books.length">暂时还没有添加过书，快去添加基本吧</div>
        </div>
    </div>
</template>
<script>
import {get} from '@/utils'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'
export default {
  data () {
    return {
      books: [],
      comments: [],
      userinfo: {}
    }
  },
  components: {
    CommentList,
    Card
  },
  methods: {
    async init () {
      await wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getComments () {
      try {
        const comments = await get('/weapp/commentList', {openid: this.userinfo.openId})
        this.comments = comments.list
      } catch (err) {
        console.log(err)
      }
    },
    async getBooks () {
      try {
        const books = await get('/weapp/bookList', {openid: this.userinfo.openId})
        this.books = books.list
        console.log(this.books)
      } catch (err) {
        console.log(err)
      }
    }
  },
  onShow () {
    if (!this.userinfo.openId) {
      this.userinfo = (wx.getStorageSync('userinfo') && wx.getStorageSync('userinfo').userinfo) || {}
      if (this.userinfo.openId) this.init()
    }
  },
  async onPullDownRefresh () {
    await this.init()
    wx.stopPullDownRefresh()
  }
}
</script>
<style>

</style>
