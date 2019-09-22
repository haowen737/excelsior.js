export interface ErrType {
  EXCEED_MAX_LENGTH: string
}

export interface ExcelsiorConfig {
  name?: string
  maxlength?: number | null
  first?: boolean | null
  rowAppend?: object | null
  needBackFill?: boolean
  columns: Column[]
  allowEmpty?: boolean,
  errMsg?: {[Key in keyof ErrType]: ErrType[Key]}
}

export interface Rule {
  validator: () => {}
}

export interface Column {
  [k: string]: unknown,
  key: string,
  rules: Rule[]
}

export const DefaultExcelsiorConfig: ExcelsiorConfig = {
  name: 'Excelsior',
  maxlength: null,
  first: false,
  rowAppend: null,
  needBackFill: false,
  columns: [],
  allowEmpty: false,
  errMsg: {
    EXCEED_MAX_LENGTH: 'exceed max length'
  }
}

export type ExcelsiorParseTarget = string | Buffer