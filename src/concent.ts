import { run } from 'concent'
import loadingPlugin from 'concent-plugin-loading'

import allModels from './models'

run(
  {
    counter: {
      // Declare a name'counter'Module
      state: { num: 1, numBig: 100 } // Define the state
    },
    ...allModels
  },
  {
    // Configure loading plugin
    plugins: [loadingPlugin]
  }
)
