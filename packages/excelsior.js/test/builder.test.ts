import xlsx from 'xlsx'
import { Excelsior, Builder, excelsiorSheet } from '../src'

const TestSheetName = 'testsheet'
const TestSheetDate = [['name', 'age'], ['Amy', 12], ['Sam', 13]]
const TestSheetJson = [{ name: 'Amy', age: 12 }, { name: 'Sam', age: 13 }]
const Data = excelsiorSheet().setName(TestSheetName).setData(TestSheetDate)
const file = Builder.build(Data)


describe('builder', () => {

  it('build buffer from sheet data', (done) => {
    const workbook = xlsx.read(file)
    const sheets = workbook.Sheets[TestSheetName]
    const json = xlsx.utils.sheet_to_json(sheets)
    expect(json).toMatchObject(TestSheetJson)
    done()
  })

})