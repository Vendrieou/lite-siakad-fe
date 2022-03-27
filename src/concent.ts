import { run } from 'concent'
import loadingPlugin from 'concent-plugin-loading'

import allModels from './models'

run(
  {
    ...allModels
  },
  {
    // Configure loading plugin
    plugins: [loadingPlugin]
  }
)
