<template>
  <div class="ml-20 flex items-center">
    <div class="node-wrapper group relative cursor-pointer px-8 py-4">
      <!-- The node circle -->
      <div
        ref="nodeEl"
        class="node-circle relative z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white ring-2 shadow-lg ring-slate-800 transition-all duration-1000 starting:open:opacity-0"
        :class="backgroundClass"
        @click.self="toggleChildNodeVisibility"
      >
        <!-- this shows the node index -->
        <slot />
        <!-- little triangle to indicate collapsed nodes -->
        <div
          v-if="!node.isExpanded && node.childIds.length"
          class="absolute translate-x-8 border-y-8 border-l-8 border-slate-800 border-y-transparent"
        />
        <DeleteButton :node-id="nodeId" class="absolute z-20 -translate-x-10" />
        <AddButton :node-id="nodeId" class="absolute z-20 translate-x-10" />
      </div>
      <NodeConnection
        v-if="node.nodeType !== 'root' && nodeEl && parentEl"
        :source-el="nodeEl"
        :target-el="parentEl"
        class="node-connection"
      />
    </div>
    <div class="childNodes flex flex-col" v-if="node.isExpanded">
      <ProjectNode
        :parent-el="nodeEl"
        :node-id="nodeId"
        :key="nodeId"
        v-for="(nodeId, index) in node.childIds"
        :ref="childNodeRefs.set"
      >
        {{ index + 1 }}
      </ProjectNode>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type ComponentPublicInstance } from 'vue'
import AddButton from './AddButton.vue'
import NodeConnection from './NodeConnection.vue'
import DeleteButton from './DeleteButton.vue'
import ProjectNode from '@/components/ProjectNode.vue'
import { useNodeStore } from '@/stores/node'
import { useTemplateRefsList } from '@vueuse/core'
import { getBackgroundClass } from '@/util/nodeInfo'

const props = defineProps<{
  nodeId: string
  parentEl: HTMLElement | null
}>()

const childNodeRefs = useTemplateRefsList<ComponentPublicInstance>()

const nodeEl = ref<HTMLElement | null>(null)

const childNodeEls = ref<HTMLElement[]>([])
watch(
  () => childNodeRefs.value.length,
  () => {
    childNodeEls.value = childNodeRefs.value.map((ref) => ref.$el as HTMLElement)
  },
)

const nodeStore = useNodeStore()
const node = computed(() => nodeStore.nodes[props.nodeId])

const backgroundClass = getBackgroundClass(node.value.nodeType)

const toggleChildNodeVisibility = () => {
  // Only collapse childNodes if there actually are any
  if (node.value.childIds.length) {
    node.value.isExpanded = !node.value.isExpanded
  }
}
</script>

<style lang="css">
/* This highlights the line from the root node to the hovered element and exists purely for aesthetic reasons */
.node-wrapper:has(+ .childNodes .node-wrapper:hover) > .node-connection,
.node-wrapper:hover > .node-connection {
  height: 0.25rem;
}
</style>
