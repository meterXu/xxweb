const eventRegistryMap = new WeakMap()
const globalObj = this || {}
function getRegistry(instance:object):{[key:string]:Function[]|undefined}{
    let events = eventRegistryMap.get(instance)
    if (!events) {
        eventRegistryMap.set(instance, (events = Object.create(null)))
    }
    return events
}

export function $on(event:string[]|string, fn:any) {
    if (Array.isArray(event)) {
        event.forEach((e) => $on(e, fn))
    } else {
        const events = getRegistry(globalObj);
        (events[event] || (events[event] = [])).push(fn)
    }
}
export function $once(event:string, fn:any) {
    //@ts-ignore
    const wrapped = async (...args) => {
        $off(event, wrapped)
        return await fn.call(globalObj, ...args)
    }
    wrapped.fn = fn
    $on(event, wrapped)
}
export function $off(event:any, fn?:any) {
    const vm = globalObj
    // all
    if (!event) {
        eventRegistryMap.set(globalObj, Object.create(null))
        return vm
    }
    // array of events
    if (Array.isArray(event)) {
        event.forEach((e) => $off(e, fn))
        return vm
    }
    // specific event
    const events = getRegistry(globalObj)
    const cbs = events[event]
    if (!cbs) {
        return vm
    }
    if (!fn) {
        events[event] = undefined
        return vm
    }
    events[event] = cbs.filter((cb:any) => !(cb === fn || cb.fn === fn))
    return vm
}
export function $emit(event:string, ...args:any[]) {
    const cbs = getRegistry(globalObj)[event]
    if (cbs&&cbs.length>0) {
        return cbs.length>1?
        Promise.all(
            cbs.map(async (cb) =>await cb.apply(globalObj, args))
        ):Promise.resolve(cbs[0].apply(globalObj, args))
    }
    return Promise.resolve()
}

export default {
    $on,
    $off,
    $once,
    $emit
}