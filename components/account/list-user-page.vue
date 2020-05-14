<template>
  <div>
    <data-list :has-btn="false">

      <template v-slot:filter>
        <div class="btn btn-primary waves-effect waves-light m-b-20" @click="addNewPage()" >
            <i class="mdi mdi-account-multiple-plus m-r-5"></i>
            <span>Thêm trang cho khách hàng</span>
        </div>
        <filter-panel :target="'panel-page'" :value="params" @submit="submitForm(1)">
          <div class="row">
            <filter-item field="name" title="Tên" item-class="col-sm-12 col-md-6">
              <el-input slot-scope="{data}" v-model="data.value" clearable></el-input>
            </filter-item>
            <filter-item field="state" title="Trạng thái" item-class="col-sm-12 col-md-6">
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
        <table-view v-model="list_page" @load="submitForm">
          <thead>
            <tr>
              <th data-priority="0">ID</th>
              <th data-priority="1">Name</th>
              <th data-priority="1">Link</th>
              <th data-priority="1">Trạng thái</th>
              <th data-priority="1" class="text-center">Hành động</th>
            </tr>
          </thead>
          <loading-item :loading="loading"></loading-item>
          <tbody>
            <tr v-for="(item, index) in list_page.items" v-bind:key="index">
              <td>
                {{item.id}}
              </td>
              <td>
                {{item.name}}
              </td>
              <td>
                <a :href="item.note" target="_blank">{{ item.link }}</a>
              </td>
              <td>
              	<status :status=" item.status "></status>
              </td>
              <td class="text-center">
                <div class="btn btn-primary waves-effect waves-light m-b-20" @click="showEdit(item)" >
                  Cập nhật
                </div>
              </td>
            </tr>
          </tbody>
        </table-view>
      </template>
      <template v-slot:popup>
        <model :is-open.sync="isShowAdd"
          :title="editMode == 'add' ? 'Thêm Mới trang' : 'Cập nhật trang'" >
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
                  <label for>Link:</label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-input v-model="form.link" placeholder="Link" clearable></el-input>
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
          </template>
          <template v-slot:footer>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-xs-12">
                  <button
                    @click="createPage()" type="button" :disabled="isLoading"
                    class="pull-right btn btn-danger" v-if="editMode == 'add'">
                    <i class="mdi mdi-content-save"></i>
                    Lưu
                    <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
                  </button>
                  <button
                    @click="editPage()" type="button" :disabled="isLoading"
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
  props: {
    user_id: {
      type: Number,
    }
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
      state: { value: null },
      page: { value: 1 },
      page_size: { value: 10 }
    },
    list_page: {
      meta: {},
      items: []
    },
    isLoading: false,
    isShowAdd:false,
    form: {
      name:null,
      link:null,
      status:'active',
    },
    editMode : 'add',
  }),
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
    if (this.list_page.items.length == 0) {
      await this.loadData(params);
    } else {
      this.$setParamsUrl(params);
    }
  },
  methods: {
    ...mapActions({
      getListPage: "page/getListPage",
      addPage: "page/addPage",
      updatePage: "page/updatePage",
    }),
    submitForm(page = 0) {
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
    loadData: async function(data) {
      this.$setParamsUrl(data);
      data.user_id = this.user_id;
      this.list_page = await this.getListPage(data);
      this.loading = false;
    },
    addNewPage(){
      this.isShowAdd = true;
      this.editMode = 'add';
      this.form = {
        name:null,
        link:null,
        status:'active',
      }
    },
    async createPage() {
    	if(!this.user_id)
    		return
      	await Util.showConfirm(this);
      	let params = this.form;
      	params.user_id = this.user_id;
      	this.addPage({
	        params ,
	        callback: {
	          success: res => {
	            this.$Notification({
	              type: "success",
	              title: "Thành công",
	              message: "Tạo trang thành công"
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
        role_name: item.role_name
      }
    },
    async editPage() {
    	if(!this.user_id)
    		return
      	await Util.showConfirm(this);
      	let params = {
	        id: this.form.id,
	        name: this.form.name,
	        link: this.form.link,
	        status: this.form.status,
	        user_id : this.user_id
      	};
      	this.updatePage({
	        params ,
	        callback: {
	          success: res => {
	            this.$Notification({
	              type: "success",
	              title: "Thành công",
	              message: "Cập nhật trang thành công"
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
  }
};
</script>