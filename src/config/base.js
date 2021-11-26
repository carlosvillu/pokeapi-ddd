import { isBrowser } from '@web/js'

export default () => {
  const ENV = (isBrowser ? window.ENV : process.env) || 'development'

  const BASE = {}

  return BASE
}

