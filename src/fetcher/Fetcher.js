export class Fetcher {
  async get({url, options}) {
    throw new Error('[Fetcher#get] should be implemented')
  }
}