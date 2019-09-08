import { Worker, isMainThread, workerData } from 'worker_threads'
import debug from 'debug'
import * as path from 'path'
const DEBUG = debug('xlsx-hero:buffer-reader')

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

export function reader({
  onMessage,
  onError,
  onExit
}: ReaderParams) {
  return async function(buffer: Buffer) {

    DEBUG(`worker set ${workerQueue.size}`)
    if (workerQueue.size > LimitWorderQueueSize) {
      
    }
    // TODO: 这里检查set中worker数量 如果过多应该放入队列 直到有worker被删除
    const worker = new Worker(path.join(__dirname, './readerWorker.js'), { workerData: buffer })

    workerQueue.add(worker)
    DEBUG(`worker set add ${workerQueue.size}`)

    worker.on('message', onMessage)
    worker.on('error', onError)
    worker.on('exit', (...args) => {
      workerQueue.delete(worker)
      onExit.apply(null, args)
    })
  }
}

export function read2(file: File) {
  
}