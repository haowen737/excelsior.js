export interface ExcelsiorSheet {
  sheetname: string
  data: any[]
  options?: object
}

export interface ExcelsiorSheetBuilder extends ExcelsiorSheet {
  setName: (name: string) => ExcelsiorSheetBuilder
  setData: (data: any[]) => ExcelsiorSheetBuilder
}

export function instanceofExcelsiorSheet(target: any): target is ExcelsiorSheet {
  return 'sheetname' in target || 'data' in target
}

export const excelsiorSheet = (): ExcelsiorSheetBuilder => ({
  sheetname: 'sheet',
  data: [],

  setName(name: string) {
    this.sheetname = name
    return this
  },

  setData(data: any[]) {
    this.data = data
    return this
  }
})

