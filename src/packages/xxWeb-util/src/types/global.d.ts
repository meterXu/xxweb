declare global {
    interface Window {
        cookieStore: any;
        debounceTimeoutId:number,
        pageSizeTimer:number
    }
    interface Function {
        debounce:(delay:number)=>Function
    }
}
export {}
