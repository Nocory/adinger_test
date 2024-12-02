<template>
  <div
    class="pointer-events-none absolute top-[50%] left-[50%] z-10 h-0.5 w-px origin-left bg-slate-800"
    :style="{
      transform: 'rotate(' + lineProperties.deg + 'deg) scaleX(' + lineProperties.length + ')',
    }"
  />
</template>

<script setup lang="ts">
import { useNodeStore } from '@/stores/node'
import { useElementBounding } from '@vueuse/core'
import { computed, nextTick, watch } from 'vue'

const props = defineProps<{
  sourceEl: HTMLElement
  targetEl: HTMLElement
}>()

const sourceBounding = useElementBounding(props.sourceEl)
const targetBounding = useElementBounding(props.targetEl)

const lineProperties = computed(() => {
  const dx = targetBounding.left.value - sourceBounding.left.value
  const dy = targetBounding.top.value - sourceBounding.top.value
  return {
    length: Math.sqrt(dx * dx + dy * dy),
    deg: Math.atan2(dy, dx) * (180 / Math.PI),
  }
})

// should be optimized to only update when really necessary
const nodeStore = useNodeStore()
watch(nodeStore.nodes, async () => {
  await nextTick()
  sourceBounding.update()
  targetBounding.update()
})
</script>
