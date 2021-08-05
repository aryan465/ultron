const process = require('process')

setInterval(()=>{
console.log(process.cpuUsage())
},500)
