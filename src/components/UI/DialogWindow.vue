<template>
  <div class="dialog-window" v-if="show" @click="closeDialog">
    <div class="dialog__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin'
export default {
  name: 'DialogWindow',
  mixins: [toggleMixin],
  mounted() {
    console.log('dialog mounted')
  }
}
</script>

<style scoped>
.dialog-window {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog__content {
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  min-width: 320px;
  min-height: 150px;
  padding: 20px;
}
</style>
