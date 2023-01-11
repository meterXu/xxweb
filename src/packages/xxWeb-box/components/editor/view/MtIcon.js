const DoOneToOne =  {
    prop:['size'],
    render(h,context){
        const {size} = context.props;
        return (
            <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path d="M42 7H6C4.89543 7 4 7.89543 4 9V39C4 40.1046 4.89543 41 6 41H42C43.1046 41 44 40.1046 44 39V9C44 7.89543 43.1046 7 42 7Z" fill="none" stroke="currentColor" stroke-width="2"></path><path d="M12 20.5799L16 18V30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M31 20.5799L35 18V30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24 20V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M24 27V28" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
        )
    }
}

const DoOverallReduction =  {
    render(h,context){
        const {size} = context.props;
        return (
            <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path d="M15 15H33V33H15V15Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 43V37H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M37 43V37H43" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 5V11H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M37 5V11H43" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        )
    }
}

const DoGps = {
    render(h,context){
        const {size} = context.props;
        return (
            <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path fill-rule="evenodd" clip-rule="evenodd" d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24 13L17 34L24 29L31 34L24 13Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        )
    }
}

export default {
    name:'MtIcon',
    functional:true,
    render(h,context){
        const {icon} = context.props;
        const {staticClass,on} = context.data
        const icons = {
            DoOneToOne,
            DoOverallReduction,
            DoGps
        }
        return h('span',{
            class:['mt-icon',staticClass],
            on:on,
            style: {
                display: 'inline-block',
                fontStyle: 'normal',
                lineHeight: 0,
                textAlign: 'center',
                verticalAlign: '-0.15em'
            },
        },[icons[icon].render(h,context)])
    }
}