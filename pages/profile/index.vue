<template>
  <data-add :loading="loading">
    <template v-slot:breadcrumb>
      <breadcrumb title="Quản lý tài khoản"></breadcrumb>
    </template>
    <template v-slot:form>
    	<tabs :options="{ useUrlFragment: false }">
	        <tab name="Thông tin tài khoản">
		      <data-form title="Thông tin tài khoản" class="m-b-15">
		        <div class="row">
		          <div class="col-md-12 m-t-5">
		            <div class="col-xs-3">
		              <label>
		                <strong>Tên : </strong>
		              </label>
		            </div>
		            <div class="col-xs-9">
		              <div class="field-name">
		              	<el-input placeholder="Email" v-model="form.name" clearable></el-input>
		              </div>
		            </div>
		          </div>
		          <div class="col-md-12 m-t-5">
		            <div class="col-xs-3">
		              <label>
		                <strong>Username : </strong>
		              </label>
		            </div>
		            <div class="col-xs-9">
		              <div class="field-name">
		              	<label> {{form.username}}</label>
		              </div>
		            </div>
		          </div>
		          <div class="col-md-12 m-t-5">
		            <div class="col-xs-3">
		              <label>
		                <strong>Số điện thoại:</strong>
		              </label>
		            </div>
		            <div class="col-xs-9">
		              <div class="field-name">
		                <el-input placeholder="Số điện thoại" v-model="form.phone" clearable></el-input>
		              </div>
		            </div>
		          </div>
		          <div class="col-md-12 m-t-5">
		            <div class="col-xs-3">
		              <label>
		                <strong>Email:</strong>
		              </label>
		            </div>
		            <div class="col-xs-9">
		              <div class="field-name">
		                <el-input placeholder="Email" v-model="form.email" clearable></el-input>
		              </div>
		            </div>
		          </div>
		          <div class="col-md-12 m-t-5">
		            <div class="col-xs-3">
		              <label>
		                <strong>Facebook link:</strong>
		              </label>
		            </div>
		            <div class="col-xs-9">
		              <div class="field-name">
		                <el-input placeholder="Link facebook" v-model="form.facebook" clearable></el-input>
		              </div>
		            </div>
		          </div>
		          <div class="col-md-12 m-t-5">
		            <div class="col-xs-3">
		              <label>
		                <strong>Avatar:</strong>
		              </label>
		            </div>
		            <div class="col-md-9">
		              <div style="width: 150px">
		                <image-link
		                  :link.sync="form.avatar_link"
		                  :imageradius="5"
		                  :image-width="200"
		                  :image-height="150"
		                ></image-link>
		              </div>
		            </div>
		          </div>
		          <div class="col-md-12 m-t-5">
		            <div class="col-xs-3"></div>
		            <div class="col-md-9">
		              <button
		                @click="updateUser()"
		                type="button"
		                :disabled="isLoading"
		                class="pull-right btn btn-danger"
		              >
		                <i class="mdi mdi-content-save"></i>
		                Cập nhật
		                <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
		              </button>
		            </div>
		          </div>
		        </div>
		      </data-form>
		  	</tab>
		  	<tab name="Quản lý mật khẩu">
	          <data-form title="Thay đổi mật khẩu" class="m-b-15">
	            <div class="row">
	              <div class="col-md-12 m-t-5">
	                <div class="col-xs-3">
	                  <label>
	                    <strong>Mật khẩu cũ:</strong>
	                  </label>
	                </div>
	                <div class="col-xs-9">
	                  <div class="field-name">
	                    <el-input
	                      placeholder="Mật khẩu cũ"
	                      type="password"
	                      v-model="pass.password_old"
	                      clearable
	                    ></el-input>
	                  </div>
	                </div>
	              </div>
	              <div class="col-md-12 m-t-5">
	                <div class="col-xs-3">
	                  <label>
	                    <strong>Mật khẩu mới:</strong>
	                  </label>
	                </div>
	                <div class="col-xs-9">
	                  <div class="field-name">
	                    <el-input
	                      placeholder="Mật khẩu mới"
	                      type="password"
	                      v-model="pass.password_new"
	                      clearable
	                    ></el-input>
	                  </div>
	                </div>
	              </div>
	              <div class="col-md-12 m-t-5">
	                <div class="col-xs-3">
	                  <label>
	                    <strong>Nhập lại mật khẩu mới:</strong>
	                  </label>
	                </div>
	                <div class="col-xs-9">
	                  <div class="field-name">
	                    <el-input
	                      placeholder="Nhập lại mật khẩu mới"
	                      type="password"
	                      v-model="pass.password_renew"
	                      clearable
	                    ></el-input>
	                  </div>
	                </div>
	              </div>

	              <div class="col-md-12 m-t-5">
	                <div class="col-xs-3"></div>
	                <div class="col-md-9">
	                  <button
	                    @click="updatePass()"
	                    type="button"
	                    :disabled="isLoading"
	                    class="pull-right btn btn-danger"
	                  >
	                    <i class="mdi mdi-content-save"></i>
	                    Cập nhật
	                    <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
	                  </button>
	                </div>
	              </div>
	            </div>
	          </data-form>
        	</tab>
        </tabs>
    </template>
  </data-add>
</template>
<script>
import moment from "moment";
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
  data: () => ({
    form: {},
    pass: {
      password_old: null,
      password_renew: null,
      password_new: null
    },
    loading: false,
    isLoading:false,
    accounts: [],
  }),
  async mounted() {

    this.loadData();
  },
  methods: {
    ...mapActions({
      getAccountById: "account/getAccountById",
      updateAccount: "account/updateAccount",
    }),
    updatePass: async function() {
      if (
        !this.pass.password_new ||
        !this.pass.password_renew ||
        !this.pass.password_old
      ) {
        this.$Notification({
          type: "error",
          title: "Cảnh báo",
          message: "Vui lòng nhập đủ thông tin"
        });
        return;
      }
      if (this.pass.password_renew != this.pass.password_new) {
        this.$Notification({
          type: "error",
          title: "Cảnh báo",
          message: "Mật khẩu mới không trùng khớp"
        });
        return;
      }
      this.isLoading = true;
      await this.updateAccount({
        params: {
        	id: this.profile.id,
          	password_old: this.pass.password_old,
          	password_new: this.pass.password_new
        },
        callback: {
          success: async res => {
            this.$Notification({
              type: "success",
              title: "Thành công",
              message: "Đổi mật khẩu thành công"
            });
          },
          error: res => {
            this.$Notification({
              type: "error",
              title: "Lỗi",
              message: "Đổi mật khẩu thất bại"
            });
          }
        }
      });
      this.isLoading = false;
      this.$store.commit("common/clearSession");
      this.$router.push("/login");
    },
    updateUser: async function() {
      await Util.showConfirm(this);
      this.isLoading = true;
      await this.updateAccount({
        params: {
        	id: this.profile.id,
          	name: this.form.name,
          	phone: this.form.phone,
          	email: this.form.email,
          	facebook: this.form.facebook,
          	avatar_link: this.form.avatar_link,
        },
        callback: {
          success: async res => {
            this.$Notification({
              type: "success",
              title: "Thành công",
              message: "Cập nhật thành công"
            });
          },
          error: res => {
            this.$Notification({
              type: "error",
              title: "Lỗi",
              message: "Cập nhật thất bại"
            });
          }
        }
      });
      this.isLoading = false;
    },
    loadData: async function() {
        this.form = await this.getAccountById({id:this.profile.id});
    },
  }
};
</script>

