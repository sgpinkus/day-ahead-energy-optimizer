<script setup lang="ts">
import * as d3 from 'd3';
import { onMounted, ref, useTemplateRef, watch, watchEffect, type Ref } from 'vue';
import { draw, type Options, type Node } from './NetworkHub';


const emits = defineEmits(['click', 'dblclick']);

const { deviceNodes, focusedNodeId, hubNode } = defineProps<{
  deviceNodes: Node[],
  hubNode?: Partial<Node>,
  focusedNodeId?: string,
}>();

const container: Ref<SVGSVGElement | null> = useTemplateRef('container');
const options: Ref<Partial<Options>> = ref({
  focusedNodeId,
  hubNode,
});

function _draw() {
  if(!container.value) return;
  d3.select(container.value).selectAll('*').remove();
  draw(
    container.value!,
    deviceNodes,
    options.value,
    onClick,
    onDoubleClick,
  );
}

function onClick(id: string) {
  emits('click', id);
}

function onDoubleClick(id: string) {
  emits('dblclick', id);
}

watch(() => deviceNodes, () => _draw());

watchEffect(() => {
  options.value.focusedNodeId = focusedNodeId;
  _draw();
});

onMounted(() => {
  _draw();
});

</script>

<template>
  <svg
    id='container'
    ref='container'
    viewBox="0 0 480 480"
    preserveAspectRatio="xMidYMid meet">
  </svg>
</template>