import type { Meta } from '@/types'
import type { AstroInstance } from 'astro'

export function useStories() {
  return Object.entries<AstroInstance & { meta: Meta }>(
    import.meta.glob('@/pages/*.astro', { eager: true }),
  )
    .filter(([_, instance]) => Object.hasOwn(instance, 'meta'))
    .map(([_, { url, meta }]) => ({ url: url!, meta }))
}
