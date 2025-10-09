<script lang="ts" setup>
import type { CycleButtonItem } from './CycleButton.vue'

import CycleButton from './CycleButton.vue'

const items: CycleButtonItem[] = [
  {
    icon: 'i-[fluent--arrow-shuffle-24-regular]',
    label: '随机播放',
    value: 'shuffle',
  },
  {
    icon: 'i-[fluent--arrow-repeat-all-24-regular]',
    label: '顺序播放',
    value: 'repeatAll',
  },
  {
    icon: 'i-[fluent--arrow-repeat-1-24-regular]',
    label: '单曲循环',
    value: 'repeatOne',
  },
]
</script>

<template>
  <div class="flex h-80 flex-col items-center justify-end gap-3 bg-sur p-3">
    <div class="w-full flex-1 rounded-sm bg-neu/5"></div>
    <div class="flex items-center gap-3">
      <CycleButton :items />
      <button type="button" class="inline-flex size-9 items-center justify-center">
        <span aria-hidden="true" class="i-[fluent--previous-24-filled] size-4.5"></span>
      </button>
      <button
        type="button"
        class="inline-flex h-9 w-12 items-center justify-center rounded-full bg-neu text-on-neu"
      >
        <span aria-hidden="true" class="i-[fluent--play-24-filled] size-4.5"></span>
      </button>
      <button type="button" class="inline-flex size-9 items-center justify-center">
        <span aria-hidden="true" class="i-[fluent--next-24-filled] size-4.5"></span>
      </button>
      <button type="button" class="inline-flex size-9 items-center justify-center">
        <span aria-hidden="true" class="i-[fluent--navigation-play-20-filled] size-4.5"></span>
      </button>
    </div>
  </div>
</template>
