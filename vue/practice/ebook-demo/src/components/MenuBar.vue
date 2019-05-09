<template>
    <div class="menu-bar">
      <transition name="slide-up">
      <div class="foot-wrapper" v-show="ifTitleAndMenuShow" :class="{'hide-box-shadow':ifSettingShow}">
        <div class="icon-wrapper">
          <span class="icon-Progress-read icon" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-brightness icon" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-LC_icon_list_line_11 icon" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a icon" @click="showSetting(0)">A</span>
        </div>
      </div>
      </transition>
      <transition name="slide-up" >
        <div class="setting-wrapper" v-show="ifSettingShow">
          <div class="setting-font-size" v-if="showTag === 0">
            <div class="preview" :style="{fontSize:fontSizeList[0].fontSize + 'px'}">A</div>
            <div class="select">
            <div class="select-wrapper" v-for="(item,index) in fontSizeList" :key="index"
             @click="setFontSize(item.fontSize)">
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize===item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
            <div class="preview" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize + 'px'}">A</div>
          </div>
        </div>
          <div class="setting-theme" v-else-if="showTag=== 1">
          <div class="setting-theme-item" v-for="(item,index) in themeList" :key="index" @click="setTheme(index)">
              <div class="preview" :style="{background:item.style.body.background}" :class="{'no-border':item.style.body.background!=='#fff'}"></div>
              <div class="text" :class="{'selected':index === defaultTheme}">{{item.name}}</div>
          </div>
        </div>
          <div class="setting-progress"  v-else-if="showTag=== 2">
            <div class="progress-wrapper">
              <input type="range"
                     max="100"
                     min="0"
                     step="1"
                     @change="onProgressChange($event.target.value)"
                     @input="onProgressInput($event.target.value)"
                     :value="progress"
                     :disabled="!bookAvailable"
                     ref="progress"
                     class="progress">
            </div>
            <div class="text-wrapper">
              <span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
            </div>
          </div>

      </div>
      </transition>
      <content-view
      :ifShowContent="ifShowContent"
      v-show="ifShowContent"
      :navigation="navigation"
      :bookAvailable="bookAvailable"
      @jump="jump">

      </content-view>
      <transition name="fade">
        <div class="content-mask"
        v-show="ifShowContent"
        @click="hideContent"
        ></div>
      </transition>
    </div>
</template>

<script>
import ContentView from '@/components/Content'
export default {
  components: {
    ContentView
  },
  name: 'MenuBar',
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: {
      type: Array
    },
    defaultFontSize: {
      type: Number
    },
    themeList: {
      type: Array
    },
    defaultTheme: {
      type: Number
    },
    bookAvailable: {
      type: Boolean
    },
    navigation: {
      type: Object
    }
  },
  data () {
    return {
      ifSettingShow: false,
      showTag: 0,
      progress: 0,
      ifShowContent: false
    }
  },
  /* eslint-disable */
  methods: {
    jump(href){
      this.$emit("jump",href)
    },
    onProgressInput (progress) {
      this.progress = progress
      this.$refs.progress.style.backgroundSize = '${this.progress}% 100%'
    },
    //进度条松开时触发
    onProgressChange(progress){
      this.$emit('onProgressChange',progress)
    },
    setFontSize (fontSize) {
      this.$emit('setFontSize', fontSize)
    },
    showSetting (showTag) {
      this.showTag = showTag
      if(this.showTag === 3){
        this.ifSettingShow = false
        this.ifShowContent = true
      }else{
        this.ifSettingShow = true
      }
    },
    hideSetting () {
      this.ifSettingShow = false
    },
    setTheme (index) {
      this.$emit('setTheme', index)
    },
    hideContent(){
      this.ifShowContent = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/global';
 .menu-bar{
   .setting-wrapper{
     position: absolute;
     bottom: px2rem(48);
     left: 0;
     width: 100%;
     height: px2rem(60);
     background-color: white;
     z-index:101;
     box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
     .setting-font-size{
       display: flex;
       @include center;
       .preview{
         flex:0 0 px2rem(40);
         @include center;
       }
       .select{
        display: flex;
        flex: 1;
          .select-wrapper{
           flex: 1;
           display: flex;
           align-items: center;
            &:first-child{
              .line{
                  &:first-child{
                    border-top:none;
                  }
                }
             }
             &:last-child(1){
              .line{
                  &:last-child(1){
                    border-top:none;
                  }
                }
             }
              .line{
               flex: 1;
               height: 0;
               border-top: px2rem(1) solid #ccc;
             }
             .point-wrapper{
              position: relative;
               flex: 0 0 0;
               width: 0;
               height: px2rem(7);
               border-left: px2rem(1) solid #ccc;
               .point{
                  position:absolute;
                  top:px2rem(-5);
                  left: px2rem(-10);
                  width: px2rem(15);
                  height: px2rem(15);
                  border-radius: 50%;
                  border: 1px solid #ccc;
                  background-color: #fff;
                  box-shadow: 0 px2rem(4) px2rem(4) rgba(0,0,0,.15);
                  @include center;
                  .small-point{
                    width: px2rem(3);
                    height: px2rem(3);
                    background: black;
                    border-radius: 50%;
                  }
               }
             }
          }
         }
     }
     .setting-theme{
       height: 100%;
       display: flex;
        .setting-theme-item{
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: px2rem(5);
          box-sizing: border-box;
          .preview{
            flex:1;
            border:px2rem(1) solid #ccc;
            box-sizing: border-box;
            &.no-border{
              border:none;
            }
          }
          .text{
            flex: 0 0 px2rem(24);
            font-size: px2rem(12);
            color: #999;
            text-align: center;
            &.selected{
              color: #333333;
            }
          }
        }
     }
     .setting-progress{
       position: relative;
       width: 100%;
       height: 100%;
       .progress-wrapper{
         width: 100%;
         height: 100%;
         @include center;
         padding: 0 px2rem(30);
         box-sizing: border-box;
       }
       //进度条
       .progress{
         width: 100%;
         -webkit-appearance: none;//覆盖默认样式
         height: px2rem(2);
         background: -webkit-linear-gradient(#999,#999) no-repeat,#ddd;//设置为两种背景
         -webkit-background-size: 0 100%;//设置两种背景的占比
         background-size: 0 100%;
         &:focus{
           outline: none;
         }
         &::-webkit-slider-thumb{
           -webkit-appearance: none;
           height: px2rem(20);
           width: px2rem(20);
           border-radius: 50%;
           background: white;
           box-shadow: 0 4px 4px 0 rgba(0,0,0,.15);
           border: px2rem(1) solid #ddd;
         }
       }
       .text-wrapper{
         font-size: px2rem(14);
         text-align: center;
       }
     }
   }
   .foot-wrapper {
     position: absolute;
     bottom: 0;
     left: 0;
     width: 100%;
     height: px2rem(48);
     background-color: white;
     box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
     display: flex;
     justify-content: space-around;
     z-index: 101;
     &.hide-box-shadow{
       box-shadow: none;
     }
     .icon-wrapper {
       flex: 0 0 px2rem(40);
       @include center;
     }
   }
   .content-mask{
     position: absolute;
     top: 0;
     left: 0;
     z-index: 101;
     display: flex;
     width: 100%;
     height: 100%;
     background: rgba(51,51,51,.8);
   }
 }
</style>
