<template>
    <div class="wrapper" style="overflow-y: auto;height: auto">
        <layout-header></layout-header>
        <layout-sidebar></layout-sidebar>

        <div class="content-wrapper" style="min-height: 1500px !important;margin-left: 200px;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import LayoutHeader from '~/components/layout-header'
    import LayoutSidebar from '~/components/layout-sidebar'
    

    export default {
        name: 'Layout',

        components: {
            LayoutHeader,
            LayoutSidebar
        },

        mounted: function () {
            $(window).trigger('resize');
           

            }
    }
</script>

<style lang="scss" scoped>
    .content-wrapper{
        min-height: 1500px !important
    }
</style>