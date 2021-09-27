export type Nullable<T> = T | null | void | undefined

export type Coproduct<T> = {
  [K in keyof T]: Record<'type', K> & T[K]
}[keyof T]

export type Individual<
  TCoproduct extends Record<'type', keyof any>,
  Tag
> = Extract<TCoproduct, Record<'type', Tag>>

export type Match<TCoproduct extends Record<'type', keyof any>, Tag> = Omit<
  Individual<TCoproduct, Tag>,
  'type'
>

export function match<TCoproduct extends Record<'type', keyof any>, TOut>(
  value: TCoproduct,
  patterns: {
    [K in TCoproduct['type']]: (param: Match<TCoproduct, K>) => TOut
  }
): TOut {
  const tag: TCoproduct['type'] = value.type
  return patterns[tag](value as any)
}

export type Maybe<T> = Coproduct<{
  Just: { value: T }
  Nothing: {}
}>

export function Maybe<T>(value: Nullable<T>): Maybe<T> {
  if (!!value) {
    return Just(value)
  }
  return Nothing
}

export function Just<T>(value: T): Maybe<T> {
  return { type: 'Just', value }
}
export const Nothing: Maybe<never> = { type: 'Nothing' }

export type SimpleError = {
  message: string
}

export type Result<T, Err = SimpleError> = Coproduct<{
  Ok: { value: T }
  Err: { err: Err }
}>

export function Ok(): Individual<Result<void, never>, 'Ok'>
export function Ok<T>(value: T): Individual<Result<T, never>, 'Ok'>
export function Ok<T>(value?: T): Individual<Result<T, never>, 'Ok'> {
  return { type: 'Ok', value: value! }
}

export function isOk<R extends Result<T, any>, T>(
  result: R
): result is Match<R, 'Ok'> & R {
  return result.type === 'Ok'
}

export function isErr<R extends Result<any, any>>(
  result: R
): result is Match<R, 'Err'> & R {
  return result.type === 'Err'
}

export function Err<Err = SimpleError>(err: Err): Individual<Result<never, Err>, 'Err'> {
  return { type: 'Err', err }
}

export function pickByKey<T, K extends keyof T>(v: T, keys: K[]) {
  return keys.reduce((acc, k) => {
    acc[k] = v[k]
  }, Object.create(null)) as Pick<T, K>
}
