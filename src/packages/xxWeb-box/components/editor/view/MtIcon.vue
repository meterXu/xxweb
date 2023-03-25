<script>
const DoOneToOne = {
  prop: ['size'],
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path d="M42 7H6C4.89543 7 4 7.89543 4 9V39C4 40.1046 4.89543 41 6 41H42C43.1046 41 44 40.1046 44 39V9C44 7.89543 43.1046 7 42 7Z" fill="none" stroke="currentColor" stroke-width="2"></path><path d="M12 20.5799L16 18V30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M31 20.5799L35 18V30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24 20V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M24 27V28" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
    )
  }
}

const DoOverallReduction = {
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path d="M15 15H33V33H15V15Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 43V37H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M37 43V37H43" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 5V11H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M37 5V11H43" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    )
  }
}

const DoGps = {
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path fill-rule="evenodd" clip-rule="evenodd" d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24 13L17 34L24 29L31 34L24 13Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    )
  }
}

const LeftAlign = {
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="8" y="7" width="24" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="8" y="21" width="32" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="8" y="35" width="18" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
    )
  }
}
const TopAlign = {
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="7" y="8" width="6" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="21" y="8" width="6" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="35" y="8" width="6" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
    )
  }
}
const RightAlign = {
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="16" y="7" width="24" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="8" y="21" width="32" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="22" y="35" width="18" height="6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
    )
  }
}
const BottomAlign = {
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="7" y="16" width="6" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="21" y="8" width="6" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><rect x="35" y="22" width="6" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
    )
  }
}
const VerticallyAlign = {
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path d="M6 7H42" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><rect x="16" y="16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><path d="M6 41H42" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
    )
  }
}
const HorizontallyAlign = {
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect x="16" y="16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect><path d="M5 40L5 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M43 40L43 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
    )
  }
}
const TextItalic = {
  render(h, context) {
    const { size } = context.props;
    return (
      // <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path d="M20 6H36" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 42H28" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M29 5.95239L19 42" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      // <svg style="transform: rotate(8deg)" t="1679301195805" width={size} height={size} class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9309" ><path d="M896 179.2V358.4h-51.2V230.4h-665.6V358.4h-51.2V179.2z" fill="currentColor" p-id="9310"></path><path d="M537.6 204.8v665.6h-51.2V204.8z" fill="currentColor" p-id="9311"></path><path d="M614.4 844.8v51.2H409.6v-51.2z" fill="currentColor" p-id="9312"></path></svg>
      <svg style="transform: rotate(6deg)" t="1679727539245" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2803" width={size} height={size}><path d="M599.552 842.093714H768V1024h-512v-181.906286h168.228571V181.979429H146.285714v86.162285H0V0h1024v268.141714h-146.285714V181.979429H599.552v660.114285z" fill="currentColor" p-id="2804"></path></svg>
    )
  }
}
const TextItalicNormal = {
  render(h, context) {
    const { size } = context.props;
    return (
      // <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none">
      //   <g>
      //     <title>Layer 1</title>
      //     <path stroke="currentColor" id="svg_1" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" d="m17,5l14,0" />
      //     <path id="svg_2" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" d="m16,42l16,0" />
      //     <path stroke="currentColor" id="svg_3" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" d="m24,5.95239l0,36.04761" />
      //   </g>
      // </svg>

      <svg t="1679301195805" width={size} height={size} class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9309" ><path d="M896 179.2V358.4h-51.2V230.4h-665.6V358.4h-51.2V179.2z" fill="currentColor" p-id="9310"></path><path d="M537.6 204.8v665.6h-51.2V204.8z" fill="currentColor" p-id="9311"></path><path d="M614.4 844.8v51.2H409.6v-51.2z" fill="currentColor" p-id="9312"></path></svg>
    )
  }
}
const TextBoldNormal = {
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path fill-rule="evenodd" clip-rule="evenodd" d="M24 24C29.5056 24 33.9688 19.5228 33.9688 14C33.9688 8.47715 29.5056 4 24 4H11V24H24Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M28.0312 44C33.5368 44 38 39.5228 38 34C38 28.4772 33.5368 24 28.0312 24H11V44H28.0312Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    )
  }
}
const TextBold = {
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path fill-rule="evenodd" clip-rule="evenodd" d="M24 24C29.5056 24 33.9688 19.5228 33.9688 14C33.9688 8.47715 29.5056 4 24 4H11V24H24Z" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M28.0312 44C33.5368 44 38 39.5228 38 34C38 28.4772 33.5368 24 28.0312 24H11V44H28.0312Z" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    )
  }
}
const DoText = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
      <g>
        <g>
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10.3,7.1V5.2h12v1.8" />
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M16.3,5.2v13.5" />
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M13.3,18.8h6" />
        </g>
        <g>
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M1.7,12v-1.1h7V12" />
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5.2,10.9v7.9" />
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3.5,18.8H7" />
        </g>
      </g>
    </svg>);
  },
};
// 外观icon
// 链接
const DoLink = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.2401 16.373L17.1001 7.23303C14.4388 4.57168 10.0653 4.6303 7.33158 7.36397C4.59791 10.0976 4.53929 14.4712 7.20064 17.1325L15.1359 25.0678" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M32.9027 23.0031L40.838 30.9384C43.4994 33.5998 43.4407 37.9733 40.7071 40.707C37.9734 43.4407 33.5999 43.4993 30.9385 40.8379L21.7985 31.6979" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M26.1093 26.1416C28.843 23.4079 28.9016 19.0344 26.2403 16.373" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M21.7989 21.7984C19.0652 24.5321 19.0066 28.9056 21.6679 31.5669" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>);
  },
};
// 主题色
const DoMainColor = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 44C13.3137 44 16 41.3137 16 38V23.5147V4H4V38C4 41.3137 6.68629 44 10 44Z" fill="currentColor" /><path d="M10 44C13.3137 44 16 41.3137 16 38V23.5147M10 44C6.68629 44 4 41.3137 4 38V4H16V23.5147M10 44H44V32H24.4853M5.75736 42.2426C8.10051 44.5858 11.8995 44.5858 14.2426 42.2426L24.4853 32M16 23.5147L35.0147 4.5L35.4853 4L43.9853 12.5L24.4853 32" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M14.2427 42.2426L43.9853 12.5L35.4853 4L16 23.5147" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M24.4853 32H44V44H12.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M24.4853 32H44V44H12.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 44C13.3137 44 16 41.3137 16 38V23.5147V4H4V38C4 41.3137 6.68629 44 10 44Z" fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>);
  },
};
// 文本对齐
// 底部对齐
const DoTextBtm = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 36.3056H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M6 42H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M30 23L24 29L18 23V23" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M24 6V29" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>)
  },
};
// 顶部对齐
const DoTextTop = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 36.3056H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M6 42H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M30 12L24 6L18 12V12" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M24 6V29" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>)
  },
};
// 中间对齐
const DoTextCenter = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 36L24 30L30 36" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M23.9999 30.9998V43.9998" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M18 12L24 18L30 12" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M23.9999 17.0002V4.00022" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M6 24.0004H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>)
  },
};
// 左居中
const DoTextLeft = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 9H6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M34 19H6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M42 29H6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M34 39H6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>)
  },
};
// 居中
const DoTextCenterz = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 19H12" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M42 9H6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M42 29H6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M36 39H12" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>)
  },
};
// 右居中
const DoTextRight = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 9H6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M42 19H14" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M42 29H6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M42 39H14" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>)
  },
};
// 加粗
const DoTextBold = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 24C29.5056 24 33.9688 19.5228 33.9688 14C33.9688 8.47715 29.5056 4 24 4H11V24H24Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M28.0312 44C33.5368 44 38 39.5228 38 34C38 28.4772 33.5368 24 28.0312 24H11V44H28.0312Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>)
  },
};
// 斜体
const DoTextX = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6H36" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M12 42H28" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M29 5.95215L19 41.9998" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>)
  },
};
// 字宽
const DoTextW = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 40L5 8" stroke="currentColor" stroke-width="4" stroke-linecap="round" /><path d="M24 13L14 35" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M18 28L30 28" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M24 13L34 35" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M43 40L43 8" stroke="currentColor" stroke-width="4" stroke-linecap="round" /></svg>)
  },
};
// 行高
const DoTextH = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 7H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" /><path d="M6 41H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" /><path d="M24 13L14 35" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M18 28L30 28" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M24 13L34 35" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>)
  },
};
// 自动换行
const DoNewLine = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4.5,3h15C20.3,3,21,3.7,21,4.5v15c0,0.8-0.7,1.5-1.5,1.5h-15C3.7,21,3,20.3,3,19.5v-15C3,3.7,3.7,3,4.5,3z" /><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="st1" d="M9.4,13.5H7" /><path class="st1" d="M12.9,13.5h2.4c1,0,1.7-0.8,1.7-1.7v0c0-1-0.8-1.7-1.7-1.7H7" /><polyline class="st1" points="13.4,14.9 12,13.5 13.4,12.1 " /></svg>)
  },
};
// 溢出省略
const DoElle = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8V40" stroke="currentColor" stroke-width="4" stroke-linecap="round" /><path d="M40 8V40" stroke="currentColor" stroke-width="4" stroke-linecap="round" /><path d="M20.0522 24.0083H40.0002" stroke="currentColor" stroke-width="4" stroke-linecap="round" /></svg>)
  },
};
// 圆角
const DoRound = {
  render(h, context) {
    const { size } = context.props;
    return (<svg width={size} height={size} version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M16,6H8C6.9,6,6,6.9,6,8v8c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V8C18,6.9,17.1,6,16,6z" /></svg>)
  },
};
// 色卡
const 色卡 = {
  render(h, context) {
    const { size } = context.props;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 44C13.3137 44 16 41.3137 16 38V23.5147V4H4V38C4 41.3137 6.68629 44 10 44Z" fill="#333" /><path d="M10 44C13.3137 44 16 41.3137 16 38V23.5147M10 44C6.68629 44 4 41.3137 4 38V4H16V23.5147M10 44H44V32H24.4853M5.75736 42.2426C8.10051 44.5858 11.8995 44.5858 14.2426 42.2426L24.4853 32M16 23.5147L35.0147 4.5L35.4853 4L43.9853 12.5L24.4853 32" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M14.2427 42.2426L43.9853 12.5L35.4853 4L16 23.5147" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M24.4853 32H44V44H12.5" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M24.4853 32H44V44H12.5" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 44C13.3137 44 16 41.3137 16 38V23.5147V4H4V38C4 41.3137 6.68629 44 10 44Z" fill="#333" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>
    )
  },
};
export default {
  name: 'MtIcon',
  functional: true,
  render(h, context) {
    const { icon } = context.props;
    const { staticClass, on } = context.data
    const icons = {
      DoOneToOne,
      DoOverallReduction,
      DoGps,
      LeftAlign,
      TopAlign,
      RightAlign,
      BottomAlign,
      VerticallyAlign,
      HorizontallyAlign,
      TextItalic,
      TextBold,
      TextItalicNormal,
      TextBoldNormal,
      DoText,
      DoTextRight,
      DoLink,
      DoMainColor,
      DoText,
      DoTextBtm,
      DoTextTop,
      DoTextCenter,
      DoTextLeft,
      DoTextCenterz,
      DoTextRight,
      DoTextBold,
      DoTextX,
      DoTextW,
      DoTextH,
      DoNewLine,
      DoElle,
      DoRound,
      色卡
    }
    if (icon && icons[icon]) {
      return h('span', {
        class: ['mt-icon', staticClass],
        on: on,
        style: {
          display: 'inline-block',
          fontStyle: 'normal',
          lineHeight: 0,
          textAlign: 'center',
          verticalAlign: '-0.15em'
        },
      }, [icons[icon].render(h, context)])
    } else {
      return h('span')
    }
  }
}

</script>
