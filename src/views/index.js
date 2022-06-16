import Page from './Page.vue'
export default [{
    path: '/',
    redirect:'/page/1'
},{
    path: '/page/',
    name:'page',
    meta:{
        keepAlive:false
    },
    children:[
        {
            path: '1',
            name:'page_1',
            component:Page,
            meta:{
                keepAlive:false
            }
        },
        {
            path: '2',
            name:'page_2',
            component:Page,
            meta:{
                keepAlive:false
            }
        },
        {
            path: '3',
            name:'page_3',
            component:Page,
            meta:{
                keepAlive:false
            }
        },
        {
            path: '4',
            name:'page_4',
            component:Page,
            meta:{
                keepAlive:false
            }
        }
    ]
}]
