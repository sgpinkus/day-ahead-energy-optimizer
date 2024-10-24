<script setup lang="ts">
import * as d3 from 'd3';
import { computed, onMounted, ref, useTemplateRef, watch, watchEffect, type Ref } from 'vue';
import { draw, type Options, type Node } from './NetworkHub';


const emits = defineEmits(['click', 'dblclick']);

const { deviceNodes, focusedNodeId, hubNode, height = 480, width = 480 } = defineProps<{
  deviceNodes: Node[],
  hubNode?: Partial<Node>,
  focusedNodeId?: string,
  height?: number,
  width?: number,
}>();

const viewBox = computed(() => `0 0 ${width} ${height}`);
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
    :viewBox=viewBox
    preserveAspectRatio="xMidYMid meet">
  </svg>
</template>