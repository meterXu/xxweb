import {mergeObject, formatDate, expandFullProject} from '../lib/util.js'
import {testPath} from "../lib/filter.js";

console.log(mergeObject({a: {c:1,d:2},b:2},{a:{e:3,f:4}}))
console.log(formatDate(new Date,'yyyy-MM-dd HH:mm:ss'))
console.log(JSON.stringify(expandFullProject({
    style:{theme:'dark'}
})))
console.log(testPath('/xtcz/ywzx/list/:type','/xtcz/ywzx/list/dcjc'))
console.log(testPath('/xtcz/ywzx/list/:type','/xtcz/ywzx/listxxx/dcjc'))