<template>
  <data-form :title="'Danh sách extent role'">
      <div style="display: inline-block; float: left;">
        <button class="btn-add-time btn btn-primary btn-sm" @click="showAddRole()">Thêm extent role</button>
        <div class="div-list-role">
          <div :class="'role-item ' + (current_role_id == item.id ? 'selected-item' : '')" v-for="(item, index) in list_role.items" v-bind:key="index">
            <div @click="loadPermission(item.id)" class="name-role">{{item.name}}</div>
            <div class="btn-role">
              <dropdown>
                <!-- <li>
                  <a @click="showEditRole(item.id)">Chỉnh sửa</a>
                </li> -->
                <li>
                  <a @click="deleteRole(item.id)">Xóa</a>
                </li>
              </dropdown>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5>Module Access</h5>
        <div class="div-list-permission">
          <table class="table-permission">
            <tbody>
              <tr v-for="(item, index) in listRolePermissions" v-bind:key="index">
                <td>
                  {{item.name}}
                </td>
                <td>
                  {{item.title}}
                </td>
                <td>
                  <checkbox-switch
                    @click="changeStatePermission(item)"
                    :checked="item.has_add"
                    :model="item.has_add"
                  ></checkbox-switch>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table-detail">
            <thead>
              <tr>
                  <th data-priority="1">Module Permission</th>
                  <th data-priority="1">Create</th>
                  <th data-priority="1">Read</th>
                  <th data-priority="1">Update</th>
                  <th data-priority="1">Delete</th>
                  <th data-priority="1">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listRolePermissions" v-bind:key="index">
                <td>
                  {{item.name}}
                </td>
                <td>
                  <label class="checkbox-container">
                    <input type="checkbox" :checked=" (getValueDetails(item.list_details,'create') == 1) ? 'checked' : ''" @click="updateDetails('create',item.id,item.list_details)" >
                    <span class="checkmark-box"></span>
                  </label>
                </td>
                <td>
                  <label class="checkbox-container">
                    <input type="checkbox" :checked=" (getValueDetails(item.list_details,'read') == 1) ? 'checked' : ''" @click="updateDetails('read',item.id,item.list_details)" >
                    <span class="checkmark-box"></span>
                  </label>
                </td>
                <td>
                  <label class="checkbox-container">
                    <input type="checkbox" :checked=" (getValueDetails(item.list_details,'update') == 1) ? 'checked' : ''" @click="updateDetails('update',item.id,item.list_details)" >
                    <span class="checkmark-box"></span>
                  </label>
                </td>
                <td>
                  <label class="checkbox-container">
                    <input type="checkbox" :checked=" (getValueDetails(item.list_details,'delete') == 1) ? 'checked' : ''" @click="updateDetails('delete',item.id,item.list_details)" >
                    <span class="checkmark-box"></span>
                  </label>
                </td>
                <td>
                  ...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <model modelwidth="50%" :is-open.sync="showadd" title="Thêm Extend Role">
        <template v-slot:body>
          <div class="row">
            <div class="col-md-12 m-b-10">
                <div class="form-group">
                  <div class="col-md-4">
                    <label style class="control-label">Tên Role</label>
                  </div>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="role_item.name" />
                  </div>
              </div>
            </div>
            <div class="col-md-12 m-b-10">
                <div class="form-group">
                  <div class="col-md-4">
                    <label style class="control-label">Fix Role</label>
                  </div>
                  <div class="col-md-8">
                    <el-select  v-model="role_item.fix_role">
                      <el-option
                        v-for="value in listFixRole"
                        :key="value.id"
                        :value="value"
                        :label="value.name"
                      ></el-option>
                    </el-select>
                </div>
              </div>
            </div>
                <div class="col-sm-12">
                  <div class="col-xs-12">
                    <button
                      @click="addRoleItem()"
                      type="button"
                      :disabled="loading"
                      class="pull-right btn btn-danger m-b-8"
                    >
                      Cập nhật
                    </button>
                  </div>
              </div>
          </div>
        </template>
      </model>
      <model modelwidth="50%" :is-open.sync="showedit" title="Chỉnh sửa Extend Role">
        <template v-slot:body>
          <edit-info v-if="current_uuid" :object_uuid="current_uuid"></edit-info>
        </template>
      </model>
  </data-form>
</template>

<script>
import filterMixin from "~/mixins/filters";
import { mapGetters, mapActions } from "vuex";
import general from "~/mixins/general";
import Util from "@/util";

export default {
  layout: "app",
  computed: {
    ...mapGetters({
      list_role: "permission/getListRole"
    })
  },
  mixins: [filterMixin, general],
  data() {
    return {
      loading: false,
      listFixRole:[],
      listRolePermissions: [],
      params: {
        name: { value: null },
        page: { value: 1 },
        page_size: { value: 10 }
      },
      showadd : false,
      showedit : false,
      role_item : {
        id: null,
        name : null,
        fix_role : null
      },
      current_role_id : null
    };
  },
  async mounted() {
    let params = {};
    for (var row in this.params) {
      params[row] = this.params[row].value =
        this.$route.query[row] !== undefined
          ? this.$route.query[row]
          : this.params[row].value
          ? this.params[row].value.uuid !== undefined
            ? this.params[row].value.uuid
            : this.params[row].value
          : null;
    }
    if (this.list_role.items.length == 0) {
      await this.loadData(params);
    } else {
      this.$setParamsUrl(params);
    }
    if(this.list_role.items.length > 0){
      this.current_role_id = this.list_role.items[0].id;
      this.loadListRolePermissions(this.current_role_id);
    }
    this.listFixRole = await this.getListFixRole();
    // this.listFixRole = this.listFixRole.map(x => {return x.name});
    if(this.listFixRole.length > 0){
      this.role_item.fix_role = this.listFixRole[0];
    }
  },
  methods: {
    ...mapActions({
      getListRole: "permission/getListRole",
      getListRolePermissions : "permission/getListPermissionsOfRole",
      getListFixRole : "permission/getListFixRole",
      addRole: "permission/addRole",
      updateRole: "permission/updateRole",
      deleteRole: "permission/deleteRole",
      addPermissionToRole:"permission/addPermissionToRole",
      deletePermissionOfRole:"permission/deletePermissionOfRole",
      updateRoleDetials: "permission/updateRoleDetials",
    }),
    getValueDetails(list,name) {
      let item  = list.find(element => element.name ==  name);
      if(item)
        return item.value;
      else
        return 0;
    },
    async submitForm(page = 0) {
      this.loading = true;
      let data = {};

      for (var row in this.params) {
        data[row] = this.params[row].value
          ? this.params[row].value.uuid !== undefined
            ? this.params[row].value.uuid
            : this.params[row].value
          : null;
      }
      if (page) {
        this.params.page.value = data.page = page;
      }
      this.loadData(data);
    },
    async loadListRolePermissions(role_id) {
      this.current_role_id = role_id;
      this.listRolePermissions = await this.getListRolePermissions({role_id : role_id});
    },
    async loadData(data) {
      this.$setParamsUrl(data);
      await this.getListRole(data);
      this.loading = false;
    },
    async loadPermission(id){
      this.loadListRolePermissions(id);
    },
    showAddRole(){
      this.showadd = true;
    },
    async addRoleItem(){
      await Util.showConfirm(this);
      let fix_role_id = this.role_item.fix_role.id;
      await this.addRole({
        params: {
          fix_role_id: fix_role_id,
          name: this.role_item.name
        },
        callback: {
          success: res => {
            this.$Notification({
                        type: "success",
                        title: "Thành công",
                        message: `Thêm extent role thành công`
                      });
            this.submitForm();
          },
          error: res => {
            this.$Notification({
                        type: "error",
                        title: "Thất bại",
                        message: "Thêm extent role thất bại"
                      });
          }
        }
      });
    },
    async updateRoleItem(){
      await Util.showConfirm(this);
      let fix_role_id = this.role_item.fix_role.id;
      await this.updateRole({
        params: {
          id: this.role_item.id,
          fix_role_id : fix_role_id,
          name : this.role_item.name,
        },
        callback: {
          success: res => {
            this.$Notification({
                        type: "success",
                        title: "Thành công",
                        message: `Cập nhật extent role thành công`
                      });
            this.submitForm()
          },
          error: res => {
            this.$Notification({
                        type: "error",
                        title: "Thất bại",
                        message: "Cập nhật extent role thất bại"
                      });
          }
        }
      });
    },
    async deleteRole(role_id){
      await Util.showConfirm(this);
      await this.addRole({
        params: {
          id: role_id
        },
        callback: {
          success: res => {
            this.$Notification({
                        type: "success",
                        title: "Thành công",
                        message: `Xóa extent role thành công`
                      });
            this.submitForm()
          },
          error: res => {
            this.$Notification({
                        type: "error",
                        title: "Thất bại",
                        message: "Xóa extent role thất bại"
                      });
          }
        }
      });
    },
    async changeStatePermission(item){
      // await Util.showConfirm(this);
      item.has_add = item.has_add == false;
      if(item.has_add){
        await this.addPermissionToRole({
          params: {
            role_id: this.current_role_id,
            permission_id : item.id
          },
          callback: {
            success: async res => {
              this.$Notification({
                          type: "success",
                          title: "Thành công",
                          message: `Thêm quyền thành công`
                        });
              this.listRolePermissions = await this.getListRolePermissions({role_id : this.current_role_id});
            },
            error:  async res => {
              this.$Notification({
                          type: "error",
                          title: "Thất bại",
                          message: "Thêm quyền thất bại"
                        });
              this.listRolePermissions = await this.getListRolePermissions({role_id : this.current_role_id});
            }
          }
        });
      }
      else{
        await this.deletePermissionOfRole({
          params: {
            role_id: this.current_role_id,
            permission_id : item.id
          },
          callback: {
            success: async res => {
              this.$Notification({
                          type: "success",
                          title: "Thành công",
                          message: `Xóa quyền thành công`
                        });
              this.listRolePermissions = await this.getListRolePermissions({role_id : this.current_role_id});
            },
            error: async res => {
              this.$Notification({
                          type: "error",
                          title: "Thất bại",
                          message: "Xóa quyền thất bại"
                        });
              this.listRolePermissions = await this.getListRolePermissions({role_id : this.current_role_id});
            }
          }
        });
      }
    },
    async updateDetails (name,permission_id,listDetails){
      let value = this.getValueDetails(listDetails,name);
      let current_value = value == 0 ? 1 : 0;
      await this.updateRoleDetials({
          params: {
            role_id: this.current_role_id,
            permission_id : permission_id,
            name: name,
            value: current_value
          },
          callback: {
            success: async res => {
              this.$Notification({
                          type: "success",
                          title: "Thành công",
                          message: (value == 0 ? 'Thêm' : 'Xóa') + ` quyền `+ name + ` thành công`
                        });
              this.listRolePermissions = await this.getListRolePermissions({role_id : this.current_role_id});
            },
            error: async res => {
              this.$Notification({
                          type: "error",
                          title: "Thất bại",
                          message: (value == 0 ? 'Thêm' : 'Xóa') + ` quyền `+ name + ` thất bại`
                        });
              this.listRolePermissions = await this.getListRolePermissions({role_id : this.current_role_id});
            }
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.row{
  width : 100%;
}
.div-list-role{
    width: 200px;
    margin: 10px;
    border: 1px solid #b1b1b1;
    .role-item{
      padding: 7px;
      height: 40px;
      line-height: 26px;
      border-bottom: 1px solid #b1b1b1;
      .name-role{
        display: inline-block;
        font-size: 14px;
        cursor: pointer;
        font-weight: 600;
      }
      .btn-role{
        float: right;
      }
    }
    .selected-item{
      background-color: #007feb;
    }
    
}
.table-permission{
  width: calc(100% - 250px);
  margin: 10px;
  border: 1px solid #b1b1b1;
  border-radius: 10px;
  border-collapse: separate;
  td{
    padding-left: 10px;
  }
}
.table-detail{
  width: calc(100% - 250px);
  margin: 10px;
  border: 1px solid #b1b1b1;
  border-radius: 10px;
  border-collapse: separate;
  margin-right: 30px;
  float: right;
  overflow: hidden;
  thead{
    tr{
      height: 36px;
      padding: 5px;
      background-color: #e2e2e2;
      th{
        padding: 5px;
      }
    }
  }
  td{
    padding-left: 10px;
    padding: 8px;
  }
}
.checkbox-container {
  margin-top: -12px;
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark-box {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border: 1px solid #2196F3;
}
.checkbox-container:hover input ~ .checkmark-box {
  background-color: #ccc;
}
.checkbox-container input:checked ~ .checkmark-box {
  background-color: #2196F3;
}
.checkmark-box:after {
  content: "";
  position: absolute;
}
.checkmark-box:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid #2196F3;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.checkbox-container input:checked ~ .checkmark-box:after {
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>