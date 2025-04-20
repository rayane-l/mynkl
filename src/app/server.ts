import { store } from "./store";

export const ServerUrl: any = (path: string) => {
  const baseChoice = store.getState()
  const choice = baseChoice.base.server_url
  return `${choice}${path}`
}
