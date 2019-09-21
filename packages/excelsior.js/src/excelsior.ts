import { DefaultExcelsiorConfig, ExcelsiorConfig } from './config'
import { ParseOptions, DefaultParseOptions } from './config/parser'
import { Validator } from './validator'
import { bufferReader } from './parser'

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
   * Parse xslx fileBuffer, will do
   * 1. reader accept fileBuffer, size check, split chunk
   * 2. create worker threads for each chunk
   * 3. run validtor in each threads
   * 4. merge result
   *
   * @param {Buffer} fileBuffer
   * @memberof Excelsior
   */
  public async parse(fileBuffer: Buffer, parseOptions: ParseOptions = DefaultParseOptions) {
    const { columns } = this.mixedConfig
    this.validator.createSchema(columns)

    const { validate } = parseOptions
    const data = await bufferReader(fileBuffer, validate)
    return data
  }
  
}