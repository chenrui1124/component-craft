<script lang="ts" setup>
defineProps<{
  icon: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    type="button"
    class="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-klein transition duration-300 ease-out-quart outline-none hover:bg-neu/5 focus-visible:bg-neu/10"
    @click="emit('click', $event)"
  >
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition duration-300 ease-out-quart"
      leave-active-class="transition duration-300 ease-out-quart absolute"
      leave-to-class="opacity-0"
    >
      <span :key="icon" aria-hidden="true" :class="['size-5', icon]"></span>
    </Transition>
  </button>
</template>
