<script lang="ts">
export interface CycleButtonItem {
  icon: string
  label: string
  value: string
}

export interface CycleButtonProps {
  delay?: number
  items: CycleButtonItem[]
  /**
   * @default props.items[0].value
   */
  modelValue?: string
}
</script>

<script lang="ts" setup>
import { useCycleList, useToggle } from '@vueuse/core'

const { items, delay = 1500 } = defineProps<Omit<CycleButtonProps, 'modelValue'>>()

const [on, toggle] = useToggle()

const modelValue = defineModel<CycleButtonProps['modelValue']>()

const { index, state, next } = useCycleList(items, {
  initialValue: items.find(({ value }) => value === modelValue.value) ?? items[0],
})

let timer: ReturnType<typeof setTimeout>

function nextItem() {
  toggle(true)
  modelValue.value = next().value
  clearTimeout(timer)
  timer = setTimeout(() => toggle(false), delay)
}
</script>

<template>
  <div class="relative size-fit">
    <button
      @click="nextItem"
      class="inline-flex size-9 cursor-pointer items-center justify-center rounded-md transition hover:bg-on-sur/5"
    >
      <Transition
        enter-from-class="opacity-0"
        enter-active-class="transition duration-300"
        leave-active-class="absolute transition duration-300"
        leave-to-class="opacity-0"
      >
        <span
          :key="state.icon"
          aria-hidden="true"
          class="pointer-events-none size-5"
          :class="state.icon"
        ></span>
      </Transition>
    </button>
    <Transition
      enter-from-class="scale-0 translate-4.5"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-200"
      leave-to-class="scale-0 translate-4.5"
    >
      <div
        v-if="on"
        class="absolute bottom-full left-0 mb-1 origin-bottom-left rounded-md bg-neu text-on-neu shadow-md"
      >
        <ul class="grid grid-cols-[min-content_1fr] p-1">
          <li
            v-for="{ label, value, icon } of items"
            :key="value"
            :class="[
              'col-span-2 grid h-9 grid-cols-subgrid items-center gap-x-3 px-3 transition select-none',
              { 'text-on-neu/75': value !== modelValue },
            ]"
          >
            <span
              aria-hidden="true"
              :class="['pointer-events-none col-start-1 -mx-1 size-4.5', icon]"
            ></span>
            <span class="col-start-2 text-nowrap">{{ label }}</span>
          </li>
        </ul>
        <div
          :style="{ transform: `translateY(${index * 2.25}rem)` }"
          class="absolute inset-x-1 top-1 h-9 rounded-sm bg-on-neu/15 transition"
        ></div>
      </div>
    </Transition>
  </div>
</template>
