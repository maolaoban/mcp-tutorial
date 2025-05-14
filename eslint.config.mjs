// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  ignores: ['build/**/*', 'dist/**/*', 'node_modules/**/*'],
})
