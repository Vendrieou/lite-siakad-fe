// all modules of concent

// Centralized configuration by the run interface
import models from '../models'

type loginRdKeys = keyof typeof models.login.reducer;
type meRdKeys = keyof typeof models.me.reducer;

// Use the template string to generate new keys to assist in generating the key description of the loading module
const loadingStatePart1 = { login: false } as { [key in `login/${loginRdKeys}`]: false } & {
  login: false;
}
const loadingStatePart2 = { me: false } as { [key in `me/${meRdKeys}`]: false } & { me: false }

const allModels = {
  ...models,
  loading: {
    state: {
      ...loadingStatePart1,
      ...loadingStatePart2
    }
  }
}

export type Models = typeof allModels;
