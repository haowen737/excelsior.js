export function isEmpty(value: any) {
  if (value == null) {
    return true
  }
  return false
}

export function isString(s: any): s is string {
  return typeof s === 'string'
}