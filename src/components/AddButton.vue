<template>
  <div
    v-if="node.nodeType !== 'test' && node.isExpanded"
    class="flex h-4 w-4 items-center justify-center rounded-full bg-white font-bold text-slate-800 opacity-0 ring-2 ring-slate-800 group-hover:opacity-100"
    @click="handleClick"
  >
    <span class="rotate-45 text-xs">✕</span>
    <Teleport to="body">
      <div
        v-if="isModalVisible"
        class="bg-opacity-50 fixed top-0 left-0 z-100 flex h-screen w-screen items-center justify-center bg-black/20 backdrop-blur-xs"
        @click.stop="isModalVisible = false"
      >
        <div class="flex flex-col gap-4 rounded bg-white p-4 font-bold shadow-lg">
          <div>Select new node type:</div>
          <div
            v-for="node in nodesToOffer"
            class="flex cursor-pointer justify-center rounded p-2 font-bold text-white"
            :class="node.backgroundClass"
            :key="node.nodeType"
            @click.self="nodeStore.addNode(props.nodeId, node.nodeType)"
          >
            {{ node.nodeType }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getAllowedChildren, getBackgroundClass } from '@/util/nodeInfo'
import { useNodeStore } from '@/stores/node'

const props = defineProps<{
  nodeId: string
}>()

const nodeStore = useNodeStore()
const node = nodeStore.nodes[props.nodeId]

const allowedChildTypes = getAllowedChildren(node.nodeType)
const nodesToOffer = allowedChildTypes.map((nodeType) => ({
  nodeType,
  backgroundClass: getBackgroundClass(nodeType),
}))

const isModalVisible = ref(false)

const handleClick = () => {
  if (allowedChildTypes.length === 1) {
    nodeStore.addNode(props.nodeId, allowedChildTypes[0])
  } else {
    isModalVisible.value = true
  }
}
</script>
