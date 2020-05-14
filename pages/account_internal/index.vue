<template>
  <div>
    <data-list :has-btn="false">
      <template v-slot:breadcrumb>
        <breadcrumb title="Danh sách tài khoản nội bộ"></breadcrumb>
      </template>

      <template v-slot:filter>
        <div class="btn btn-primary waves-effect waves-light m-b-20" @click="addNewAccount()" >
            <i class="mdi mdi-account-multiple-plus m-r-5"></i>
            <span>Thêm tài khoảng nội bộ</span>
          </div>
        <div class="btn btn-primary waves-effect waves-light m-b-20" @click="addNewAccountByList()" >
            <i class="mdi mdi-calendar-plus m-r-5"></i>
            <span>Thêm tài khoảng nội bộ có sẵn</span>
          </div>
        <filter-panel :value="params" @submit="submitForm(1)">
          <div class="row">
            <filter-item field="name" title="Tên" item-class="col-sm-12 col-md-6">
              <el-input slot-scope="{data}" v-model="data.value" clearable></el-input>
            </filter-item>
            <filter-item field="fix_role_id" title="Loại tài khoảng" item-class="col-sm-12 col-md-6">
              <el-select slot-scope="{data}" value-key="name" v-model="data.value" clearable>
                <el-option
                  v-for="item in list_role.items"
                    :key="item.id"
                    :value="item"
                    :label="item.name"
                ></el-option>
              </el-select>
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
                <div class="btn btn-danger waves-effect waves-light m-b-20" @click="deleteAccountManager(item.id)" >
                  Xóa
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
        <model :is-open.sync="isShowAdd"
          :title="editMode == 'add' ? 'Thêm Mới Tài Khoản' : 'Cập nhật tài khoảng'" >
          <template v-slot:body>
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
                  <label for>Password:</label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-input v-model="form.password" type="password" ></el-input>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Loại tài khoảng:</label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-select value-key="name" v-model="role_account" clearable>
                    <el-option
                      v-for="item in list_role.items"
                      :key="item.id"
                      :value="item"
                      :label="item.name"
                    ></el-option>
                  </el-select>
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
        <model :is-open.sync="isShowList"
          title="Danh sách tài khoảng nội bộ" >
          <template v-slot:body>
              <filter-panel :value="params_internal" @submit="submitInternal(1)">
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
            <table-view v-model="list_internal" @load="submitInternal">
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
              <tbody>
                <tr v-for="(item, index) in list_internal.items" v-bind:key="index">
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
                    <div class="btn btn-primary waves-effect waves-light m-b-20" @click="addToManager(item.id)" >
                      Thêm
                    </div>
                  </td>
                </tr>
              </tbody>
            </table-view>
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

export default {
  layout: "app",
  mixins: [filterMixins],
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
      fix_role_id: { value: null },
      page: { value: 1 },
      page_size: { value: 10 }
    },
    list_account: {
      meta: {},
      items: []
    },
    list_role:{
      meta: {},
      items: []
    },
    params_internal: {
      name: { value: null },
      status: { value: null },
      page: { value: 1 },
      page_size: { value: 10 }
    },
    list_internal: {
      meta: {},
      items: []
    },
    isShowList:false,
    isLoading: false,
    isShowAdd:false,
    role_account:{
      id:1,
      name:'admin'
    },
    form: {
      name:null,
      username :null,
      email:null,
      phone:null,
      password:null,
      facebook:null,
      avatar_link:null,
      status:'active',
    },
    editMode : 'add'
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
    await this.loadListRole();
  },
  methods: {
    ...mapActions({
      getListAccountInternal: "account/getListAccountInternal",
      getListAccountNotInternal: "account/getListAccountNotInternal",
      getListRole: "permission/getListRole",
      addAccount: "account/addAccount",
      updateAccount: "account/updateAccount",
      addManager: "account/addManager",
      deleteManager: "account/deleteManager"
    }),
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
    loadData: async function(data) {
      this.$setParamsUrl(data);
      if(!data.fix_role_id){
        data.fix_role_id = "1,2";
      }
      data.manager_id = this.profile.id;
      this.list_account = await this.getListAccountInternal(data);
      this.loading = false;
    },
    loadListRole: async function(){
      this.list_role = await this.getListRole({
        fix_role_id : "1,2"
      });
      if(this.list_role.meta.total > 0 && !this.params.fix_role_id.value){
        this.params.fix_role_id.value = {
          id : this.list_role.items[0].id,
          name : this.list_role.items[0].name,
        }
      }
    },
    addNewAccount(){
      this.isShowAdd = true;
      this.editMode = 'add';
      this.form = {
        name:null,
        username :null,
        email:null,
        phone:null,
        password:null,
        facebook:null,
        avatar_link:null,
        status:'active',
      }
    },
    async createAccount() {
      await Util.showConfirm(this);
      let params = this.form;
      params.role_id = this.role_account.id;
      params.manager_id = this.profile.id;
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
    showEdit: function(item) {
      this.isShowAdd = true;
      this.editMode = 'edit';
      this.form = {
        id: item.id,
        name: item.name,
        username : item.username,
        email: item.email,
        phone: item.phone,
        facebook: item.facebook,
        avatar_link: item.avatar_link,
        status: item.status,
      }
      this.role_account ={
        id: item.role_id,
        name: item.role_name,
      };
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
      params.role_id = this.role_account.id;
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
    addNewAccountByList: function() {
      this.isShowList = true;
      this.submitInternal();
    },
    submitInternal(page = 0) {
      let data = {};
      for (var row in this.params_internal) {
        data[row] = this.params_internal[row].value
          ? this.params_internal[row].value.uuid !== undefined
            ? this.params_internal[row].value.uuid
            : this.params_internal[row].value
          : null;
      }
      if (page) {
        this.params_internal.page.value = data.page = page;
      }
      this.loadDataInternal(data);
    },
    loadDataInternal: async function(data) {
      data.fix_role_id = "1,2";
      data.manager_id = this.profile.id;
      this.list_internal = await this.getListAccountNotInternal(data);
    },
    async addToManager(id){
      await Util.showConfirm(this);
      let params = {
        user_id: id,
        manager_id: this.profile.id
      };
      this.addManager({
        params ,
        callback: {
          success: res => {
            this.$Notification({
              type: "success",
              title: "Thành công",
              message: "Thêm tài khoản thành công"
            });
            this.submitForm(this.params.page.value);
            this.submitInternal(this.params_internal.page.value);
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
    async deleteAccountManager(id){
      await Util.showConfirm(this);
      let params = {
        user_id: id,
        manager_id: this.profile.id
      };
      this.deleteManager({
        params ,
        callback: {
          success: res => {
            this.$Notification({
              type: "success",
              title: "Thành công",
              message: "Xóa tài khoản quản lý thành công"
            });
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
    }
  }
};
</script>