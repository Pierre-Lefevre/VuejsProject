<template>
  <div v-show="alerts.length" id="alert-wrapper">
    <transition-group name="fade">
      <div v-for="(alert, i) in alerts" v-if="alert.show" :key="i" class="alert" :class="alert.type">
        <p>{{ alert.message }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { EventBus } from '@/components/event-bus'

export default {
  name: 'alert',
  data () {
    return {
      alerts: []
    }
  },
  created () {
    EventBus.$on('alert', (alert) => {
      alert.show = true
      this.alerts.push(alert)
      setTimeout(() => {
        alert.show = false
      }, 5000)
      setTimeout(() => {
        this.alerts.splice(this.alerts.indexOf(alert), 1)
      }, 6000)
    })
  }
}
</script>

<style scoped>
  #alert-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    opacity: 1;
    padding: 20px;
  }

  .alert {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid transparent;
  }

  .alert:not(:last-child) {
    margin-bottom: 20px;
  }

  .alert.success {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
  }

  .alert.info {
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
  }

  .alert.error {
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
