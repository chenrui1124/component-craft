<script lang="ts" setup>
import type { Meta } from '@/types'

import { useToggle } from '@vueuse/core'

defineProps<{
  currentUrl: string
  stories: { url: string; meta: Meta }[]
}>()

const [state, toggle] = useToggle()
</script>

<template>
  <button
    type="button"
    class="absolute top-3 right-3 z-30 inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-klein transition duration-300 ease-out-quart outline-none hover:bg-neu/5 focus-visible:bg-neu/10"
    @click="toggle()"
  >
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition duration-300 ease-out-quart"
      leave-active-class="transition duration-300 ease-out-quart absolute"
      leave-to-class="opacity-0"
    >
      <span
        :key="`${state}`"
        aria-hidden="true"
        :class="[
          'size-5',
          state ? 'i-[fluent--circle-24-filled]' : 'i-[fluent--circle-shadow-24-regular]',
        ]"
      ></span>
    </Transition>
  </button>
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition duration-300 ease-out-quart"
    leave-active-class="transition duration-300 ease-out-quart"
    leave-to-class="opacity-0"
  >
    <div v-if="state" class="absolute inset-0 z-20 bg-sur/25 backdrop-blur-sm"></div>
  </Transition>
  <Transition
    enter-from-class="translate-x-full"
    enter-active-class="transition duration-300 ease-out-quart"
    leave-active-class="transition duration-300 ease-out-quart"
    leave-to-class="translate-x-full"
  >
    <aside
      v-if="state"
      class="absolute top-15 right-0 bottom-0 z-20 flex flex-col justify-center-safe overflow-y-auto p-3 text-on-sur md:p-6"
    >
      <ul>
        <li class="contents">
          <a
            v-for="({ url, meta }, index) of stories"
            :key="index"
            :href="url"
            :class="[
              'flex h-7 cursor-pointer items-center justify-end text-right leading-7 transition duration-300 select-none after:ml-3 after:inline-block after:h-px after:w-4 after:transition-all after:duration-300',
              url === currentUrl
                ? 'pointer-events-none text-klein after:w-8 after:bg-klein'
                : 'after:bg-neu hover:text-klein hover:after:w-8 hover:after:bg-klein',
            ]"
          >
            {{ meta.name }}
          </a>
        </li>
      </ul>
    </aside>
  </Transition>
</template>
