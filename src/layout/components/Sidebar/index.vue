<template>
    <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="menubg"
                :text-color="variables.menuText"
                :unique-opened="true"
                active-text-color="#fff"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route,index) in activeRouter"
                    :key="index"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["activeRouter", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        theme:{
          get() {
          return this.$store.state.settings.theme
          }
        },
        menubg(){
          if(this.theme == '#015DB2'){
            return '#0D1E3E'
          }else{
            return '#0E1E3E'
          }
        },
        variables() {

            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    }
};
</script>
