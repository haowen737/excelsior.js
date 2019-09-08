import { DefaultExcelsiorConfig, ExcelsiorConfig } from './config'
import { Validator } from './validator'
import { reader } from './parser'

export class Excelsior {

  private mixedConfig: ExcelsiorConfig
  // private reader: Reader
  public validator: Validator
  

  constructor(config: Partial<ExcelsiorConfig>) {
    this.mixedConfig = Object.assign({}, DefaultExcelsiorConfig, config)
    this.validator = new Validator()
  }

  /**
   * TODO: expose more function from child processor
   *
   * @memberof Excelsior
   */
  public load() {
  }

  /**
   * Parse xslx file, will do
   * 1. reader accept file, size check, split chunk
   * 2. create worker threads for each chunk
   * 3. run validtor in each threads
   * 4. merge result
   *
   * @param {File} file
   * @memberof Excelsior
   */
  public async parse(file: File) {
    const { columns } = this.mixedConfig
    this.validator.createSchema(columns)

    reader({
      onMessage: (msg) => {
        console.log('msg', msg)
      },
      onError: (er) => {
        console.log(er)
      },
      onExit: (msg) => {
        console.log('msg', msg)
      },
    })
  }
  
}