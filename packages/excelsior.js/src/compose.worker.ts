import debug from 'debug'
import { Worker, MessagePort, workerData, parentPort } from 'worker_threads'

import { isEmpty } from './utils'
import { compose } from './compose'

const DEBUG = debug('excelsior:compose-worker')

const composeStart = new Date()
const { aoa, columns, validate } = workerData

/**
 * Transform [] -> [{k,v}]
 * TODO: support backfill
 * @template T
 * @param {(XlsxRow[] | any[])} content
 * @param {number} index
 * @returns {(T | any)}
 */
function makeRow<T>(content: XlsxRow[] | any[], index: number): T | any {
  // if (isEmpty(content) && allowEmpty) {
  //   return {}
  // }
  // if (isEmpty(content) && !allowEmpty) {
  //   throw Err(`第${index + 2}行为空`)
  // }
  // const columns = columns
  const row: any = {}
  // row.backfillList = []

  const length = content.length
  if (!length) { return }
  for (let i = 0; i < length; i++) {
    const cell = content[i]
    const field = columns[i]

    if (!field) {
      continue
    }

    // if (!cell) {
      // throw new GatewayError(`第${index + 2}行格式异常，请依照模板进行填写`)
    // }

    const { key, backfill } = field

    // 存在需要回填函数包装的key，标记校验完成后进行回填
    // 这里暂存所有需要backfill的字段，以免将会发生的校验失败，调用backfill时内会有错误
    // backfill函数应在确保校验通过后进行调用
    // if (!this.needBackFill && backfill) { this.needBackFill = true }
    Object.assign(row, { [key]: cell })

    // 在schema中指定需要backfill才会调用每一个单元格的backfill方法
    // if (backfill) {
    //   row.backfillList.push(
    //     () => backfill(cell),
    //   )
    // }
  }

  return row
}

let composed = []
aoa.shift()
for (let i = 0; i < aoa.length; i++) {
  const currentRow = aoa[i]
  const row = makeRow(currentRow, i)
  row && composed.push(row)
}

DEBUG(`compose end, cost ${new Date().valueOf() - composeStart.valueOf()}`)
parentPort && parentPort.postMessage(composed)
