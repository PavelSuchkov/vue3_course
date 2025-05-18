export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:show', false)
    }
  },
  mounted() {
    console.log('mixin mounted')
  }
}
