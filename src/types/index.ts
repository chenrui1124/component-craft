export const enum Framework {
  React,
  Vue,
}

export interface Meta {
  name: string
  framework: Framework
  description?: string
}
