<template>
  <div>
    <data-list :has-btn="false">

      <template v-slot:filter>
        <div class="btn btn-primary waves-effect waves-light m-b-20" @click="addNewMission()" >
            <i class="mdi mdi-account-multiple-plus m-r-5"></i>
            <span>Thêm chiến dịch</span>
        </div>
        <filter-panel :target="'panel-mission'" :value="params" @submit="submitForm(1)">
          <div class="row">
            <filter-item field="name" title="Tên chiến dịch" item-class="col-sm-12 col-md-6">
              <el-input slot-scope="{data}" v-model="data.value" clearable></el-input>
            </filter-item>
            <filter-item field="channel" title="Kênh chiến dịch" item-class="col-sm-12 col-md-6">
              <el-select slot-scope="{data}" v-model="data.value" clearable>
                <el-option
                  v-for="value in ['google','facebook']"
                  :key="value"
                  :value="value"
                  :label="value | channelFilter"
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
        <table-view v-model="list_mission" @load="submitForm">
          <thead>
            <tr>
            	<th data-priority="1"></th>
              	<th data-priority="1">Chiến dịch</th>
              	<th data-priority="1">Kênh triển khai</th>
              	<th data-priority="1">Thời gian chạy</th>
              	<th data-priority="1">Người tạo</th>
             	<th data-priority="1">Hành động</th>
            </tr>
          </thead>
          <loading-item :loading="loading"></loading-item>
          <tbody>
            <tr v-for="(item, index) in list_mission.items" v-bind:key="index">
            	<td width="150px">
	                <div class="center-image">
	                  <Thumbnail class="table-img-avatar" :src="item.cover_link" ratio="1-1" />
	                </div>
	              </td>
              	<td>
                  <NuxtLink :to="'/mission/' + item.id">{{item.name}}</NuxtLink>
              	</td>
              	<td>
                	{{item.channel | channelFilter}}
              	</td>
              	<td>
                	{{item.start_time + '-' + item.end_time}}
              	</td>
              	<td>
                	{{item.user_name}}
              	</td>
              	<td>
                  <NuxtLink :to="'/mission/' + item.id">
                    <div class="btn btn-primary waves-effect waves-light m-b-20" > Cập nhật
                  </div></NuxtLink>
              	</td>
            </tr>
          </tbody>
        </table-view>
      </template>
      <template v-slot:popup>
        <model modelwidth="70%" :is-open.sync="isShowAdd"
          :title="editMode == 'add' ? 'Thêm Mới Chiến Dịch' : 'Cập nhật Công Nợ'" >
          <template v-slot:body>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Tên chiến dịch: </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  <el-input v-model="form.name"></el-input>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Kênh triển khai:</label>
                </div>
                <div class="col-md-9">
                  <select v-model="form.channel" class="form-control">
                    <option
                      v-for="value in ['facebook','google']"
                      :key="value"
                      :value="value"
                      :label="value | channelFilter"
                    ></option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Thời gian : </label>
                  <span class="text-danger">*</span>
                </div>
                <div class="col-md-9">
                  	<el-date-picker
				      	v-model="timemission"
				      	type="datetimerange"
				      	range-separator="To"
				      	start-placeholder="Ngày bắt đầu"
				      	end-placeholder="Ngày kết thúc">
				    </el-date-picker>
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
                  <label for>Cover:</label>
                </div>
                <div class="col-md-3">
                  <image-link
                    :link.sync="form.cover_link"
                    :imageradius="5"
                    :image-width="200"
                    :image-height="100"
                  ></image-link>
                </div>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-md-3">
                  <label for>Mô tả: </label>
                </div>
                <div class="col-md-9">
                  	<ckeditor-html
                  		:message-html.sync="form.description"
                  		:readonly="false"
                  		:list-image-uuid="[]"
                  		uuid="content_review"
                	></ckeditor-html>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:footer>
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-xs-12">
                  <button
                    @click="createMission()" type="button" :disabled="isLoading"
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
import ckeditorHtml from "~/components/element/ckeditor-html";

export default {
  layout: "app",
  mixins: [filterMixins],
  components: {
    "ckeditor-html": ckeditorHtml
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
    channelFilter(state) {
      let states = {
        google: "Google",
        facebook: "Facebook",
      };

      return state in states ? states[state] : state;
    },
  },
  data: () => ({
    loading: false,
    params: {
      name: { value: null },
      channel: { value: null },
      status: { value: null },
      page: { value: 1 },
      page_size: { value: 10 }
    },
    list_mission: {
      meta: {},
      items: []
    },
    isLoading: false,
    isShowAdd: false,
    timemission: [],
    form: {
      user_id:null,
      name:null,
      channel:'facebook',
      cover_link: '',
      description: '',
      status:'active'
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
    if (this.list_mission.items.length == 0) {
      await this.loadData(params);
    } else {
      this.$setParamsUrl(params);
    }
  },
  methods: {
    ...mapActions({
      getListMission: "mission/getListMission",
      addMission: "mission/addMission"
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
      this.list_mission = await this.getListMission(data);
      this.loading = false;
    },
    addNewMission(){
      this.isShowAdd = true;
      this.editMode = 'add';
      this.form = {
        	user_id:null,
		    name:null,
		    channel:'facebook',
		    cover_link: '',
		    description: '',
		    status:'active'
      }
    },
    async createMission() {
    	let params = this.form;
      	params.user_id = this.profile.id;
      	if(!this.timemission || this.timemission.length != 2){
          this.$Notification({
                type: "warning",
                title: "Thất bại",
                message: "Chưa chọn thời gian chiến dịch."
              });
          return;
        }
    		
      	let s_time = new Date(this.timemission[0]);
      	let e_time = new Date(this.timemission[1]);
      	params.start_time = s_time.getTime();
      	params.end_time = e_time.getTime();
    	if(params.s_time == 0 || params.e_time == 0){
    		this.$Notification({
	              type: "warning",
	              title: "Thất bại",
	              message: "Chưa chọn thời gian chiến dịch."
	            });
    		return;
    	}
      	await Util.showConfirm(this);
      	
      	this.addMission({
	        params ,
	        callback: {
	          success: res => {
	            this.$Notification({
	              type: "success",
	              title: "Thành công",
	              message: "Tạo chiến dịch thành công"
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