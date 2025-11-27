<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'

const { increment } = useCounterStore()

const { count } = storeToRefs(useCounterStore())
</script>

<template>
  <div class="example">
    <div>Example vue component - {{ count }}</div>
    <button @click="increment">Click to increment</button>
  </div>
</template>

<style lang="scss" scoped>
.example {
  color: red;
}
</style>
