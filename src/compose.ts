import { Worker, isMainThread, workerData } from 'worker_threads'
import path from 'path'
import debug from 'debug'

import { ParseOptions } from './config/parser'
import { ExcelsiorConfig } from './config'
import { Validator } from './validator'

const DEBUG = debug('excelsior:compose')
const workerQueue = new Set()

/**
 * 这里可以拆分 worker
 *
 * @export
 * @param {unknown[]} aoa
 * @param {{ columns: ExcelsiorConfig['columns'], validate: ParseOptions['validate'] }} { columns, validate }
 * @returns
 */
export function compose(
  aoa: unknown[],
  composeOptions: { columns: ExcelsiorConfig['columns'], validate: ParseOptions['validate'] }
) {
  const { columns, validate } = composeOptions || {}
  return new Promise((resolve, reject) => {

    let validator = null
    if (validate) validator = new Validator()

    const worker = new Worker(path.join(__dirname, './compose.worker.js'), { workerData: { aoa, columns, validate } })
    workerQueue.add(worker)

    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', () => {
      workerQueue.delete(worker)
      DEBUG(`worker set DELETE ${workerQueue.size}`)
    })
  })
}

