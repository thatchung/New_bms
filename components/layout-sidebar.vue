<template>
    <div class="main-sidebar" style="width: 200px;">
        <div class="sidebar">
            <form class="sidebar-form" @submit.prevent>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Tìm kiếm..." v-model="search">
                    <span class="input-group-btn">
                        <button type="submit" name="search" id="search-btn" class="btn btn-flat">
                            <i class="fa fa-search"></i>
                        </button>
                    </span>
                </div>
            </form>

            <ul class="sidebar-menu">
                <li v-for="item in menus"
                    :class="{header: item.type === 'label', actived: item.type === 'link' && isActivedMenu(item)}">
                    <span class="span-group-title" v-if="item.type === 'label'">{{item.title}}</span>

                    <router-link :to="item.path" v-if="item.type === 'link'">
                        <span>{{item.title}}</span>
                    </router-link>
                    <div  v-if="item.numcount > 0" style="position: absolute;right: 10px;top: 10px;width: 25px;height: 25px;background-color: #b20d0d;border-radius: 5px;text-align: center;color: white;font-size: 15px;font-weight: 600;padding: 2px;">{{item.numcount}}</div>
                </li>
            </ul>
        </div>
        <div @click="closealarm" class="modal-popup-sumary" v-if="showpopup">
            <div class="content-sum">
                <div class="col-md-12 col-lg-12">
                    <h3>Alarm Number</h3>
                </div>
                <div @click="viewalarm" class="col-md-4 col-lg-4">
                    <div class="info-box">
                        <span class="info-box-icon bg-red">
                            <i class="fa fa-bolt"></i>
                        </span>
                        <div class="info-box-content">
                            <span class="info-box-text">Unit Vol Limit</span>
                            <span class="info-box-number">
                                {{summary.num_vol}}
                            </span>
                        </div>
                    </div>
                </div>
                <div @click="viewalarm" class="col-md-4 col-lg-4">
                    <div class="info-box">
                        <span class="info-box-icon bg-blue">
                            <i class="fa fa-thermometer-empty"></i>
                        </span>
                        <div class="info-box-content">
                            <span class="info-box-text">Unit Temp Limit</span>
                            <span class="info-box-number">
                                {{summary.num_temp}}
                            </span>
                        </div>
                    </div>
                </div>
                <div @click="viewalarm" class="col-md-4 col-lg-4">
                    <div class="info-box">
                        <span class="info-box-icon bg-green">
                            <i class="fa fa-cubes"></i>
                        </span>
                        <div class="info-box-content">
                            <span class="info-box-text">Unit Res Limit</span>
                            <span class="info-box-number">
                                {{summary.num_res}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import routerMenus from '../../router/menus'
    import ModalNotifiCall from '../component/modal/cc-notificationCall'
    
    export default {
        name: 'LayoutSidebar',

        data: () => ({
            search: null,
            userInfo:{
                id:null,
            },
            listInCall:[],
            menus:null,
            listalarm_sumary:[],
            summary:{
                num_vol:0,
                num_temp:0,
                num_res:0
            },
            showpopup:false,
        }),
        dependencies : ['reloadDataCCService'],
        computed: {
        },

        methods: {
            isActivedMenu: function (menu) {
                return this.$route.name.trim().toLowerCase() === menu.name.trim().toLowerCase();
            },
            loadAlarmPopup: async function () {
                let res = await this.$api.get({
                    url: 'alarm_load_summery',
                });

                if (res.meta.success) {
                    this.listalarm_sumary = res.data;
                   
                    this.summary.num_vol = this.listalarm_sumary.filter(obj => { return obj.statealarm === "Vol_limit_max"  || obj.statealarm === "Vol_limit_min" }).length;
                    this.summary.num_temp = this.listalarm_sumary.filter(obj => { return obj.statealarm === "Temp_limit_max"  || obj.statealarm === "Temp_limit_min" }).length;
                    this.summary.num_res = this.listalarm_sumary.filter(obj => { return obj.statealarm === "Res_limit_max"  || obj.statealarm === "Res_limit_min" }).length;

                    if(this.summary.num_vol > 0 || this.summary.num_temp > 0 || this.summary.num_res > 0){
                        this.showpopup = true;
                        $(".modal-popup-sumary").show(200);
                    }
                    else
                        this.showpopup = false;
                } else {
                    this.$notify.error({title: 'Lỗi',message: res.error.message})
                }
            },
            viewalarm:function(){
                this.$router.push('logalarm');
            },
            closealarm:function(){
                $(".modal-popup-sumary").hide(200);
            },
        },
        created: async function () {
            
            let result = [];

            let menus = await routerMenus.filter(x => {
                if (x.requireRoot && !this.$store.state.profile.is_root)
                    return false;

                for (let permission of x.permission) {
                    if (!this.$store.state.profile.permission.includes(permission))
                        return false;
                }

                return true;
            });

            for (let menu of menus) {
                
                let labelMenu = {
                    type: 'label',
                    name: menu.name,
                    title: menu.title,
                };



                let childrenMenus = await menu.children.filter(x => {
                    if (x.requireRoot && !this.$store.state.profile.is_root)
                        return false;

                    for (let permission of x.permission) {
                        if (!this.$store.state.profile.permission.includes(permission))
                            return false;
                    }

                    return !this.search || x.title.toLowerCase().includes(this.search.toLowerCase());
                });

                childrenMenus = await Promise.all(childrenMenus.map(async item => {
                    var numcount = 0;

                    return {
                        type: 'link',
                        name: item.name,
                        title: item.title,
                        path: item.path,
                        numcount:numcount
                    }
                }));
                if (childrenMenus.length === 0)
                    continue;

                await result.push(labelMenu);
                result = await result.concat(childrenMenus);
            }
            this.menus = result;
            

            var this_vue = this;

            this.loadAlarmPopup();

            setInterval(function(){
                if(this_vue.showpopup){
                    if($('.modal-popup-sumary').is(":hidden"))
                        this_vue.loadAlarmPopup(); 
                }
            }, 
            1000 * 60 * 5);
        }

    }
</script>

<style lang="scss">
    .info-box{
        border: 1px solid #c0c4cc;
        cursor: pointer;
    }
    .modal-popup-sumary{
        position: fixed;
        width: 100pc;
        height: 100pc;
        left: 0px;
        top: 0px;
        background-color: rgba(0, 0, 0, 0.7);
        .content-sum{
            margin-left: 50%;
            transform: translate(-50%);
            margin-top: 200px;
            height: 200px;
            width: 50%;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,0);
            h3{
                text-align: center;
                margin-bottom: 15px;
                margin-top: 5px;
            }
        }
    }
    .sidebar-menu {
        & > li {
            padding-left: 20px;
            &.actived > a {
                border-left-color: #dd4b39;
            }

            &.active > a > .fa-angle-left, &.active > a > .pull-right-container > .fa-angle-left {
                animation-name: rotate;
                animation-duration: .2s;
                animation-fill-mode: forwards;
            }

            & > a {
                padding: 12px 15px 12px 15px;
            }
        }
        li {
            .span-group-title{
                font-size: 20px;
                font-weight: bold;
            }
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(-90deg);
        }
    }
</style>