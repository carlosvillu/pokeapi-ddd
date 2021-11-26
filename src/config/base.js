import { isBrowser } from '@web/js'

export default () => {
  const ENV = (isBrowser ? window.ENV : process.env) || 'development'

  const BASE = {
    API_HOST: 'https://pokeapi.co/api'
  }

  return BASE
}

