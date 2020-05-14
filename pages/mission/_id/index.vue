<template>
  <div class="content">
    <div class="container">
      <breadcrumb title="Cập nhật chiến dịch"></breadcrumb>
      <div class="row m-t-10">
        <fieldset style="min-height: 200px;">
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
                  <span class="text-danger">*</span>
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
            <div class="row m-t-10">
              <div class="col-md-12">
                <div class="col-xs-12">
                  <button
                    @click="editMission()" type="button" :disabled="isLoading"
                    class="pull-right btn btn-danger">
                    <i class="mdi mdi-content-save"></i>
                    Lưu
                    <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
                  </button>
                </div>
              </div>
            </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import filterMixins from "~/mixins/filters";
import { mapActions, mapGetters } from "vuex";
import Util from "@/util";
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
  data() {
    return {
	    isLoading: false,
	    timemission: [],
	    form: {
	      user_id:null,
	      name:null,
	      channel:'facebook',
	      cover_link: null,
	      description: null,
	      status:'active'
	    },
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.loadData();
    } else {
      this.warningError({ message: "Không tìm thấy chiến dịch" });
      this.$router.push("/mission");
    }
  },
  methods: {
    ...mapActions({
      getMissionById: "mission/getMissionById",
      updateMission: "mission/updateMission"
    }),
    async loadData() {
      	this.form = await this.getMissionById({ id: this.$route.params.id });
      	if(this.form.start_time){
      		this.timemission.push(this.form.start_time);
      	}
      	if(this.form.end_time){
      		this.timemission.push(this.form.end_time)
      	}
    },
    async editMission() {
    	let params = this.form;
      	if(!this.timemission || this.timemission.length != 2)
    		return;
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
      	
      	this.updateMission({
	        params ,
	        callback: {
	          success: res => {
	            this.$Notification({
	              type: "success",
	              title: "Thành công",
	              message: "Cập nhật chiến dịch thành công"
	            });
	            this.loadData();
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