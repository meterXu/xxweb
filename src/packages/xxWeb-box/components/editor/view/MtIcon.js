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

const LeftAlign = {
    render(h,context){
        const {size} = context.props;
        return (
            <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="8" y="7" width="24" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="8" y="21" width="32" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="8" y="35" width="18" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
        )
    }
}
const TopAlign = {
    render(h,context){
        const {size} = context.props;
        return (
            <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="7" y="8" width="6" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="21" y="8" width="6" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="35" y="8" width="6" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
        )
    }
}
const RightAlign = {
    render(h,context){
        const {size} = context.props;
        return (
            <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="16" y="7" width="24" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="8" y="21" width="32" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="22" y="35" width="18" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
        )
    }
}
const BottomAlign = {
    render(h,context){
        const {size} = context.props;
        return (
            <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="7" y="16" width="6" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="21" y="8" width="6" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="35" y="22" width="6" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
        )
    }
}
const VerticallyAlign = {
    render(h,context){
        const {size} = context.props;
        return (
            <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path d="M6 7H42" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><rect x="16" y="16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><path d="M6 41H42" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
        )
    }
}
const HorizontallyAlign = {
    render(h,context){
        const {size} = context.props;
        return (
            <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="16" y="16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><path d="M5 40L5 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M43 40L43 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
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
            DoGps,
            LeftAlign,
            TopAlign,
            RightAlign,
            BottomAlign,
            VerticallyAlign,
            HorizontallyAlign
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
