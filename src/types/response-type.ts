export interface IResponseType<T = {}> {
  code: number
  message: string
  data: T
}
