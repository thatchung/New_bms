<template>
  <div class="content-media">
    <div class="box-body">
      <div class="row">
        <div
          :class="`col-xs-${column}`"
          class="div-item-media remove-padding"
          :key="`item-${index}`"
          v-for="(item,index) in value.items"
        >
          <div
            v-if="item.mimetype == 'image/jpeg' || item.mimetype == 'image/png' || item.mimetype == 'image/jpg'"
            class="img-item"
          >
            <Thumbnail class="img-src" :src="item.media_link" ratio="1-1" />
          </div>

          <video
            style="width: 80px;height: 80px;"
            class="img-item"
            controls
            v-if="item.mimetype=='video/mp4'"
          >
            <source :src="item.media_link" type="video/mp4" />
          </video>

          <div class="div-detail" v-if="allow_detail ">
            <div
              class="media-star display-flex align-items justify-content"
              :class="'div-star-' + item.uuid"
              @click="openAddDetail(item.uuid)"
            >
              <i class="fa fa-star"></i>
            </div>
            <div class="media-detail" :class="'div-check-' + item.uuid">
              <input :class="'input-' + item.uuid" type="number" value="0" />
              <i class="fa fa-check" @click="addDetailMedia(item.uuid)"></i>
            </div>
          </div>
          <div class="div-detail" v-if="allow_detail_update">
            <div
              class="media-star"
              :class="'div-upload-' + item.uuid"
              @click="openUpdateDetail(item.uuid)"
            >
              <i class="fa fa-upload"></i>
            </div>
            <div class="media-detail" :class="'div-check-upload-' + item.uuid">
              <input :class="'input-' + item.uuid" type="number" value="0" />
              <i class="fa fa-check" @click="updateDetailMedia(item.uuid)"></i>
            </div>
          </div>
          <div
            class="div-remove display-flex align-items justify-content"
            v-if="allow_remove"
            @click="removeMedia(item.uuid)"
          >
            <i class="el-icon-delete"></i>
          </div>
          <div
            class="div-add display-flex align-items justify-content"
            v-if="allow_add"
            @click="addMedia(item.uuid)"
          >
            <i class="fa fa-plus"></i>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <no-ssr>
            <paginate
              v-if="(value.meta.page !== 1 ? (value.meta.page-1) : value.meta.page)*value.meta.pageSize < value.meta.totalItem"
              :page-count="value.meta.total"
              :margin-pages="2"
              :prev-text="'Prev'"
              :next-text="'Next'"
              v-model="value.meta.page"
              :container-class="'pagination'"
              :click-handler="pageChange"
              :page-class="'page-item'"
            ></paginate>
          </no-ssr>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { Meta } from "../../../store/models/meta.model";
export default {
  name: "media-gallery",
  props: {
    value: null,
    column: {
      type: String,
      default: "1"
    },
    loading: {
      type: Boolean,
      default: false
    },
    allow_add: {
      type: Boolean,
      default: false
    },
    allow_remove: {
      type: Boolean,
      default: false
    },
    allow_detail: {
      type: Boolean,
      default: false
    },
    allow_detail_update: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    pageChange: function(page) {
      this.$emit("load", page);
    },
    removeMedia: function(uuid) {
      this.$emit("removeMedia", uuid);
    },
    addMedia: function(uuid) {
      this.$emit("addMedia", uuid);
    },
    openAddDetail: function(uuid) {
      $(".div-star-" + uuid).hide(100);
      $(".div-check-" + uuid).show(100);
    },
    addDetailMedia: function(uuid) {
      $(".div-star-" + uuid).show(100);
      $(".div-check-" + uuid).hide(100);
      let value = $(".input-" + uuid).val();
      this.$emit("addDetailMedia", uuid, value);
    },
    openUpdateDetail: function(uuid) {
      $(".div-upload-" + uuid).hide(100);
      $(".div-check-upload-" + uuid).show(100);
    },
    updateDetailMedia: function(uuid) {
      $(".div-upload-" + uuid).show(100);
      $(".div-check-upload-" + uuid).hide(100);
      let value = $(".input-" + uuid).val();
      this.$emit("updateDetailMedia", uuid, value);
    }
  },
  mounted: async function() {}
};
</script>
<style lang="scss">
.h3-title {
  float: left;
  margin-top: 0px;
}
.bt-back {
  margin: 10px;
  margin-top: 0px;
  float: right;
}
.div-item-media {
  position: relative;
  min-width: 120px;
  .img-item {
    // height: 150px;
    // width: 100%;
    // box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.45);
    margin: 7.5px;
    .img-src {
      // width: 100%;
      // height: 100%;
      border-radius: 6px;
      overflow: hidden;
      img {
        object-fit: cover;
      }
    }
  }
  .div-remove {
    position: absolute;
    right: 1px;
    top: 1px;
    background-color: #fff;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    font-size: 11px;
    border-radius: 50%;
    cursor: pointer;
    border: 0.7px solid #000000a6;
    &:hover {
      background-color: rgba(212, 69, 26, 0.7);
      color: white;
    }
  }
  .div-add {
    position: absolute;
    left: 7.5px;
    top: 7.5px;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    width: calc(100% - 15px);
    height: calc(100% - 15px);
    text-align: center;
    font-size: 28px;
    cursor: pointer;
    border-radius: 6px;
    overflow: hidden;
    &:hover {
      background-color: rgba(212, 69, 26, 0.7);
      color: #ccc;
    }
  }
  .div-detail {
    position: absolute;
    left: 7.5px;
    top: 7.5px;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    font-size: 14px;
    border-radius: 5px;

    .media-star {
      background-color: #fff;
      width: 25px;
      height: 25px;
      border: 0.7px solid rgba(0, 0, 0, 0.7);
      border-radius: 3px;
      cursor: pointer;
      .fa-star {
        color: #c1c11e;
      }
      &:hover {
        background-color: rgba(212, 69, 26, 0.7);
      }
    }
    .media-detail {
      display: none;
      input {
        width: 30px;
        border-radius: 3px;
        font-size: 17px;
        border: 0.6px solid rgba(0, 0, 0, 0.65098);
        margin-right: 5px;
      }
      .fa-check {
        cursor: pointer;
      }
    }
  }
}
</style>