import { typeOf } from './typeOf'

export const isDate = (value: unknown): value is Date => typeOf(value) === 'date'
