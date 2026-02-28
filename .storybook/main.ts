import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-links'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@my-ui/core': resolve(__dirname, '../packages/core/src/index.ts'),
    }

    const hasReactPlugin = config.plugins?.flat().some(
      (p) => p && typeof p === 'object' && 'name' in p && p.name === 'vite:react-babel',
    )
    if (!hasReactPlugin) {
      config.plugins = [...(config.plugins || []), react()]
    }

    return config
  },
}

export default config
