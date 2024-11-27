<template v-once>
  <div
    v-if="node.nodeType !== 'root'"
    class="flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-800 opacity-0 ring-2 ring-slate-800 group-hover:opacity-100"
    @click="handleClick"
    v-text="'✕'"
  />
</template>

<script setup lang="ts">
import { useNodeStore } from '@/stores/node'

const props = defineProps<{
  nodeId: string
}>()

const nodeStore = useNodeStore()
const node = nodeStore.nodes[props.nodeId]

const handleClick = () => {
  nodeStore.removeNode(props.nodeId)
}
</script>
