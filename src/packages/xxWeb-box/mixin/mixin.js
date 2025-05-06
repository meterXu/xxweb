import {match} from 'path-to-regexp';
export default {
    inject: ['app','cachedViews','visitedViews','device'],
    methods:{
        isExternal(path){
            return /^(https?:|mailto:|tel:)/.test(path);
        },
        searchMenuByPath(data, path) {
            let res = null
            for (let i = 0; i < data.length; i++) {
                const fn = match(data[i].path);
                if (data[i].path === path||fn(path)) {
                    res = data[i]
                    break
                } else if (data[i].hasOwnProperty('children') && data[i].children instanceof Array) {
                    res = this.searchMenuByPath(data[i].children, path)
                    if (res) {
                        break
                    }
                }
            }
            return res
        },
        myTitle(item){
            if(item.meta&&item.meta.title){
                if(typeof(item.meta.title)==='string'){
                    return item.meta.title
                }else{
                    return item.meta.title(this)
                }
            }else{
                return null
            }
        }
    },
    created(){
        // this.$slots = this.slots
        // this.$scopedSlots = this.scopedSlots
    }
}
