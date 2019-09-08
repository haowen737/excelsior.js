import { Worker, isMainThread, workerData } from 'worker_threads'

const chunk = workerData

// TODO:这里是子线程的子线程 校验结果依照index重新拼接
console.log('chunk', chunk)