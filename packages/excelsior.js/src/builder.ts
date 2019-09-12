import xlsx from 'xlsx'
import { excelsiorSheet, ExcelsiorSheet, instanceofExcelsiorSheet } from './sheetBuilder'
import assert from 'assert';

export interface Sheet {
  name: string,
  data: unknown[],
}

function transform(worksheets: ExcelsiorSheet | ExcelsiorSheet[]) {
  assert(typeof worksheets, 'Array')

  if (instanceofExcelsiorSheet(worksheets)) {
    return [worksheets]
  }

  return [excelsiorSheet().setName('sheet').setData(worksheets)]
}

/**
 * TODO: Expose transform function
 * csv html buffer file stream
 *
 * @param {*} result
 */
function resultTransform(result: any) {
  toBuffer: () => Buffer.from(result)
  toCSV: () => {}
}

export class Builder {

  static build(sheets: ExcelsiorSheet | ExcelsiorSheet[]) {
    const worksheets = transform(sheets)
    const workbook = xlsx.utils.book_new()

    for (let i = 0; i < worksheets.length; i++) {
      const worksheet = worksheets[i]
      const sheetname = worksheet.sheetname || `Sheet${i}`
      const aoa = worksheet.data

      const ws = xlsx.utils.aoa_to_sheet(aoa);
      xlsx.utils.book_append_sheet(workbook, ws, sheetname)
    }

    const data = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    })
    return Buffer.from(data)
  }

}