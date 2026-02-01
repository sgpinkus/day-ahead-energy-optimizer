<script setup lang="ts">
import * as d3 from 'd3';
import { computed, onMounted, useTemplateRef, watch, type Ref } from 'vue';
import { draw, type Node } from './NetworkHub';

const emits = defineEmits(['click', 'dblclick']);

const { deviceNodes, focusedNodeId, hubNode, height = 480, width = 480 } = defineProps<{
  deviceNodes: Node[],
  hubNode: Node,
  focusedNodeId?: string,
  height?: number,
  width?: number,
}>();

const viewBox = computed(() => `0 0 ${width} ${height}`);
const container: Ref<SVGSVGElement | null> = useTemplateRef('container');

function _draw() {
  if (!container.value) return;
  d3.select(container.value).selectAll('*').remove();
  draw(
    container.value!,
    deviceNodes,
    hubNode,
    focusedNodeId,
    undefined,
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

watch(() => deviceNodes, () => {
  _draw();
});

watch(() => hubNode, () => {
  _draw();
});

watch(() => focusedNodeId, () => {
  _draw();
});

onMounted(() => {
  _draw();
});

</script>

<template>
  <svg
    id="container"
    ref="container"
    :viewBox="viewBox"
    preserveAspectRatio="xMidYMid meet"
  />
</template>