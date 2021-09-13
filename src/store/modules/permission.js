import { constantRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    activeRouter:[],
    keyList:[],
    activeKey:'',
    renderList:[]
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = routes
    },
    SET_KEYLIST:(state, list) => {
      state.keyList = list
    },
    SET_KEY:(state, key) => {
      state.activeKey = key
    },
    SET_RENDERLIST:(state,list) => {
      state.renderList = list
    },
    SET_ACTIVEROUTER:(state,routers) =>{
      state.activeRouter = constantRoutes.concat(routers)
    }
  },
  actions: {
    // 生成路由
    ToggleSystem({commit,rootState},active){
       commit('SET_KEY',active)
       let router = rootState.permission.routes.filter(item => item.system == active||!item.system)
       commit('SET_ACTIVEROUTER', router)
    },
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          const accessedRoutes = filterAsyncRouter(res.data)

          let arr = []
          let renderArr = []
          res.data.map(item =>{
            arr.push(item.system)
            renderArr.push({
              system:item.system,
              path:item.path.split('/')[1]
            })
          })

          commit('SET_RENDERLIST',renderArr)
          commit('SET_KEYLIST', [...new Set(arr)])
          let routerName = window.location.pathname.split('/')[1]
          let nowactive = ''
          if(renderArr.find(item => item.path == routerName)){ //根据当前页面的路由去解析当前高亮的system，如果是登录页等特殊页面直接取权限内的第一个system
             nowactive = renderArr.find(item => item.path == routerName).system
          }else{
            nowactive = arr[0]
          }
           commit('SET_KEY',nowactive)

          accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
          let activeRouter = accessedRoutes.filter(item => item.system == nowactive||!item.system)

          commit('SET_ACTIVEROUTER', activeRouter)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
      })
    }
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) =>  require([`@/views/${view}`], resolve)
}

export default permission
