<template>
  <div class="flex min-h-screen flex-col select-none">
    <div class="z-10 flex border-b bg-slate-50">
      <div class="grid auto-cols-fr grid-flow-col">
        <div
          class="cursor-pointer border-r border-slate-800 px-4 py-2 text-center font-semibold text-slate-800 hover:bg-slate-800 hover:text-white"
          @click="item[1]"
          :key="item[0]"
          v-for="item in menuItems"
        >
          {{ item[0] }}
        </div>
      </div>
    </div>
    <div class="flex w-full flex-1 bg-slate-50">
      <ProjectNode node-id="root" :parent-el="null" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectNode from '@/components/ProjectNode.vue'
import { useNodeStore } from './stores/node'

const nodeStore = useNodeStore()

const expandAll = () => {
  Object.values(nodeStore.nodes).forEach((node) => {
    node.isExpanded = true
  })
}

const collapseAll = () => {
  Object.values(nodeStore.nodes).forEach((node) => {
    node.isExpanded = false
  })
}

const menuItems: [string, () => void][] = [
  ['Expand All', expandAll],
  ['Collapse All', collapseAll],
  ['Example', nodeStore.loadExample],
  ['Clear', nodeStore.clear],
  ['Save', nodeStore.saveToLocalStorage],
  ['Load', nodeStore.loadFromLocalStorage],
]
</script>

<style scoped></style>
