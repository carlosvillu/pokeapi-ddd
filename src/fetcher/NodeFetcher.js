import { Fetcher } from "./Fetcher";

export class NodeFetcher extends Fetcher {
  async get({url, options}) {
    return Promise.resolve({implement: false})
  }
}