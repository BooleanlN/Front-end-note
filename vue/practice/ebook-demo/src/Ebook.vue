<template>
  <div class="ebook">
    <title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"
    ></title-bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"  :defaultFontSize="defaultFontSize" ref="menuBar" :fontSizeList="fontSizeList"
    @setFontSize="setFontSize"
    :themeList="themeList"
    :defaultTheme="defaultTheme"
    :bookAvailable = "bookAvailable"
    @setTheme="setTheme"
    @onProgressChange="onProgressChange"
    :navigation="navigation"
    @jump="jump"
    ></menu-bar>
  </div>
</template>
<script>
import TitleBar from '@/components/TitleBar'
import MenuBar from '@/components/MenuBar'
import Epub from 'epubjs'
const DOWNLOAD_URL = './static/2018_Book_AgileProcessesInSoftwareEngine.epub'
global.ePub = Epub
/* eslint-disable */
export default {
  components:{
    TitleBar,
    MenuBar
  },
  data(){
    return{
      ifTitleAndMenuShow:false,
      fontSizeList:[
        {fontSize:12},
        {fontSize:14},
        {fontSize:16},
        {fontSize:18},
        {fontSize:20},
        {fontSize:22},
        {fontSize:24},
      ],
      defaultFontSize:16,
      themeList:[
        {
          name:'default',
          style:{
            body:{
              'color':'#000','background' : '#fff'
            }
          }
        },
        {
          name:'eye',
          style:{
            body:{
              'color':'#000','background': '#ceeaba'
            }
          }
        },
        {
          name:'night',
          style:{
            body:{
              'color':'#fff','background' : '#000'
            }
          }
        },
        {
          name:'gold',
          style:{
            body:{
              'color':'#000','background' : 'rgba(241,236,226)'
            }
          }
        }
      ],
      defaultTheme:0,
      //图书是否处于可用状态
      bookAvailable:false,
      navigation:{}
    }
  },
  mounted () {
    // 生成电子书
    this.showEpub()
  },
  methods: {
    //根据链接跳转位置
    jump(href){
      this.rendition.display(href)
      this.hideTitleAndMenu()
    },
    //进度变化，progress 进度条的数据 1-100
    onProgressChange(progress){
      const percentage = progress / 100
      //当前页数
      const location = percentage > 0 ?this.locations.cfiFromPercentage(percentage):0
      console.log(location)
      this.rendition.display(location)
    },
    setTheme(index){
       this.themes.select(this.themeList[index].name)
       this.defaultTheme = index

    },
    registeThemes(){
      this.themeList.forEach(theme => {
        this.themes.register(theme.name,theme.style)
      })
    },
    setFontSize(fontSize){
       this.defaultFontSize =  fontSize;
       if(this.themes){
        this.themes.fontSize(fontSize + 'px')
       }
    },
    // 电子书解析和渲染
    showEpub () {
      // 生成电子书
      this.book = new Epub(DOWNLOAD_URL)
      console.log(this.book)
      // 生成rendition对象,通过Book.renderTo
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        heigth: window.innerHeight
      })
      // 通过rendition.display渲染
      this.rendition.display()
      //获取Theme对象
      this.themes =  this.rendition.themes
      //设置默认ziti
      this.setFontSize(this.defaultFontSize)
      //this.themes.register(name,styles)
      //this.themes.select(name),选择主题
      this.registeThemes()
      //this.themes.select('eye');
      //获得location
      //通过epub.js的钩子函数来实现
      this.book.ready.then(()=>{
        this.navigation = this.book.navigation
        console.log(this.navigation)
        return this.book.locations.generate()
      }).then(result => {
        this.locations = this.book.locations
        this.bookAvailable = true
        //this.onProgressChange(50)
        //console.log(result)
      })
    },
    prevPage() {
      //Redition.prev
      this.rendition&&this.rendition.prev()
    },
    nextPage(){
      //Redition.next
      this.rendition&&this.rendition.next()
    },
    toggleTitleAndMenu(){
      this.ifTitleAndMenuShow =  !this.ifTitleAndMenuShow
      if(!this.ifTitleAndMenuShow){
        this.$refs.menuBar.hideSetting()
      }
    },
    hideTitleAndMenu(){
      this.ifTitleAndMenuShow = false
      //隐藏菜单
      this.$refs.menuBar.hideSetting()
      //蕴藏目录
      this.$refs.menuBar.hideContent()
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "./assets/styles/global";
  .ebook {
    position: relative;
    .read-wrapper {
      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        display: flex;
        .left {
          flex: 0 0 px2rem(100);
        }
        .center {
          flex: 1;
        }
        .right {
          flex: 0 0 px2rem(100);
        }
      }
    }
  }
</style>
