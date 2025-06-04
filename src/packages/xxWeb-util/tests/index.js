import {mergeObject, formatDate, expandFullProject} from '../lib/util.js'
import {$on, $emit, $once, $off} from "../lib/bus.js";

console.log(mergeObject({a: {c:1,d:2},b:2},{a:{e:3,f:4}}))
console.log(formatDate(new Date,'yyyy-MM-dd HH:mm:ss'))
console.log(JSON.stringify(expandFullProject({
    style:{theme:'dark'}
})))

$on('test',()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1);
        },4000)
    })
})

$on('test',()=>{
    return 2;
})

$on('test2',()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(2);
        },1000)
    })
})

$on('test3',()=>{
    return 3;
})
$off('test3')
$once('test4',()=>{
    return 4;
})

$emit('test').then(res=>{
    console.log(res)
})

$emit('test2').then(res=>{
    console.log(res)
})

$emit('test3').then(res=>{
    console.log(res)
})
$emit('test4').then(res=>{
    console.log(res)
})
$emit('test4').then(res=>{
    console.log(res)
})