<template>
  <transition class="message-fade">
    <div v-if="show" :class="['message', type ? `message-${type}` : '']">
      <v-icon :name="type" />
    </div>
  </transition>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      show: true,
      text: '',
      type: 'beer'
    }
  }
}
</script>

<style scoped>

</style>