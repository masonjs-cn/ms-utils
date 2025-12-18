import { plus } from './calculate'

export function sum(...args: number[]): number {
  return args.reduce((prev, total) => plus(total, prev), 0)
}
