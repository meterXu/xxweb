<template>
  <div id="app">
    <XXWebBox :appConfig="project" :permission="permission"></XXWebBox>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      project:{
        namespace: "newsso",
        mainSys:true,
        index:10,
        style: {
          theme: 'vue-admin',
          color: '#1890FF',
          layout: 'sidemenu',
          multipage: true,
          colorWeak: false,
          fixedHeader: false,
          fixSiderbar: false,
          autoHideHeader: false,
        },
        config: {
          "logo": "./static/imgs/logo-white.png",
          "title": "沃壤赋能平台",
          "login": {
            "title": "沃壤赋能平台",
            "desc": ""
          },
          "head": {
            "title": {
              "desktop": "欢迎进入沃壤赋能平台",
              "mobile": "沃壤赋能"
            },
            "searchMenu": {
              "show": true
            },
            "helper": {
              "show": false,
              "href": "javascript:;",
              "target": "_blank"
            }
          },
          "sideMenu": {
            "title": "沃壤赋能",
            "width": '200px'
          },
          "footer": {
            "links": [],
            "copyright": {
              "content": "苏州工业园园区测绘地理信息有限公司",
              "year": "2021",
              "href": "http://www.dpark.com.cn",
              "target": "_blank"
            }
          },
          "plugins": {
            "changeSystem": {
              "enable": true
            }
          }
        }
      },
      permission:[{
        path: '/page/',
        name: 'page',
        meta: { title: '系统页面', icon: 'appstore' },
        children: [
          {
            path: '/page/1',
            name: 'page_1',
            meta: {
              title: '页面1',
              icon: 'project'
            }
          },
          {
            path: '/page/2',
            name: 'page_2',
            meta: {
              title: '页面2',
              icon: 'project'
            }
          },
          {
            path: '/page/3',
            name: 'page_3',
            meta: {
              title: '页面3',
              icon: 'project'
            }
          },
          {
            path: '/page/4',
            name: 'page_4',
            meta: {
              title: '页面4',
              icon: 'project'
            }
          }
        ]
      }]
    }
  }
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
