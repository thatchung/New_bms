<template>
  <div class>
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-row :gutter="22">
        <el-col :md="9">
          <el-form-item prop="image">
            <div class="image-container display-flex align-items justify-content">
              <Thumbnail :src="form.imagebase64" ratio="1-1" :replace="false" />
              <span v-if="!form.image" class="display-flex align-items justify-content">
                <i class="mdi mdi-library-plus"></i>
              </span>
              <input type="file" accept="image/*" @change="loadFile" />
              <div class="div-state">
                <i v-if="!hasimage" style="color:red" class="el-icon-error"></i>
                <i v-if="hasimage" style="color:green" class="el-icon-success"></i>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="8" v-if="imageMeta">
          <el-form-item label="Chiều ngang ảnh">
            <span class="form-control">{{imageMeta.width | number}} px</span>
          </el-form-item>
        </el-col>
        <el-col :md="8" v-if="imageMeta">
          <el-form-item label="Chiều dọc ảnh">
            <span class="form-control">{{imageMeta.height | number}} px</span>
          </el-form-item>
        </el-col>
        <el-col :md="15" v-if="!imageLink">
          <el-col :md="24">
            <el-form-item label="Tên ảnh" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="24">
            <button
              type="button"
              class="btn btn-primary"
              style="width: 100%;"
              :disabled="loading"
              @click="uploadImage"
            >
              Up Ảnh
              <i v-if="loading" class="el-icon-loading"></i>
            </button>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
import Util from "@/util";

export default {
  name: "ImageEditor",

  props: {
    link: null,
    uuid: null,
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
    "image-link": String
  },

  data: () => ({
    form: {
      name: null,
      priority: 0,
      image: null,
      imagebase64: null
    },

    rules: {
      image: [{ required: true, message: "Không được bỏ trống" }]
    },
    avatar: false,
    isNewImage: false,
    imageMeta: null,
    loading: false,
    hasimage: false,
    link_image: null
  }),

  computed: {
    aspectRatio: function() {
      let gcd = this.$util.greatestCommonDivisor(
        this.imageWidth,
        this.imageHeight
      );
      if (`${this.imageWidth / gcd}:${this.imageHeight / gcd}` === `77:100`)
        return `7:9`;
      return `${this.imageWidth / gcd}:${this.imageHeight / gcd}`;
    }
  },

  methods: {
    validateForm: async function() {
      await this.$util.validateForm(this);
    },

    loadImageMeta: async function() {
      await (() => {
        return new Promise((res, rej) => {
          try {
            let self = this;
            let img = new Image();
            img.onload = function() {
              self.imageMeta = {
                width: this.width,
                height: this.height,
                isGoodAspectRatio:
                  Math.abs(
                    this.width / this.height -
                      self.imageWidth / self.imageHeight
                  ) < 0.01,
                isNewAspectRatio:
                  Math.abs(
                    this.width / this.height -
                      self.imageWidth / self.imageHeight
                  ) %
                    0.229 <
                  0.01
              };
              res();
            };

            img.src = this.form.image;
          } catch (e) {
            rej(e);
          }
        });
      })();
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
        this.form.name = file.name;
        this.form.image = file;
        this.form.imagebase64 = await Util.fileToBase64(file);
        await this.loadImageMeta();
        this.isNewImage = true;
      }

      await this.validateForm();
    },

    uploadImage: async function() {
      if (!this.form.image && !this.link) {
        this.$Notification({
          type: "error",
          title: "Lỗi",
          message: "Dữ liệu đầu vào bị lỗi, xin kiểm tra lại!"
        });
        return;
      }

      this.loading = true;
      let r;
      r = await this.$callApi({
        method: "post",
        lixi_review: true,
        imageFile: this.form.image,
        url: "media/image"
      });
      this.loading = false;

      if (!r.meta.success) return;
      if (r.data.length == 0) return;
      this.isaddimage = true;
      this.link = r.data[0].media_link;
      this.uuid = r.data[0].uuid;
      this.hasimage = true;
      this.$emit("update:link", r.data[0].media_link);
      this.$emit("update:uuid", r.data[0].uuid);
    },
    loadGallery: async function() {},

    gallerySelect: function(item) {
      this.$emit("close");
      this.done(item);
    }
  },

  mounted: async function() {
    let self = this;
    setTimeout(function() {
      if (self.link) {
        self.form.imagebase64 = self.link;
        self.hasimage = true;
      } else {
        self.hasimage = false;
      }
    }, 200);
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

.image-container {
  position: relative;
  width: 100%;
  float: left;
  margin: 5px 0px;
  background-color: #ff800021;
  border-radius: 5px;
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
    border: 1px solid #d4d7e0;
    background-color: #d4d7e0;
    margin: 5px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    imgs {
      width: 770px;
      height: 1000px;
      object-fit: contain;
    }

    &:hover {
      border-color: #d64a2e;
    }
  }
}
</style>
