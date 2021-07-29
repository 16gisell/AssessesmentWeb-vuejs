import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./views/layout/AppHeader.vue";
import AppFooter from "./views/layout/AppFooter.vue";
import Home from "./views/component/home.vue";
import Listar from "./views/component/listar.vue";
import Ticket from "./views/component/tikets.vue";

Vue.use(Router);

export default new Router({
    linkExactiveClass:"active",
    routes:[
        {
            path:'/',
            name: 'Home',
            components:{
                header:AppHeader,
                default:Home,
            }
        },
        {
            path:'/listar',
            name: 'Listar',
            components:{
                header:AppHeader,
                default:Listar,
            }
        },
        {
            path:'/Ticket',
            name: 'Ticket',
            components:{
                header:AppHeader,
                default:Ticket,
            }
        }
    ],
    scrollBehavior: to =>{
        if(to.hash){
            return { 
                selector: to.hash
            };
        }
        else{
            return {
                x:0,
                y:0
            };
        }
    }
})