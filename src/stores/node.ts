import { nextTick, ref } from 'vue'
import { defineStore } from 'pinia'
import type { NodeType } from '@/types/types'

type node = {
  parentId: string
  nodeType: NodeType
  childIds: string[]
  isExpanded: boolean
  // maybe also put allowed child types and background class here instead of using the utility functions?
}

export const useNodeStore = defineStore('node', () => {
  const nodes = ref<Record<string, node>>({
    root: {
      parentId: 'root',
      nodeType: 'root',
      childIds: [],
      isExpanded: true,
    },
  })

  const addNode = (parentId: string, type: NodeType) => {
    const nodeId = Math.random().toString(36).slice(2)
    nodes.value[nodeId] = {
      parentId,
      nodeType: type,
      childIds: [],
      isExpanded: true,
    }
    nodes.value[parentId].childIds.push(nodeId)
  }

  const removeNode = (id: string) => {
    const node = nodes.value[id]
    const parentNode = nodes.value[node.parentId]
    parentNode.childIds = parentNode.childIds.filter((childId) => childId !== id)
    // also remove all childred of the removed node
    for (const childNodeId of node.childIds) {
      removeNode(childNodeId)
    }
    delete nodes.value[id]
  }

  const clear = () => {
    nodes.value = {
      root: {
        parentId: 'root',
        nodeType: 'root',
        childIds: [],
        isExpanded: true,
      },
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('nodes', JSON.stringify(nodes.value))
  }

  const loadFromLocalStorage = async () => {
    clear()
    await nextTick()
    const data = localStorage.getItem('nodes')
    if (data) {
      nodes.value = JSON.parse(data)
    }
  }

  const loadExample = async () => {
    clear()
    await nextTick()
    nodes.value = JSON.parse(
      '{"root":{"parentId":"root","nodeType":"root","childIds":["ipbpxmasv8e","n58rbuvsgv8"],"isExpanded":true},"ipbpxmasv8e":{"parentId":"root","nodeType":"saga","childIds":["bnnpim3mxw9","6haeutcs9po"],"isExpanded":true},"n58rbuvsgv8":{"parentId":"root","nodeType":"saga","childIds":["74mxabyxq7u"],"isExpanded":true},"bnnpim3mxw9":{"parentId":"ipbpxmasv8e","nodeType":"epic","childIds":["3o5ya9v826u","3jcn48ykw2j"],"isExpanded":true},"74mxabyxq7u":{"parentId":"n58rbuvsgv8","nodeType":"epic","childIds":["ge65qpi4gk"],"isExpanded":true},"3o5ya9v826u":{"parentId":"bnnpim3mxw9","nodeType":"story","childIds":["w3mys02azs"],"isExpanded":true},"ge65qpi4gk":{"parentId":"74mxabyxq7u","nodeType":"story","childIds":["0ynp599la9s9","xavvdq08q3k","9ro5du3boon"],"isExpanded":true},"6haeutcs9po":{"parentId":"ipbpxmasv8e","nodeType":"story","childIds":["9nf3yppu2x"],"isExpanded":true},"w3mys02azs":{"parentId":"3o5ya9v826u","nodeType":"test","childIds":[],"isExpanded":true},"3jcn48ykw2j":{"parentId":"bnnpim3mxw9","nodeType":"story","childIds":["sxls6jqo46","6kbp8l2q2al"],"isExpanded":true},"sxls6jqo46":{"parentId":"3jcn48ykw2j","nodeType":"test","childIds":[],"isExpanded":true},"6kbp8l2q2al":{"parentId":"3jcn48ykw2j","nodeType":"test","childIds":[],"isExpanded":true},"9nf3yppu2x":{"parentId":"6haeutcs9po","nodeType":"test","childIds":[],"isExpanded":true},"0ynp599la9s9":{"parentId":"ge65qpi4gk","nodeType":"test","childIds":[],"isExpanded":true},"xavvdq08q3k":{"parentId":"ge65qpi4gk","nodeType":"test","childIds":[],"isExpanded":true},"9ro5du3boon":{"parentId":"ge65qpi4gk","nodeType":"test","childIds":[],"isExpanded":true}}',
    )
  }

  return { nodes, addNode, removeNode, clear, saveToLocalStorage, loadFromLocalStorage, loadExample }
})
