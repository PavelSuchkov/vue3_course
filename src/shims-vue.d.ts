/* eslint-disable */
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue' {
  export default Vue
  export * from 'vue'
}
