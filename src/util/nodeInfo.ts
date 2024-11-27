import type { NodeType } from '@/types/types'

const getAllowedChildren = (nodeType: NodeType) => {
  const nodeHierarchies: Record<NodeType, NodeType[]> = {
    root: ['saga', 'epic', 'story'],
    saga: ['epic', 'story'],
    epic: ['story'],
    story: ['test'],
    test: [],
  }
  return nodeHierarchies[nodeType]
}

const getBackgroundClass = (nodeType: NodeType) => {
  const backgroundClass = {
    root: 'bg-amber-400',
    saga: 'bg-red-500',
    epic: 'bg-cyan-950',
    story: 'bg-cyan-600',
    test: 'bg-emerald-400',
  }
  return backgroundClass[nodeType]
}

export { getAllowedChildren, getBackgroundClass }
