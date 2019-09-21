import { Worker, isMainThread, workerData } from 'worker_threads'
import debug from 'debug'
import * as path from 'path'
import { AssertionError } from 'assert';
import { ParseOptions } from './config/parser';
import { ParserOptions } from '@babel/core';
const DEBUG = debug('excelsior:parser')

interface ReaderParams {
  onMessage: (data: any) => void
  onError: (data: any) => void
  onExit: (data: any) => void
}

// 创建worker的需求会首先被加入队列
// 在运行中的worker数量限制下
const workerQueue = new Set()
const pendingWorker = []
const LimitWorderQueueSize = 10

// export function reader({
//   onMessage,
//   onError,
//   onExit
// }: ReaderParams) {
//   return async function(buffer: Buffer) {

//     DEBUG(`worker set ${workerQueue.size}`)
//     if (workerQueue.size > LimitWorderQueueSize) {
      
//     }
//     // TODO: 这里检查set中worker数量 如果过多应该放入队列 直到有worker被删除
//     const worker = new Worker(path.join(__dirname, './readerWorker.ts'), { workerData: buffer })

//     workerQueue.add(worker)
//     DEBUG(`worker set add ${workerQueue.size}`)

//     worker.on('message', onMessage)
//     worker.on('error', onError)
//     worker.on('exit', (...args) => {
//       workerQueue.delete(worker)
//       onExit.apply(null, args)
//     })
//   }
// }

// Input Type
// Strings can be interpreted in multiple ways. The type parameter for read tells the library how to parse the data argument:

// type	expected input
// "base64"	string: Base64 encoding of the file
// "binary"	string: binary string (byte n is data.charCodeAt(n))
// "string"	string: JS string (characters interpreted as UTF8)
// "buffer"	nodejs Buffer
// "array"	array: array of 8-bit unsigned int (byte n is data[n])
// "file"	string: path of file that will be read (nodejs only)

// TODO: 实现
export function fileReader(file: File, validate: ParseOptions['validate'] ) {
  
}


export function bufferReader(buffer: Buffer, validate: ParseOptions['validate']) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, './parser.worker.js'), { workerData: buffer })
    workerQueue.add(worker)
    DEBUG(`worker set add ${workerQueue.size}`)
    worker.on('message', (msg) => {
      console.log('msg', msg)
      resolve(msg)
    })
    worker.on('error', (er) => {
      console.log(er)
      reject(er)
    },)
    worker.on('exit', (msg) => {
      workerQueue.delete(worker)
      console.log('exit---', msg)
    })
  })
}

function mixReader(buffer: Buffer) {

}

export function read2(file: File) {
  // AssertionError(
  // if (path.extname(file) !== '.xlsx') {
    // throw new TypeError()
  // }
}