<script>
// import {get} from './utils'

export default {
  async created () {
    console.log('小程序进入')
  }
}
</script>
<style>
  .btn{
    color:white;
    background-color: #EA5A49;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 2px;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    width:100%;
  }
  .btn:active{
    color:#EA5A49;
    background-color: white;
  }
  .text-primary{
    color:#EA5A49;
  }
  .text-footer{
    text-align: center;
    font-size:12px;
    margin-bottom: 5px;
  }
  .right{
    float: right;
  }
  .page-title{
    padding-left: 20px;
    background-color: #eee;
    font-size: 14px;
    line-height: 40px;
  }
</style>

