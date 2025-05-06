import {mergeObject, formatDate, expandFullProject} from '../utils/util.js'

console.log(mergeObject({a: {c:1,d:2},b:2},{a:{e:3,f:4}}))
console.log(formatDate(new Date,'yyyy-MM-dd HH:mm:ss'))
console.log(JSON.stringify(expandFullProject({
    style:{theme:'dark'}
})))