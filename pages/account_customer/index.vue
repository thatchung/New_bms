<template>
  <div>
    <data-list :has-btn="false">
      <template v-slot:breadcrumb>
        <breadcrumb title="Danh sách tài khoản khách hàng"></breadcrumb>
      </template>

      <template v-slot:filter>
        <div class="btn btn-primary waves-effect waves-light m-b-20" @click="addNewAccount()" >
            <i class="mdi mdi-account-multiple-plus m-r-5"></i>
            <span>Thêm tài khoảng khách hàng</span>
          </div>
        <filter-panel :value="params" @submit="submitForm(1)">
          <div class="row">
            <filter-item field="name" title="Tên" item-class="col-sm-12 col-md-6">
              <el-input slot-scope="{data}" v-model="data.value" clearable></el-input>
            </filter-item>
            <filter-item field="status" title="Trạng thái" item-class="col-sm-12 col-md-6">
              <el-select slot-scope="{data}" v-model="data.value" clearable>
                <el-option
                  v-for="value in ['active','inactive']"
                  :key="value"
                  :value="value"
                  :label="value | stateFilter"
                ></el-option>
              </el-select>
            </filter-item>
          </div>
        </filter-panel>
      </template>

      <template v-slot:table>
        <table-view v-model="list_account" @load="submitForm">
          <thead>
            <tr>
              <th data-priority="0">ID</th>
              <th data-priority="1">Name</th>
              <th data-priority="1" class="text-center">Avatar</th>
              <th data-priority="1">Loại account</th>
              <th data-priority="1">Link FB</th>
              <th data-priority="1" class="text-center">Hành động</th>
            </tr>
          </thead>
          <loading-item :loading="loading"></loading-item>
          <tbody>
            <tr v-for="(item, index) in list_account.items" v-bind:key="index">
              <td>
                {{item.id}}
              </td>
              <td>
                {{item.name}}
              </td>
              <td width="150px">
                <div class="center-image">
                  <Thumbnail class="table-img-avatar" :src="item.avatar_link" ratio="1-1" />
                </div>
              </td>
              <td width="25%">{{item.role_name}}</td>
              <td>
                <a :href="item.note" target="_blank">{{ item.facebook }}</a>
              </td>
              <td class="text-center">
                <div class="btn btn-primary waves-effect waves-light m-b-20" @click="showEdit(item)" >
                  Cập nhật
                </div>
                <div class="btn btn-primary waves-effect waves-light m-b-20" @click="showListPage(item)" >
                  Danh sách trang
                </div>
                <!-- <dropdown>
                  <li>
                    <a @click="showEdit(item)">Cập nhật</a>
                  </li>
                  <li>
                    <a @click="lockUser(item.id)">Khóa</a>
                    <a @click="unlockUser(item.id)">Mở Khóa</a>
                  </li>
                </dropdown> -->
              </td>
            </tr>
          </tbody>
        </table-view>
      </template>
      <template v-slot:popup>
        <model :is-open.sync="isShowAdd" modelwidth="70%"
          :title="editMode == 'add' ? 'Thêm Mới Tài Khoản' : 'Thông tin tài khoảng'" >
          <template v-slot:body>
            <tabs :options="{ useUrlFragment: true }" >
              <tab id="item-info" name="Chi Tiết">
                <div class="row m-t-10">
                  <div class="col-md-12">
                    <div class="col-md-3">
                      <label for>Tên:</label>
                      <span class="text-danger">*</span>
                    </div>
                    <div class="col-md-9">
                      <el-input v-model="form.name" placeholder="Tên" clearable></el-input>
                    </div>
                  </div>
                </div>
                <div class="row m-t-10">
                  <div class="col-md-12">
                    <div class="col-md-3">
                      <label for>Username:</label>
                      <span class="text-danger">*</span>
                    </div>
                    <div class="col-md-9" v-if="editMode == 'add'">
                      <el-input v-model="form.username" placeholder="Username" clearable></el-input>
                    </div>
                    <div class="col-md-9" v-if="editMode == 'edit'">
                      {{form.username}}
                    </div>
                  </div>
                </div>
                <div class="row m-t-10" v-if="editMode == 'add'">
                  <div class="col-md-12">
                    <div class="col-md-3">
                      <label for>Key Account:</label>
                      <span class="text-danger">*</span>
                    </div>
                    <div class="col-md-9">
                      <select-list
                        v-model="key_account"
                        :numget="15"
                        :value.sync="key_account"
                        :searchname="'name'"
                        :name="'account/list?status=active&fix_role_id=2&manager_id='+ profile.id"
                        placeholder="Chọn quản lý"
                      ></select-list>
                    </div>
                  </div>
                </div>
                <div class="row m-t-10">
                  <div class="col-md-12">
                    <div class="col-md-3">
                      <label for>Trạng thái:</label>
                    </div>
                    <div class="col-md-9">
                      <select v-model="form.status" class="form-control">
                        <option
                          v-for="value in ['active','inactive']"
                          :key="value"
                          :value="value"
                          :label="value | stateFilter"
                        ></option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row m-t-10">
                  <div class="col-md-12">
                    <div class="col-md-3">
                      <label for>Phone:</label>
                    </div>
                    <div class="col-md-9">
                      <el-input v-model="form.phone" placeholder="phone"></el-input>
                    </div>
                  </div>
                </div>
                <div class="row m-t-10">
                  <div class="col-md-12">
                    <div class="col-md-3">
                      <label for>Email:</label>
                      <span class="text-danger">*</span>
                    </div>
                    <div class="col-md-9">
                      <el-input v-model="form.email" placeholder="email"></el-input>
                    </div>
                  </div>
                </div>
                <div class="row m-t-10">
                  <div class="col-md-12">
                    <div class="col-md-3">
                      <label for>Facebook Link:</label>
                    </div>
                    <div class="col-md-9">
                      <el-input v-model="form.facebook" placeholder="FB profile"></el-input>
                    </div>
                  </div>
                </div>
                <div class="row m-t-10">
                  <div class="col-md-12">
                    <div class="col-md-3">
                      <label for>Mã khách hàng:</label>
                      <span class="text-danger">*</span>
                    </div>
                    <div class="col-md-9">
                      <el-input v-if="editMode == 'add'" v-model="form.id_code" placeholder="Mã khách hàng"></el-input>
                      <label v-if="editMode == 'edit'">{{form.id_code}}</label>
                    </div>
                  </div>
                </div>
                <div class="row m-t-10">
                  <div class="col-md-12">
                    <div class="col-md-3">
                      <label for>Avatar:</label>
                    </div>
                    <div class="col-md-3">
                      <image-link
                        :link.sync="form.avatar_link"
                        :imageradius="5"
                        :image-width="200"
                        :image-height="150"
                      ></image-link>
                    </div>
                  </div>
                </div>
              </tab>
              <tab id="permission-info" name="Phân quyền" v-id="current_user_id">
                <div>
                  <h5>Module Access</h5>
                  <div class="div-list-permission">
                    <table class="table-permission">
                      <tbody>
                        <tr v-for="(item, index) in listAccountPermissions" v-bind:key="index">
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
                        <tr v-for="(item, index) in listAccountPermissions" v-bind:key="index">
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
              </tab>
            </tabs>
          </template>
          <template v-slot:footer>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-xs-12">
                  <button
                    @click="createAccount()" type="button" :disabled="isLoading"
                    class="pull-right btn btn-danger" v-if="editMode == 'add'">
                    <i class="mdi mdi-content-save"></i>
                    Lưu
                    <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
                  </button>
                  <button
                    @click="editAccount()" type="button" :disabled="isLoading"
                    class="pull-right btn btn-danger"  v-if="editMode == 'edit'">
                    <i class="mdi mdi-content-save"></i>
                    Lưu
                    <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </model>
        <model :is-open.sync="isShowPage" modelwidth="80%"
          title="Danh sách trang" >
          <template v-slot:body>
          	<list-page :user_id="current_user_id"></list-page>
          </template>
      	</model>
      </template>
    </data-list>
  </div>
</template>

<script>
import Util from "@/util";
import filterMixins from "~/mixins/filters";
import { mapGetters, mapActions } from "vuex";
import ListPage from "~/components/account/list-user-page";

export default {
  layout: "app",
  mixins: [filterMixins],
  components: {
    "list-page": ListPage,
  },
  computed: {
    ...mapGetters({
      profile: "common/getProfile"
    })
  },
  filters: {
    stateFilter(state) {
      let states = {
        active: "Active",
        inactive: "Inactive"
      };

      return state in states ? states[state] : state;
    },
  },
  data: () => ({
    loading: false,
    params: {
      name: { value: null },
      status: { value: null },
      page: { value: 1 },
      page_size: { value: 10 }
    },
    list_account: {
      meta: {},
      items: []
    },
    isLoading: false,
    isShowAdd:false,
    key_account:null,
    form: {
      name:null,
      username :null,
      id_code:null,
      email:null,
      phone:null,
      password:null,
      facebook:null,
      avatar_link:'',
      status:'active',
    },
    editMode : 'add',
    isShowPage : false,
    current_user_id:null,
    listAccountPermissions: [],
  }),
  async mounted() {
    let params = {};
    for (var row in this.params) {
      params[row] = this.params[row].value =
        this.$route.query[row] !== undefined
          ? this.$route.query[row]
          : this.params[row].value
          ? this.params[row].value.id !== undefined
            ? this.params[row].value.id
            : this.params[row].value
          : null;
    }
    if (this.list_account.items.length == 0) {
      await this.loadData(params);
    } else {
      this.$setParamsUrl(params);
    }
  },
  methods: {
    ...mapActions({
      getListAccountInternal: "account/getListAccountInternal",
      addAccount: "account/addAccount",
      updateAccount: "account/updateAccount",
      getListPermissionsOfAccount: "permission/getListPermissionsOfAccount",
      AddPermissionToAccount: "permission/AddPermissionToAccount",
      deletePermissionOfAccount: "permission/deletePermissionOfAccount",
      updateAccountDetials: "permission/updateAccountDetials"
    }),
    getValueDetails(list,name) {
      let item  = list.find(element => element.name ==  name);
      if(item)
        return item.value;
      else
        return 0;
    },
    submitForm(page = 0) {
      this.loading = true;
      let data = {};

      for (var row in this.params) {
        data[row] = this.params[row].value
          ? this.params[row].value.id !== undefined
            ? this.params[row].value.id
            : this.params[row].value
          : null;
      }
      if (page) {
        this.params.page.value = data.page = page;
      }
      this.loadData(data);
    },
    async loadData(data) {
      this.$setParamsUrl(data);
      data.manager_id = this.profile.id;
      data.fix_role_id = 3;
      this.list_account = await this.getListAccountInternal(data);
      this.loading = false;
    },
    addNewAccount(){
      this.isShowAdd = true;
      this.editMode = 'add';
      this.form = {
        name:null,
        username :null,
        id_code:null,
        email:null,
        phone:null,
        password:null,
        facebook:null,
        avatar_link:'',
        status:'active',
      }
    },
    async createAccount() {
      if(!this.form.name){
        this.$Notification({
              type: "warning",
              title: "Thất bại",
              message: "Chưa chọn tên khách hàng"
            });
        return;
      }
      if(!this.form.username){
        this.$Notification({
              type: "warning",
              title: "Thất bại",
              message: "Chưa chọn username khách hàng"
            });
        return;
      }
      if(!this.form.email){
        this.$Notification({
              type: "warning",
              title: "Thất bại",
              message: "Chưa chọn email khách hàng"
            });
        return;
      }
      if(!this.form.id_code){
        this.$Notification({
              type: "warning",
              title: "Thất bại",
              message: "Chưa chọn mã khách hàng"
            });
        return;
      }
      if(!this.key_account){
        this.$Notification({
              type: "warning",
              title: "Thất bại",
              message: "Chưa chọn quản lý khách hàng"
            });
        return;
      }
      await Util.showConfirm(this);
      let params = this.form;
      params.role_id = 3;
      if(this.key_account && this.key_account.id)
        params.manager_id = this.key_account.id;
      else
        params.manager_id = this.profile.id;
      console.log(params);
      this.addAccount({
        params ,
        callback: {
          success: res => {
            this.$Notification({
              type: "success",
              title: "Thành công",
              message: "Tạo tài khoản thành công"
            });
            this.isShowAdd = false;
            this.submitForm(this.params.page.value);
          },
          error: res => {
            this.$Notification({
              type: "error",
              title: "Thất bại",
              message: "Có lỗi xảy ra"
            });
          }
        }
      });
    },
    async showEdit(item) {
      this.isShowAdd = true;
      this.current_user_id = item.id;
      this.editMode = 'edit';
      this.form = {
        id: item.id,
        name: item.name,
        username : item.username,
        id_code: item.id_code,
        email: item.email,
        phone: item.phone,
        facebook: item.facebook,
        avatar_link: item.avatar_link,
        status: item.status,
        role_name: item.role_name
      }
      await this.loadListAccountPermissions();
    },
    async editAccount() {
      await Util.showConfirm(this);
      let params = {
        id: this.form.id,
        name: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        facebook: this.form.facebook,
        avatar_link: this.form.avatar_link,
        status: this.form.status,
      };
      this.updateAccount({
        params ,
        callback: {
          success: res => {
            this.$Notification({
              type: "success",
              title: "Thành công",
              message: "Cập nhật tài khoản thành công"
            });
            this.isShowAdd = false;
            this.submitForm(this.params.page.value);
          },
          error: res => {
            this.$Notification({
              type: "error",
              title: "Thất bại",
              message: "Có lỗi xảy ra"
            });
          }
        }
      });
    },
    async showListPage(item){
    	this.isShowPage = true;
    	this.current_user_id = item.id;
    },
    async loadListAccountPermissions() {
      if(this.current_user_id)
        this.listAccountPermissions = await this.getListPermissionsOfAccount({account_id : this.current_user_id});
      console.log(this.listAccountPermissions);
    },
    async changeStatePermission(item){
      // await Util.showConfirm(this);
      item.has_add = item.has_add == false;
      if(item.has_add){
        await this.AddPermissionToAccount({
          params: {
            account_id: this.current_user_id,
            permission_id : item.id
          },
          callback: {
            success: async res => {
              this.$Notification({
                          type: "success",
                          title: "Thành công",
                          message: `Thêm quyền thành công`
                        });
              this.listAccountPermissions = await this.getListPermissionsOfAccount({account_id : this.current_user_id});
            },
            error:  async res => {
              this.$Notification({
                          type: "error",
                          title: "Thất bại",
                          message: "Thêm quyền thất bại"
                        });
              this.listAccountPermissions = await this.getListPermissionsOfAccount({account_id : this.current_user_id});
            }
          }
        });
      }
      else{
        await this.deletePermissionOfAccount({
          params: {
            account_id: this.current_user_id,
            permission_id : item.id
          },
          callback: {
            success: async res => {
              this.$Notification({
                          type: "success",
                          title: "Thành công",
                          message: `Xóa quyền thành công`
                        });
              this.listAccountPermissions = await this.getListPermissionsOfAccount({account_id : this.current_user_id});
            },
            error: async res => {
              this.$Notification({
                          type: "error",
                          title: "Thất bại",
                          message: "Xóa quyền thất bại"
                        });
              this.listAccountPermissions = await this.getListPermissionsOfAccount({account_id : this.current_user_id});
            }
          }
        });
      }
    },
    async updateDetails (name,permission_id,listDetails){
      let value = this.getValueDetails(listDetails,name);
      let current_value = value == 0 ? 1 : 0;
      await this.updateAccountDetials({
          params: {
            account_id: this.current_user_id,
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
              this.listAccountPermissions = await this.getListPermissionsOfAccount({account_id : this.current_user_id});
            },
            error: async res => {
              this.$Notification({
                          type: "error",
                          title: "Thất bại",
                          message: (value == 0 ? 'Thêm' : 'Xóa') + ` quyền `+ name + ` thất bại`
                        });
              this.listAccountPermissions = await this.getListPermissionsOfAccount({account_id : this.current_user_id});
            }
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.table-permission{
  width: calc(100% - 20px);
  margin: 10px;
  border: 1px solid #b1b1b1;
  border-radius: 10px;
  border-collapse: separate;
  td{
    padding-left: 10px;
  }
}
.table-detail{
  width: calc(100% - 20px);
  margin: 10px;
  border: 1px solid #b1b1b1;
  border-radius: 10px;
  border-collapse: separate;
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