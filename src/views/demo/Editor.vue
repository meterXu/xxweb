<template>
  <div class="editor">
    <div style="flex: 1;height: 100%;overflow: hidden">
      <MtView @viewAlign="viewAlign" :config="config" :lines="lines">
        <template v-slot="{scale,view}">
          <XscStaticLayout ref="xsc-static-layout" v-model="activeItem" :alignment="alignment" :page="page" :charts="charts" :scale="scale" :view="false" @resetAlignment="resetAlignment">
            <template v-slot="{view,item}">
              <VueDrawXs :view="view" :item="item"></VueDrawXs>
            </template>
          </XscStaticLayout>
        </template>
      </MtView>
    </div>
    <div style="width: 250px;height: 100%">
      <div class="panel-right-ui">
          <el-tabs class="ui-list" type="border-card" size="small">
            <el-tabPane style="height: 100%">
              <span slot="label">
                UL列表
              </span>
                <UIList :draggable="true" :uiList="uiList" :activeId="activeId" @nodeChange="nodeChange">
                  <template v-slot:ui-custom-icon="scope">
                    <i class="el-icon-delete" @click="deleteNode(scope.data)"></i>
                  </template>
                </UIList>
            </el-tabPane>
          </el-tabs>
      </div>
      <div class="panel-right-pro">
        <ProPanel v-if="panelConfig" :controlledObj="activeItem" :config="panelConfig"></ProPanel>
      </div>
    </div>
  </div>
</template>

<script>
import {MtView,XscStaticLayout,ProPanel,UIList} from "../../packages/xxWeb-box";
import VueDrawXs from "../../packages/vue-draw-xs/Index";
import panelConfigs from "../../views/demo/panelConfigs";
import charts from './charts'
import {get} from 'lodash'
export default {
  name: "Editor",
  components:{
    MtView,
    XscStaticLayout,
    VueDrawXs,
    ProPanel,
    UIList
  },
  data(){
    return {
      config:{
        theme:'dark',
        isRuler:true,
        isScale:true,
        isDrag:true,
        isNavigate:true,
        containerPadding:30,
        backgroundClass:'default-bg',
        navigateConf:{
          canvasWidth:224,
          canvasHeight:160
        }
      },
      lines:{
        top:[],
        left:[]
      },
      page:{
        id: 1673488946179,
        config:{
          box:{
            name: "新的画布",
            width: 1920,
            height: 1080,
          },
          type:'dom',
          chart:'page',
          options:{
            "changeSize":false,
            "backgroundColor": 'transparent',
            "backgroundImage": "https://ts1.cn.mm.bing.net/th/id/R-C.413a7faf761101bdb1f267de68e8ff25?rik=v4iL9jBH%2f4zWXw&riu=http%3a%2f%2fimg.cgmodel.com%2fimage%2f2017%2f0520%2fbig%2f660125-1945092628.jpg&ehk=VYoWzhMNcmdlgpIvXbc6DzPNautyUCieMDNryF4yg5E%3d&risl=&pid=ImgRaw&r=0",
            "backgroundSize": "cover",
            "backgroundRepeat": "no-repeat",
            "baseUrl": ""
          }
        }
      },
      charts:charts,
      activeItem:{},
      panelConfig:null,
      alignment:null,
      uiList: [],
      pageList: [],
      activeId: null,
      zIndexArr: [],
      lightStyle: {
        "border": "1px solid #fff",
        "box-shadow": "0 2px 12px 0 #fff",
      }
    }
  },
  watch:{
    activeItem:{
      handler(nv) {
        this.panelConfig = get(panelConfigs,[nv.config.type,nv.config.chart].join('.'))
        this.activeId = nv.id
        this.getUiList()
      }
    }

  },
  methods:{
    compare(property) {
      return function (obj1, obj2) {
        let val1 = obj1[property];
        let val2 = obj2[property];
        return val2 - val1;
      }
    },
    viewAlign(type){
      this.alignment = type
    },
    resetAlignment() {
      this.alignment=null
    },
    getUiList() {
      this.uiList=[]
      this.zIndexArr=[]
      this.uiList.push({
        id:this.page.id,
        name:this.page.config.box.name
      })
      let zIndexArr = []
      let arr = []
      this.charts.forEach(item=>{
        arr.push({
          name: item.config.box.name,
          id: item.id,
          zIndex: item.config.box.zIndex
        })
        zIndexArr.push({
          id:item.id,
          zIndex:item.config.box.zIndex
        })
      })
      arr.sort(this.compare('zIndex'))
      zIndexArr.sort(this.compare('zIndex'))
      this.uiList[0].children = arr
      this.zIndexArr.push({
        id:this.page.id,
        children: zIndexArr
      })
    },
    nodeChange(data,type) {
      switch (type) {
        case 'active':
          // 选中事件
          this.activeId = data
          break;
        case 'show':
          // 显隐事件
          this.controlShow(data)
          break;
        case 'drag':
          this.nodeSort(data)
          break;
        default:
          break;
      }
    },
    controlShow(id) {
      if(this.page.id===id) {

      }else {
        this.charts.forEach(item=>{
          if(item.id===id) {
            item.config.box.show=!item.config.box.show
          }
        })
      }
    },
    nodeSort(data) {
      this.uiList.forEach(ui=>{
        this.zIndexArr.forEach(zIndex=>{
          if(ui.id===zIndex.id) {
            ui.children.forEach((child,i)=>{
              child.zIndex=zIndex.children[i].zIndex
            })
          }
        })
      })
      this.pageList.forEach(page=>{
        this.uiList.forEach(ui=>{
          if(page.id===ui.id) {
            page.children.forEach(pChild=>{
              ui.children.forEach(uiChild=>{
                if(pChild.id===uiChild.id) {
                  pChild.config.box.zIndex=uiChild.zIndex
                }
              })
            })
          }
        })
      })
    },
    deleteNode(scpoe) {
      this.pageList.forEach((item, index) => {
        if(scpoe.node.parent.data.id===item.id) {
          item.children.map((child,cIndex)=>{
            if(child.id===scpoe.data.id) {
              item.children.splice(cIndex, 1)
            }
          })
        }
      });
      this.getUiList()
    }
  },
  mounted() {
    this.pageList.push({
      id:this.page.id,
      name:this.page.config.box.name
    })
    this.pageList[0].children=this.charts
    this.getUiList()
  }
}
</script>

<style lang="less">
html,body,#app{
  overflow: hidden;
}
.editor{
  display: flex;
  overflow: hidden;
  flex: 1;
  position: absolute;
  top: 40px;
  bottom: 0;
  right: 0;
  left: 1px;
  z-index: 99;
}
.panel-right-ui {
  height: 30%;
  /*overflow: hidden;*/
  /*overflow-y: auto;*/
}
.panel-right-pro {
  height: 70%;
}
</style>
