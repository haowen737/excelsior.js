// import xlsx from "node-xlsx"
import xlsx from 'xlsx'
import { Worker, MessagePort, workerData, parentPort } from 'worker_threads'
import debug from 'debug'
import * as path from 'path'

import { Validator } from "./validator"

const DEBUG = debug('xlsx-hero:buffer-reader')

DEBUG('buffer received')

const parseStart = new Date()
const buf = Buffer.from(workerData)
// const sheet = xlsx.parse(buf, { raw: false })[0]

DEBUG(`buffer created, cost ${new Date().valueOf() - parseStart.valueOf()}`)
// const datas = sheet.data
const datas: any = []

const threadCount = 10
const workerSet = new Set()
const dataLength = datas.length
const start = 0

for (let i = 0; i < threadCount; i++) {
  const end = Math.ceil(dataLength / threadCount)
  const chunk = datas.splice(start, end)
  const validatorWorker = new Worker(path.join(__dirname, './validatorWorker.js'), {
    workerData: chunk
  })

  validatorWorker.on('message', (msg) => {
    console.log('validatorWorker msg', msg)
  })

  validatorWorker.on('exit', (err) => {
    console.log('validatorWorker exit', err)
    workerSet.delete(validatorWorker)
    DEBUG(`validate thread ${i} deleted, workerSet.size${workerSet.size}`)
  })

  workerSet.add(validatorWorker)
  DEBUG(`validate thread ${i} created, workerSet.size${workerSet.size}`)
}


parentPort && parentPort.postMessage(datas)