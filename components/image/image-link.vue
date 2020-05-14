<template>
  <div class="content-img">
    <div class="image-container display-flex align-items justify-content" @click="openModel()">
      <Thumbnail :src="save.image !== null ? save.image : link" ratio="1-1" :replace="false" />
      <span v-if="!save.image && !link" class="display-flex align-items justify-content">
        <i class="mdi mdi-library-plus"></i>
      </span>
      <div class="div-state">
        <i v-if="!save.hasimage" style="color:red" class="el-icon-error"></i>
        <i v-if="save.hasimage" style="color:green" class="el-icon-success"></i>
      </div>
    </div>
    <model v-if="isUpload" :is-open.sync="isShow" title="Load Image">
      <template v-slot:body>
        <div class="display-flex align-items">
          <div class="image-container display-flex align-items justify-content" style="width: 20%">
            <Thumbnail :src="form.imagebase64" ratio="1-1" :replace="false" />
            <!-- <input class="choose-file" type="file" accept="image/*" @change="loadFile" /> -->
            <span v-if="!form.image" class="display-flex align-items justify-content">
              <i class="mdi mdi-library-plus"></i>
            </span>
            <div class="div-state">
              <i v-if="!hasimage" style="color:red" class="el-icon-error"></i>
              <i v-if="hasimage" style="color:green" class="el-icon-success"></i>
            </div>
          </div>

          <div class="display-flex align-items justify-content" style="margin: 0 32px;">
            <span>Hoặc</span>
          </div>

          <div class="row" style="width: 100%;">
            <data-form title="URL hình ảnh">
              <div class="col-xs-9">
                <el-input v-model="form.link_image" placeholder="Link"></el-input>
              </div>
              <div class="col-xs-3">
                <button
                  type="button"
                  class="btn btn-info waves-effect w-md waves-light pull-right"
                  :disabled="isLoading"
                  @click="load()"
                >
                  <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
                  <i class="mdi mdi-autorenew"></i> Load
                </button>
              </div>
            </data-form>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="row m-t-10">
          <div class="col-md-12">
            <div class="col-xs-12">
              <button
                :disabled="isLoading"
                type="button"
                class="btn btn-danger waves-light"
                @click="uploadImage"
              >
                <i class="mdi mdi-content-save"></i>
                Save
                <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
              </button>
            </div>
          </div>
        </div>
      </template>
    </model>
  </div>
</template>
<script>
import Util from "@/util";

export default {
  props: {
    link: null,
    "image-width": {
      type: Number,
      default: 100,
      validator: value => {
        return value > 0;
      }
    },
    "image-height": {
      type: Number,
      default: 100,
      validator: value => {
        return value > 0;
      }
    },
    imageradius: {
      type: Number,
      default: 5
    },
    isUpload: {
      type: Boolean,
      default: true
    }
  },
  mounted() {},
  data() {
    return {
      isShow: false,
      hasLink: false,
      imagesave: null,
      isLoading: false,
      hasimage: false,
      form: {
        name: null,
        priority: 0,
        image: null,
        imagebase64: null,
        link_image: null
      },
      save: {
        image: null,
        hasimage: false
      }
    };
  },
  methods: {
    openModel() {
      this.isShow = !this.isShow;
    },
    loadFile: async function(e) {
      let file = e.target.files[0];
      if (file.size >= 3000000) {
        this.$Notification({
          type: "warning",
          title: "Chú ý!",
          message: "File ảnh tải lên có dung lượng vượt mức 3MB!"
        });
        return;
      } else {
        this.hasLink = false;
        this.hasimage = true;
        this.form.link_image = null;
        this.form.name = file.name;
        this.form.image = file;
        this.form.imagebase64 = await Util.fileToBase64(file);
      }
    },
    load: function() {
      this.isLoading = true;
      this.form.imagebase64 = null;
      if (this.form.link_image && this.form.link_image.length) {
        this.form.imagebase64 = this.form.link_image;
        this.form.image = true;
        this.isLoading = false;
        this.hasimage = true;
      } else {
        this.isLoading = false;
      }
    },
    async uploadImage() {
      this.isLoading = true;
      if (this.form.image && typeof this.form.image == "object") {
        this.createMediaLink({ image: this.form.image });
        this.isLoading = false;
      } else if (this.form.link_image) {
        this.loadLink();
        this.isLoading = false;
      } else {
        this.$Notification({
          type: "error",
          title: "Lỗi",
          message: "Dữ liệu đầu vào bị lỗi, xin kiểm tra lại!"
        });
        this.isLoading = false;
        return;
      }
    },
    loadLink() {
      this.save.image = this.form.link_image;
      this.save.hasimage = true;
      this.isShow = false;
      this.$emit("update:link", this.form.link_image);
    },
    async createMediaLink({ image }) {
      this.isLoading = true;
      let res = await this.$callApi({
        method: "post",
        lixi_review: true,
        imageFile: image,
        url: "media/image"
      });
      this.isLoading = false;
      if (res.meta.success) {
        this.hasimage = true;
        this.save.hasimage = true;
        this.save.image = res.data[0].media_link;
        this.isShow = false;
        this.$emit("update:link", res.data[0].media_link);
        this.$emit("update:uuid", res.data[0].uuid);
      } else {
        this.$Notification({
          type: "error",
          title: "Lỗi",
          message: "Dữ liệu đầu vào bị lỗi, xin kiểm tra lại!"
        });
        return;
      }
    }
  },
  watch: {
    link: function(val) {
      if (val && val.length) {
        this.save.image = val;
        this.form.imagebase64 = val;
        this.save.hasimage = true;
        this.hasimage = true;
      } else {
        this.save.image = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-tabs {
  margin-top: -15px;
}

.close-button {
  position: absolute;
  top: 5px;
  right: 15px;
}

.choose-file {
  color: white;
  line-height: 10px;
  height: 100px;
  width: 100%;
}

.btn-load {
  height: 35px;
}

.image-container {
  position: relative;
  width: 100%;
  float: left;
  margin: 5px 0px;
  background-color: #ff800021;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  input,
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .imgs {
    position: absolute;
    top: 0;
    left: 0;
    width: 770px;
    height: 1000px;
  }

  span {
    position: absolute;
    font-size: 32px;
    color: #ff8000;
    width: 100%;
    height: 100%;
    background: rgba(255, 128, 0, 0.14);
  }

  input {
    cursor: pointer;
    opacity: 0;
    z-index: 99;
  }

  img {
    border: 0;
    object-fit: contain;
  }

  .imgs {
    width: 770px;
    height: 1000px;
    object-fit: contain;
  }

  .div-state {
    display: inline-block;
    width: 50px;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    position: absolute;
    bottom: -5px;
    right: -20px;
  }
}

.filter-panel {
  border: 0;
}

.image-list {
  margin: 0;
  padding: 0;
  list-style-type: none;

  &::after {
    content: "";
    clear: both;
    display: table;
  }

  li {
    position: relative;
    float: left;
    width: 153px;
    height: 86px;
    overflow: hidden;
    border-radius: 5px;
    background-color: #ff800021;
    margin: 5px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .imgs {
      width: 770px;
      height: 1000px;
      object-fit: contain;
    }

    &:hover {
      border-color: #ff6600;
    }
  }
}
</style>
