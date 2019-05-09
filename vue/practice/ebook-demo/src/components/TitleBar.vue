<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="ifTitleAndMenuShow">
      <div class="left">
        <span class="icon-left icon"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shoppingcar icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-me icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-menu icon"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/global';
  .title-wrapper {
    display: flex;
    background: whitesmoke;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(48);
    z-index: 101;
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;
        .icon-shoppingcar {
          font-size: px2rem(22);
      }
    }
  }
    .left {
      flex: 0 0 px2rem(60);
      @include center;
  }
  }
</style>
