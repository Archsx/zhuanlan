import axios from 'axios'
import { Commit } from 'vuex'
import { get } from './base'

export function getColumn(cid: string) {
  return get(`columns/${cid}`)
}

export function getPosts(cid: string) {
  return get(`columns/${cid}/posts`)
}

export function getColumns() {
  return get('columns')
}

export const getAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await get(url)
  commit(mutationName, data)
  return data
}

export const postAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  payload: any
) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
