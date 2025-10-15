<script lang="ts" setup>
import type { Meta } from '@/types'

import { onKeyDown, useColorMode, useCycleList, useToggle } from '@vueuse/core'
import { onMounted } from 'vue'
import IconButton from './IconButton.vue'

const { stories } = defineProps<{
  currentUrl: string
  stories: { url: string; meta: Meta }[]
}>()

const [isAsideOpen, toggle] = useToggle()

onKeyDown('Escape', () => toggle(false))

const colorMode = useColorMode({
  attribute: 'data-color-mode',
  modes: {
    system: 'system',
    light: 'light',
    dark: 'dark',
  },
})

const colorModeList = [
  {
    colorMode: 'system' as const,
    icon: 'i-[fluent--dark-theme-24-filled]',
  },
  {
    colorMode: 'light' as const,
    icon: 'i-[fluent--weather-sunny-24-filled]',
  },
  {
    colorMode: 'dark' as const,
    icon: 'i-[fluent--weather-moon-24-filled]',
  },
]

const { state, next, go } = useCycleList(colorModeList)

onMounted(() => {
  const currentIndex = colorModeList.findIndex(item => item.colorMode === colorMode.value)
  if (currentIndex) go(currentIndex)
})

const nextColorMode = () => {
  colorMode.value = next().colorMode
  console.log(colorMode.value)
}

const onClickNextColorMode = () => {
  if ('startViewTransition' in document) {
    document.startViewTransition(() => nextColorMode())
  } else {
    nextColorMode()
  }
}
</script>

<template>
  <IconButton
    :icon="isAsideOpen ? 'i-[fluent--circle-24-filled]' : 'i-[fluent--circle-shadow-24-regular]'"
    class="absolute top-3 right-3 z-30"
    @click="toggle()"
  />
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition duration-300 ease-out-quart"
    leave-active-class="transition duration-300 ease-out-quart"
    leave-to-class="opacity-0"
  >
    <div v-if="isAsideOpen" class="absolute inset-0 z-20 bg-sur/25 backdrop-blur-md">
      <aside
        class="absolute top-3 right-0 bottom-0 z-20 flex flex-col items-end justify-start gap-3 overflow-y-auto p-3 pt-0 text-on-sur"
      >
        <IconButton :icon="state.icon" class="mr-12" @click="onClickNextColorMode" />
        <ul class="p-3 pt-1.5">
          <li class="contents">
            <a
              v-for="({ url, meta }, index) of stories"
              :key="index"
              :href="url"
              :class="[
                'flex h-7 cursor-pointer items-center justify-end leading-7 transition duration-300 select-none after:ml-3 after:inline-block after:h-px after:w-4 after:transition-all after:duration-300',
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
    </div>
  </Transition>
</template>
