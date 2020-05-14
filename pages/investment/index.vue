<template>
  <div>
    <data-list :has-btn="false">

      <template v-slot:filter>
        <div class="btn btn-primary waves-effect waves-light m-b-20" @click="addNewInvestment()" >
            <i class="mdi mdi-account-multiple-plus m-r-5"></i>
            <span>Thêm công nợ</span>
        </div>
        <filter-panel :target="'panel-investment'" :value="params" @submit="submitForm(1)">
          <div class="row">
            <filter-item field="user_name" title="Khách hàng" item-class="col-sm-12 col-md-6">
              <el-input slot-scope="{data}" v-model="data.value" clearable></el-input>
            </filter-item>
            <filter-item field="page_name" title="Trang" item-class="col-sm-12 col-md-6">
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
        <table-view v-model="list_investment" @load="submitForm">
          <thead>
            <tr>
              	<th data-priority="1">Khách hàng</th>
              	<th data-priority="1">Trang</th>
              	<th data-priority="1">Số dư đầu</th>
              	<th data-priority="1">Tổng thu</th>
             	<th data-priority="1">Tổng chi</th>
              	<th data-priority="1">Phát sinh</th>
             	<th data-priority="1">Điều chỉnh</th>
             	<th data-priority="1">Số dư cuối</th>
            </tr>
          </thead>
          <loading-item :loading="loading"></loading-item>
          <tbody>
            <tr v-for="(item, index) in list_investment.items" v-bind:key="index">
              <td>
                {{item.user_name}}
              </td>
              <td>
                {{item.page_name}}
              </td>
              <td>
                {{item.money_first}}
              </td>
              <td>
                {{item.money_in}}
              </td>
              <td>
                {{item.money_out}}
              </td>
              <td>
              	{{item.money_grow}}
              </td>
              <td>
              	{{item.money_impale}}
              </td>
              <td>
              	{{item.money_total}}
              </td>
            </tr>
          </tbody>
        </table-view>
      </template>
      <template v-slot:popup>
        <model :is-open.sync="isShowAdd"
          :title="editMode == 'add' ? 'Thêm Mới Công Nợ' : 'Cập nhật Công Nợ'" >
          <template v-slot:body>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Khách hàng: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <select-list
                    v-model="customer"
                    :numget="15"
                    :value.sync="customer"
                    :searchname="'name'"
                    :name="'account/list?status=active&fix_role_id=3'"
                    placeholder="Chọn khách hàng"
                  ></select-list>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Trang: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <select-list
                    v-model="page_item"
                    :numget="15"
                    :value.sync="page_item"
                    :searchname="'name'"
                    :name="'page/list?status=active&user_id=' + customer.id"
                    placeholder="Chọn trang"
                  ></select-list>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Loại:</label>
                </div>
                <div class="col-md-9">
                  <select v-model="form.type" class="form-control">
                    <option
                      v-for="value in ['increase','decrease']"
                      :key="value"
                      :value="value"
                      :label="value | typeFilter"
                    ></option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Số tiền: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-input v-model="form.money" type="number"></el-input>
                </div>
              </div>
            </div>
			<div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Ngày cấp: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-date-picker
		              v-model="approveDate"
		              type="datetime"
		              placeholder="Chọn ngày giờ"
		            ></el-date-picker>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Ngày tạo: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-date-picker
		              v-model="createDate"
		              type="datetime"
		              placeholder="Chọn ngày giờ"
		            ></el-date-picker>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Số dư đầu: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-input v-model="form.money_first" type="number"></el-input>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Số thu: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-input v-model="form.money_in" type="number"></el-input>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Số chi: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-input v-model="form.money_out" type="number"></el-input>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Phát sinh: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-input v-model="form.money_grow" type="number"></el-input>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Điều chỉnh: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-input v-model="form.money_impale" type="number"></el-input>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Số dư cuối: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <label>
                  {{+form.money_first + +form.money_in + +form.money_grow + +form.money_impale - form.money_out}}
              </label>
                </div>
              </div>
            </div>
            
          </template>
          <template v-slot:footer>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-xs-12">
                  <button
                    @click="createInvestment()" type="button" :disabled="isLoading"
                    class="pull-right btn btn-danger" v-if="editMode == 'add'">
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
    typeFilter(state) {
      let states = {
        increase: "Tăng doanh thu",
        decrease: "Giảm doanh thu"
      };

      return state in states ? states[state] : state;
    },
  },
  data: () => ({
    loading: false,
    params: {
      user_name: { value: null },
      page_name: { value: null },
      status: { value: null },
      page: { value: 1 },
      page_size: { value: 10 }
    },
    list_investment: {
      meta: {},
      items: []
    },
    isLoading: false,
    isShowAdd:false,
    customer:{},
    page_item:{},
    createDate:null,
    approveDate:null,
    form: {
      user_id:null,
      page_id:null,
      type:'increase',
      money: 0,
      money_first: 0,
      money_in: 0,
      money_out: 0,
      money_grow: 0,
      money_impale: 0,
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
          ? this.params[row].value.id !== undefined
            ? this.params[row].value.id
            : this.params[row].value
          : null;
    }
    if (this.list_investment.items.length == 0) {
      await this.loadData(params);
    } else {
      this.$setParamsUrl(params);
    }
  },
  methods: {
    ...mapActions({
      getListInvestment: "investment/getListInvestment",
      addInvestment: "investment/addInvestment"
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
      this.list_investment = await this.getListInvestment(data);
      this.loading = false;
    },
    addNewInvestment(){
      this.isShowAdd = true;
      this.editMode = 'add';
      this.form = {
        	user_id:null,
	      	page_id:null,
	      	type:'increase',
	      	money: 0,
	      	money_first: 0,
	      	money_in: 0,
	      	money_out: 0,
	      	money_grow: 0,
	      	money_impale: 0,
      }
    },
    async createInvestment() {
    	let params = this.form;
      	params.user_id = this.customer.id;
      	params.page_id = this.page_item.id;
      	let cdate = new Date(this.createDate);
      	let adate = new Date(this.approveDate);
      	params.date_create = cdate.getTime();
      	params.date_approve = adate.getTime();
      	params.money_total = +params.money_first + +params.money_in + +params.money_grow + +params.money_impale - params.money_out;
    	if(!this.form.user_id || !this.form.page_id)
    		return;
    	if(params.date_create == 0 || params.date_approve == 0){
    		this.$Notification({
	              type: "warning",
	              title: "Thất bại",
	              message: "Chưa chọn ngày tạo hoặc ngày cấp."
	            });
    		return;
    	}
      	await Util.showConfirm(this);
      	
      	this.addInvestment({
	        params ,
	        callback: {
	          success: res => {
	            this.$Notification({
	              type: "success",
	              title: "Thành công",
	              message: "Tạo công nợ thành công"
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