import { Fetcher } from "./Fetcher"

export class BrowserFetcher extends Fetcher {
  static create() {
    return new BrowserFetcher()
  }

  async get({url, options}) {
    return window.fetch(url, options).then((response) => {
      return response.json()
    })
  }
}