<template>
    <transition name="slide-right">
      <div class="content">
        <div class="content-wrapper" v-if="bookAvailable">
          <div class="content-item" v-for="(item,index) in navigation.toc" :key="index"
          @click="jump(item.href)">
            <span class="text">{{item.label}}</span>
          </div>
        </div>
        <div class="empty" v-else>加载中...</div>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'Content',
  props: {
    navigation: {
      type: Object
    },
    bookAvailable: {
      type: Boolean
    },
    ifShowContent: {
      type: Boolean
    }
  },
  methods: {
    jump (target) {
      this.$emit('jump', target)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/global';
.content{
  .content-wrapper{
    background: white;
    color: black;
    z-index: 102;
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    height: 100%;
    .content-item{
      .text{
        font-size: px2rem(14);
        font-weight: normal;
        padding: px2rem(5);
      }
    }
  }
  .empty{
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    height: 100%;
    z-index: 102;
    background: white;
    color: black;
    font-size: px2rem(14);
    font-weight: normal;
    display: flex;
    justify-content: center;
  }
}
</style>
