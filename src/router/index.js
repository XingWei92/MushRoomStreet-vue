import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import HomeVue from '../pages/Home.vue'
import ClassifyVue from '../pages/Classify.vue'
import CartVue from '../pages/Cart.vue'
import MineVue from '../pages/Mine.vue'
import ClassifyContent from '../pages/classifyComponents/classify-content.vue'
import ClassifyContentDetail from '../pages/classifyComponents/classify-content-detail.vue'
import Mine_address from '../pages/mineComponents/mine_address.vue'
import Mine_address_add from '../pages/mineComponents/mine_address_add.vue'
import ProductDetail from '../components/productDetail.vue'
import DeatailReview from '../components/productDetailComponents/detail-review.vue'
import HomeContentApp from '../pages/homeComponents/home_content_detail/home_content_app.vue';
import HomeContentSkirtApp from '../pages/homeComponents/home_content_detail/home_skirtApp.vue'
import ClassifyProduct from '../pages/classifyComponents/classify-product.vue'
import Log_in from '../pages/mineComponents/log_in.vue'
import Registered from '../pages/mineComponents/registered.vue'
import Order_list from '../pages/mineComponents/order_list.vue'
import Mine_address_edit from '../pages/mineComponents/mine_address_edit.vue'
export default new Router({
  mode: 'history', //切换路径模式，变成history模式
  routes: [
    {path:'/',redirect:'/home'},
    // {path:'*',redirect:'/home'},
    {path:'/home',component:HomeVue},
    {path:'/classify',component:ClassifyVue,children:[
      {path:'/',redirect:'classifyContent/41888'},
      {name:'classify',path:'/classify/classifyContent/:maitKey',component:ClassifyContent}
    ]},
    {path:'/cart',component:CartVue},
    {path:'/mine',component:MineVue},
    {path:'/mine_address',component:Mine_address},
    {path:'/mine_address_add',component:Mine_address_add},
    {path:'/detail-review',component:DeatailReview},
    {name:'pruductDetail',path:'/productDetail/:iid',component:ProductDetail},
    {path:'/content0',component:HomeContentApp},
    {path:'/content1',component:HomeContentSkirtApp},
    {name:'product',path:'/classify-product/:link,title',component:ClassifyProduct},
    {path:'/log_in',component:Log_in},
    {path:'/registered',component:Registered},
    {path:'/order_list',component:Order_list},
    {path:'/mine_address_edit',component:Mine_address_edit}
  ]
})
