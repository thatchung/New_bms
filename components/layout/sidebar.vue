<template>
  <div>
    <div class="topbar">
      <div class="topbar-left">
        <div class="logo">
          <a href="/">
            <img style="height: 40px; margin-top:3px;" src="/images/logo_text.png" ratio="16-9" />
          </a>
        </div>

        <div class="card-box">
          <div class="member-card">
            <div class="display-flex align-items">
              <div class="thumb-md member-thumb" style="margin-right: 8px;">
                <img
                  style="width: 50px; height: 50px; padding: 1px; object-fit:cover;"
                  :src="$store.state.common.profile ? $store.state.common.profile.avatar : '/images/logo.png' "
                  class="img-circle img-thumbnail"
                  alt="profile-image"
                />
              </div>
              <div style="text-align:left;">
                <nuxt-link
                  to="/profile"
                >{{$store.state.common.profile ? $store.state.common.profile.name : ''}}</nuxt-link>

                <a
                  href="javascript:void(0)"
                  @click="onLogout()"
                  class="display-flex align-items m-t-5"
                >
                  <i style="font-size: 12px; margin-right: 3px;" class="mdi mdi-logout-variant"></i>
                  Logout
                </a>
              </div>
            </div>
          </div>
          <!-- end membar card -->
        </div>

        <!-- <div>
          <el-input
            clearable
            v-model="search"
            @change.native="searchFuntion"
            @input="searchFuntion"
            class="form-control input-search-sidebar"
            placeholder="Tìm kiếm..."
          ></el-input>
        </div> -->
      </div>
    </div>
    <no-ssr>
      <div class="left side-menu">
        <div class="sidebar-inner slimscrollleft">
          <div id="sidebar-menu" role="tablist" aria-multiselectable="true">
            <ul>
              <li
                :id="`sectionHeaderId-${index}`"
                class="menu-title"
                v-for="(item,index) in menus"
                :key="`item-${index}`"
              >
                <a
                  :href="`#sectionContentId-${index}`"
                  aria-expanded="true"
                  :aria-controls="`sectionContentId-${index}`"
                  class
                >
                  {{item.title}}
                </a>
                <ul
                  :id="`sectionContentId-${index}`"
                  role="tabpanel"
                  :aria-labelledby="`sectionHeaderId-${index}`"
                >
                  <li v-for="(child_item,idx) in item.children" :key="`child-item-${idx}`">
                    <template v-if="child_item.type === 'link' && !child_item.group">
                      <NuxtLink
                        :to="child_item.path"
                        :class="isActivedMenu(child_item) ? 'waves-effect active' : 'waves-effect' "
                      >
                        <i
                          :class="child_item.icon !== undefined ? child_item.icon : 'mdi mdi-view-dashboard'"
                        ></i>
                        <span>{{child_item.title}}</span>
                      </NuxtLink>
                    </template>

                    <template v-if="child_item.group">
                      <a
                        href="javascript:void(0);"
                        :class="isActivedParent(child_item) ? 'waves-effect parent-menu subdrop' : 'waves-effect parent-menu'"
                      >
                        <i
                          :class="child_item.icon !== undefined ? child_item.icon : 'mdi mdi-view-dashboard'"
                        ></i>
                        <span>{{child_item.title}}</span>
                        <span v-if="child_item.group" class="menu-arrow"></span>
                      </a>

                      <ul
                        class="list-unstyled"
                        v-if="child_item.group"
                        :style="isActivedParent(child_item) ? 'display: block' : '' "
                      >
                        <li v-for="(child_item,j) in child_item.children" :key="`child_item-${j}`">
                          <NuxtLink
                            :class="isActivedMenu(child_item) ? ' active' : '' "
                            :to="child_item.path"
                          >
                            <span>{{child_item.title}}</span>
                          </NuxtLink>
                        </li>
                      </ul>
                    </template>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import groupmenu from "../../plugins/groupmenu.js";
import Util from "@/util/index.js";

export default {
  name: "layout-sidebar",
  computed: {
    title: function() {}
  },
  data: () => ({
    menus: null,
    search: null
  }),
  methods: {
    onLogout: async function() {
      await Util.showConfirm(this);
      this.$store.commit("common/clearSession");
      this.$router.push("/login");
    },
    isActivedParent: function(menu) {
      let link = this.$route.path
        .trim()
        .toLowerCase()
        .split("/");

      let check =
        link.length > 1
          ? menu.path.indexOf("/" + link[1]) > -1
          : menu.path.indexOf(this.$route.path.trim().toLowerCase()) > -1;
      return check;
    },
    isActivedMenu: function(menu) {
      if (!menu.group) {
        let link = this.$route.path
          .trim()
          .toLowerCase()
          .split("/");
        let menuParse = menu.path
          .trim()
          .toLowerCase()
          .split("?");

        let check =
          link.length > 1
            ? "/" + link[1] === menuParse[0]
            : this.$route.path.trim().toLowerCase() === menuParse[0];
        return check;
      } else {
        return false;
      }
    },
    searchFuntion: async function() {
      this.menus = await this.getmenu();
    },
    getmenu: async function() {
      let parentMenus = [];
      let childMenus = [];
      let self = this;
      // self.$store.state.common.profile.permission = JSON.parse(self.$store.state.common.profile.permission);
      for (let group of groupmenu) {
        if (!self.$store.state.common.profile.is_root) {
          if (!self.$store.state.common.profile.permission) {
            break;
          }
          if (
            group.permission &&
            !self.$store.state.common.profile.permission.includes(
              group.permission
            )
          ) {
            continue;
          }
        }

        let labelMenu = {
          type: "label",
          name: group.name,
          title: group.title
        };
        await parentMenus.push(labelMenu);

        if (group.children) {
          let childrenMenus = [];
          group.children.forEach(item => {
            if (!item.permission) {
              if (
                !item.hidden &&
                (!this.search ||
                  (this.search &&
                    item.title
                      .toLowerCase()
                      .includes(this.search.toLowerCase())))
              ) {
                childrenMenus.push({
                  type: "link",
                  icon: item.icon,
                  title: item.title,
                  path: item.path,
                  group: item.group ? item.group : false,
                  children: item.children ? item.children : [],
                  parent: group.name
                });
              }
            } else {
              if (!item.hidden) {
                if (self.$store.state.common.profile.is_root) {
                  if (
                    !this.search ||
                    (this.search &&
                      item.title
                        .toLowerCase()
                        .includes(this.search.toLowerCase()))
                  ) {
                    childrenMenus.push({
                      type: "link",
                      icon: item.icon,
                      title: item.title,
                      path: item.path,
                      group: item.group ? item.group : false,
                      children: item.children ? item.children : [],
                      parent: group.name
                    });
                  }
                } else {
                  let hasRole = false;
                  if (
                    self.$store.state.common.profile.permission != null &&
                    !Array.isArray(item.permission) &&
                    self.$store.state.common.profile.permission.includes(
                      item.permission
                    )
                  ) {
                    hasRole = true;
                  } else if (
                    self.$store.state.common.profile.permission != null &&
                    Array.isArray(item.permission)
                  ) {
                    var check = self.$store.state.common.profile.permission.filter(
                      val => {
                        return item.permission.indexOf(val) != -1;
                      }
                    );
                    if (check.length > 0) {
                      hasRole = true;
                    }
                  }
                  if (hasRole) {
                    if (
                      !this.search ||
                      (this.search &&
                        item.title
                          .toLowerCase()
                          .includes(this.search.toLowerCase()))
                    ) {
                      let list_child = [];
                      if (item.children) {
                        list_child = item.children.filter(x => {
                          return (
                            self.$store.state.common.profile.permission.indexOf(
                              x.permission
                            ) != -1
                          );
                        });
                      }

                      childrenMenus.push({
                        type: "link",
                        icon: item.icon,
                        title: item.title,
                        path: item.path,
                        group: item.group ? item.group : false,
                        children: list_child,
                        parent: group.name
                      });
                    }
                  }
                }
              }
            }
          });

          childMenus = await childMenus.concat(childrenMenus);
        }
      }

      parentMenus.forEach(function(parentMenu) {
        let array = [];
        childMenus.forEach(function(childMenu) {
          if (childMenu.parent === parentMenu.name) {
            array.push(childMenu);
          }
        });
        parentMenu.children = array;
      });
      parentMenus = parentMenus.filter(x => {
        return x.children.length > 0;
      });

      return parentMenus;
    },
    checkReturn: async function() {
      if (!this.search || this.search == "") {
        this.menus = await this.getmenu();
      }
    }
  },
  created: async function() {
    let self = this;

    this.menus = await this.getmenu();
  }
};
</script>

<style lang="scss">
.left.side-menu {
  position: fixed;
  top: 162px;
  left: 0;
  height: calc(100vh - 162px);
  overflow-y: scroll;
}
.topbar {
  .logo {
    a {
      width: 50%;
      display: block;
      margin: 0 auto;
      img {
        object-fit: contain !important;
      }
    }
  }
  .navbar-default {
    height: 70px;
  }
  .topbar-left {
    height: unset;
    .input-search-sidebar {
      width: 90%;
      margin: 0 auto;
      display: block;
      padding: 0;
      margin-bottom: 12px;
      input {
        text-align: left;
        font-size: 12px;
        border: unset;
        &:focus {
          border: unset;
        }
      }
    }
  }
  .card-box {
    background: #556780;
    border-radius: 0;
    padding: 12px;
    border: unset;
    .member-card {
      a {
        color: #fff;
        &:hover {
          color: #ff8000;
        }
      }
    }
  }
}
</style>
