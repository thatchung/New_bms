<template>
  <div>
    <div class="control-upload" style="width:100%">
      <button
        type="button"
        v-if="isUpload"
        :disabled="loadingUpimage"
        @click="appImageToReview()"
        class="btn btn-primary btn-sm"
      >
        <i class="fa fa-plus"></i> Add Image
        <i v-if="loadingUpimage" class="fa fa-spinner fa-spin"></i>
      </button>
      <button
        type="button"
        v-if="isUpload && isVideo"
        @click="showUploadVideo()"
        class="btn btn-primary btn-sm"
      >
        <i class="fa fa-plus"></i> Add Video
      </button>
    </div>

    <input
      :id="name + '-bt-image-button'"
      style="display: none;"
      type="file"
      accept="image/*"
      multiple
      @change="loadImageFile"
    />

    <!-- :style="list_photo && list_photo.length ?'margin: 5px;float: left;width:'+list_photo.length * 200 + 'px;':'margin: 5px;float: left;width:'+0 * 140 + 'px;'" -->

    <draggable-img
      @change="log"
      v-model="list_photo"
      group="people"
      @start="drag=true"
      @end="drag=false"
      class="row"
    >
      <div class="item-media col-xs-1" v-for="(item,index) in list_photo" :key="index">
        <div
          class="img-media"
          style="width:80px"
          v-if="item.type == 'image' || item.type == 'photo' ||item.mimetype == 'image/jpeg' || item.mimetype == 'image/png' || item.mimetype == 'image/jpg'"
        >
          <div class="img-wrapper" @click="viewImage(item,index)">
            <div class="number-index">
              <span>{{index + 1}}</span>
            </div>
            <div>
              <Thumbnail class="img-src" :src="item.link || item.media_link" ratio="1-1" />
            </div>
          </div>
          <div
            v-if="isUpload"
            class="btn-remove display-flex align-items justify-content"
            @click="removeMedia(item.uuid)"
          >
            <i class="el-icon-delete"></i>
          </div>
        </div>

        <div class="video-item" v-if="item.type == 'video' || item.type=='video_autoplay'">
          <div class="img-wrapper">
            <!-- <div class="number-index">
              <span>{{index + 1}}</span>
            </div>-->
            <video controls style="width: 80px; height: 80px">
              <source :src="item.link" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </draggable-img>

    <model title="Thêm video" modelwidth="33%" :isOpen.sync="showadd_video">
      <template v-slot:body>
        <div>
          <div class="upload-container">
            <span v-if="!video.link">Click để chọn video</span>
            <input type="file" accept="video/*" @change="loadVideo" />
            <video v-if="video.link" class="video-upload-item" controls>
              <source :src="video.link" type="video/mp4" />
            </video>
          </div>
          <div class="upload-cover-container">
            <span v-if="!cover.link">
              {{ loadingCreate ? 'Creating ' + loadingPercent + '%' : 'Cover' }}
              <i
                v-if="loadingCreate"
                class="fa fa-spinner fa-spin"
                style="font-size: 20px;"
              ></i>
            </span>

            <input v-if="!supportGif" type="file" accept="image/*" @change="loadCover" />
            <Thumbnail v-if="cover.link" :src="cover.link" ratio="1-1" />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button
          type="button"
          @click="uploadVideo()"
          :disabled="loadingUpvideo"
          class="btn btn-primary btn-sm"
        >
          <i class="fa fa-plus"></i> Thêm
          <i v-if="loadingUpvideo" class="fa fa-spinner fa-spin"></i>
        </button>
      </template>
    </model>
    <model-trans modelwidth="70%" margintop="20px" title="Media" :isOpen.sync="showviewmedia">
      <div>
        <div class="slide-detail-image">
          <hooper
            style="height: 350px;"
            ref="carousel"
            @slide="updateCarousel"
            :infiniteScroll="true"
          >
            <slide v-for="(item,index) in list_photo" :key="index">
              <div v-if="tab_control">
                <button type="button" @click="openTagMedia(item)" class="btn btn-primary btn-sm" >
                  Cập nhật tag
                </button>
              </div>
              <div class="detail-image">
                <img :src="item.link" />
              </div>
            </slide>
          </hooper>
          <div class="bt-left" @click="slideBack()">
            <i class="fa fa-chevron-left"></i>
          </div>
          <div class="bt-right" @click="slideNext()">
            <i class="fa fa-chevron-right"></i>
          </div>
        </div>
        <div class="slide-list-image">
          <div class="list-image">
            <div class="list-item" v-for="(item,index) in list_photo" :key="index">
              <div @click="viewImageSlide(index)">
                <Thumbnail :src="item.link" ratio="1-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </model-trans>
    <model-trans modelwidth="75%" margintop="20px" title="Media" backgroundcolor="rgb(200, 200, 200)" :isOpen.sync="showtagmedia">
      <div>
        <div class="slide-detail-image">
          <div style="margin: 5px;" v-if="tab_control">
            <input type="text" v-model="tag_text" />
            <button type="button" v-if="!isAddTag" @click="addTabtoMedia(current_media)" class="btn btn-primary btn-sm" >
              <i class="fa fa-plus"></i> Thêm tag
            </button>
          </div>
          <div class="detail-image">
            <img style="border: 1px solid #6f6f6f; padding: 1px; border-radius: 4px;" :src="current_media.link" />
            <div v-if="tab_control">{{temp_value}}</div>
            <div class="map-tag">
              <div class="wrapper_tag">
                <drag-it-dude
                  :id="'item-tag-' + tag_item.id"
                  v-for="(tag_item,i) in current_media.list_tag"
                  v-bind:key="tag_item.id" 
                  :key="tag_item.id"
                  @dropped="onDropped(tag_item)"
                >
                  <div class="div-text">{{tag_item.text}}
                    <div @click="remove_tag(tag_item)" class="btn-remove-tag">X</div>
                    <div v-if="tag_item.state == 'new' || tag_item.state == 'update'" @click="update_tag(tag_item)" class="btn-update-tag"><i class="fa fa-check"></i></div>
                  </div>
                </drag-it-dude>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-list-image">
          <div class="list-image">
            <div class="list-item" v-for="(item,index) in list_photo" :key="index">
              <div v-if="!tab_control" @click="viewImageSlide(index)">
                <Thumbnail :src="item.link" ratio="1-1" />
              </div>
              <div style="margin: 5px;cursor: pointer;" v-if="tab_control" @click="viewImageTag(index)">
                <Thumbnail :src="item.link" ratio="1-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </model-trans>
  </div>
</template>
<script>
import Vue from 'vue';
import moment from "moment";
import DragItDude from 'vue-drag-it-dude';
import Util from "@/util";
import { mapActions } from "vuex";

export default {
  // components: {
  //   draggable
  // },
  components: {
    DragItDude
  },
  props: {
    name: {
      type: String,
      default: "name"
    },
    author_uuid: {},
    list_photo: {
      type: Array
    },
    isUpload: {
      type: Boolean,
      default: true
    },
    isVideo: {
      type: Boolean,
      default: true
    },
    warterMark: {
      type: Boolean,
      default: false
    },
    tab_control:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showtagmedia:false,
      supportGif: true,
      loadingUpimage: false,
      loadingPercent: 0,
      loadingUpvideo: false,
      loadingCreate: false,
      showadd_video: false,
      video: {
        link: null,
        file: null
      },
      cover: {
        link: null,
        file: null
      },
      showviewmedia: false,
      list_image_view: [],
      carouselData: 0,
      tag_text: null,
      isAddTag: false,
      current_media : {
      },
      tag_x : 0,
      tag_y : 0,
      temp_value: 0
    };
  },
  async mounted() {
    this.supportGif = gifshot.isSupported();
    this.temp_value = 0;
  },
  methods: {
    ...mapActions({
      getMediaTagDetail: "media/getMediaTagDetail",
      addTagToMedia: "media/addTagToMedia",
      updateTagToMedia: "media/updateTagToMedia",
      deleteTagToMedia: "media/deleteTagToMedia",
      createTag: "tag/createTag"
    }),
    openTagMedia(media){
      this.showtagmedia = true;
      this.current_media = media;
      this.load_tag(this.current_media.uuid);
    },
    showUploadVideo() {
      this.video = {
        link: null,
        file: null
      };
      this.cover = {
        link: null,
        file: null
      };
      this.showadd_video = true;
    },
    loadVideo(e) {
      var reader = new FileReader();
      if (this.supportGif) {
        this.loadingCreate = true;

        reader.addEventListener(
          "load",
          () => {
            var dataUrl = reader.result;
            var videoId = "videoMain";
            var $videoEl = $(
              '<video style="display:none" id="' + videoId + '"></video>'
            );
            $("body").append($videoEl);
            $videoEl.attr("src", dataUrl);

            var videoTagRef = $videoEl[0];
            videoTagRef.addEventListener("loadedmetadata", e => {
              gifshot.createGIF(
                {
                  video: [this.video.file],
                  gifHeight: parseInt(
                    (360 * videoTagRef.videoHeight) / videoTagRef.videoWidth
                  ),
                  gifWidth: 360,
                  numFrames: 24,
                  frameDuration: 1,
                  numWorkers: 2,
                  interval: 0.09,
                  progressCallback: captureProgress => {
                    this.loadingPercent = captureProgress
                      ? parseInt(captureProgress * 100)
                      : 0;
                  }
                },
                obj => {
                  if (!obj.error) {
                    var image = obj.image;
                    this.cover.link = image;
                    fetch(image)
                      .then(res => res.blob())
                      .then(blob => {
                        this.cover.file = new File([blob], "cover.gif", {
                          type: "image/gif"
                        });
                        this.loadingCreate = false;
                      });
                  } else {
                    this.loadingCreate = false;
                  }
                }
              );
            });
          },
          false
        );
      }

      var URL = window.URL || window.webkitURL;
      let file = e.target.files[0];
      reader.readAsDataURL(file);
      this.video.file = file;
      this.video.link = URL.createObjectURL(file);
    },
    async loadCover(e) {
      let file = e.target.files[0];
      this.cover.file = file;
      this.cover.link = await Util.fileToBase64(file);
    },
    async appImageToReview() {
      if (
        this.warterMark &&
        (!this.author_uuid ||
          (this.author_uuid && this.author_uuid.uuid === -1))
      ) {
        this.$Notification({
          type: "warning",
          title: "Chú ý!",
          message: "Vui lòng chọn người viết bài"
        });
        return;
      }
      $(`#${this.name}-bt-image-button`).click();
    },
    async loadImageFile(e) {
      let files = e.target.files;
      this.loadingUpimage = true;
      for (var i = 0; i < files.length; i++) {
        if (files[i].size >= 5000000) {
          this.$Notification({
            type: "warning",
            title: "Chú ý!",
            message: "File ảnh tải lên có dung lượng vượt mức 5MB!"
          });
          this.loadingUpimage = false;
          return;
        } else {
          let params = this.warterMark
            ? {
                apply_watermark: true,
                watermark_with_name: true,
                author_uuid:
                  Object.keys(this.author_uuid).length > 0
                    ? this.author_uuid.uuid
                    : this.author_uuid
              }
            : {};
          let r = await this.$callApi({
            method: "post",
            lixi_review: true,
            imageFile: files[i],
            url: "media/image",
            data: params
          });

          if (!r.meta.success) return;
          if (r.data.length == 0) return;

          this.list_photo.push({
            type: "image",
            link: r.data[0].media_link,
            uuid: r.data[0].uuid,
            up_state: true
          });
        }
      }
      this.loadingUpimage = false;
    },
    async uploadVideo() {
      if (this.video.file && this.cover.file) {
        this.loadingUpvideo = true;
        let r = await this.$callApi({
          method: "post",
          lixi_review: true,
          coverFile: this.cover.file,
          videoFile: this.video.file,
          url: "media/video"
        });
        this.loadingUpvideo = false;
        if (!r.meta.success) return;
        if (r.data.length == 0) return;

        this.list_photo.push({
          type: "video",
          link: r.data.media_link,
          uuid: r.data.uuid,
          cover: r.data.cover_video_link,
          up_state: true
        });
        this.showadd_video = false;
      }
    },
    removeMedia(uuid) {
      this.list_photo = this.list_photo.filter(item => item.uuid != uuid);
      this.$emit("removeMedia", uuid);
      this.$emit("update:list_photo", this.list_photo);
    },
    log() {
      this.$emit("update:list_photo", this.list_photo);
    },
    viewImage(item, index) {
      this.showviewmedia = true;
      let seft = this;
      setTimeout(function() {
        seft.$refs.carousel.slideTo(index);
      }, 400);
    },
    updateCarousel(payload) {
      this.myCarouselData = payload.currentSlide;
    },
    viewImageSlide(index) {
      this.$refs.carousel.slideTo(index);
    },
    slideBack() {
      this.$refs.carousel.slidePrev();
    },
    slideNext() {
      this.$refs.carousel.slideNext();
    },
    onDropped(item) {
      if($("#item-tag-" + item.id)){
        this.tag_x = parseInt($("#item-tag-" + item.id).css("left"));
        this.tag_y = parseInt($("#item-tag-" + item.id).css("top"));
      }
      
      if(item.state != 'new'){
        item.state = 'update';
        this.temp_value = this.temp_value + 1;
      }
    },
    viewImageTag(media){
      this.current_media = media;
      this.load_tag(this.current_media.uuid);
    },
    async load_tag(media_uuid){
      let resData = await this.getMediaTagDetail({
        media_id: media_uuid
      });
      if(resData.length > 0){
        this.current_media.list_tag = [];
        let seft = this;
        resData.forEach(function(tag){
            seft.current_media.list_tag.push({
              text: "#" + tag.name,
              id: tag.tag_uuid,
              state: 'current',
              left : tag.coordinate_x,
              top : tag.coordinate_y
            })
          });

        setTimeout(function(){
          seft.tag_text = '';
        }, 200);

        

        setTimeout(function(){
          seft.current_media.list_tag.forEach(function(item){
            $("#item-tag-" + item.id).css({top: item.top, left: item.left});
          });
        }, 500);
        
      }
    },
    addTabtoMedia(item){
      if(this.tag_text){
        if(item.list_tag){
            item.list_tag.push({
            text: "#" + this.tag_text,
            id: moment().valueOf(),
            state: 'new'
          });
        }
        else{
          item.list_tag = [{
            text: "#" + this.tag_text,
            id: moment().valueOf(),
            state: 'new'
          }]
        }
        this.tag_text = null;
      }
    },
    async update_tag(item){
      await Util.showConfirm(this);
      if(item.state === 'new'){//thêm mới tag cho media
        let tag_Name = item.text.replace("#",'');
        await this.createTag({
          params: {
            name : tag_Name,
            state : 'active'
          },
          callback: {
            success: async resTag => {
              if(resTag.uuid){
                await this.addTagToMedia({
                  media_uuid: this.current_media.uuid,
                  tag_uuid: resTag.uuid,
                  params: {
                    coordinate_x : this.tag_x,
                    coordinate_y : this.tag_y
                  },
                  callback: {
                    success: async res => {
                      item.state = "updated";
                      this.temp_value = this.temp_value + 1;
                      this.$Notification({
                        type: "success",
                        title: "Thành công",
                        message: `Thêm tag mới thành công`
                      });
                    },
                    error: res => {
                      this.$Notification({
                        type: "error",
                        title: "Thất bại",
                        message: `Thêm tag mới thất bại`
                      });
                    }
                  }
                });
              }
            },
            error: res => {
              this.$Notification({
                type: "error",
                title: "Thất bại",
                message: `Thêm tag mới thất bại`
              });
            }
          }
        });
      }
      if(item.state === 'update'){
        await this.updateTagToMedia({
          media_uuid: this.current_media.uuid,
          tag_uuid: item.id,
          params: {
            coordinate_x : this.tag_x,
            coordinate_y : this.tag_y
          },
          callback: {
            success: async res => {
              item.state = "updated"
              this.$Notification({
                type: "success",
                title: "Thành công",
                message: `Cập nhật thành công`
              });
            },
            error: res => {
              this.$Notification({
                type: "error",
                title: "Thất bại",
                message: `Cập nhật thất bại`
              });
            }
          }
        });
      }
    },
    async remove_tag(item){
      if(item.state != 'new'){
        await Util.showConfirm(this);
        await this.deleteTagToMedia({
          media_uuid: this.current_media.uuid,
          tag_uuid: item.id,
          callback: {
            success: async res => {
              this.$Notification({
                type: "success",
                title: "Thành công",
                message: `Xóa tag thành công`
              });
              this.current_media.list_tag.splice(this.current_media.list_tag.findIndex(v => v.id === id), 1);
              this.tag_text = ' ';
            },
            error: res => {
              this.$Notification({
                type: "error",
                title: "Thất bại",
                message: `Xóa tag thất bại`
              });
            }
          }
        });
      }
      else{
        this.current_media.list_tag.splice(this.current_media.list_tag.findIndex(v => v.id === id), 1);
        this.temp_value = this.temp_value + 1;
      }
    },
  }
};
</script>
<style lang="scss" >
.control-upload {
  width: 80px;
  float: left;
  .add-image {
    width: 100px;
    height: 35px;
    line-height: 35px;
    padding: 0px;
    font-size: 11px;
    font-weight: 900;
    margin-left: 5px;
    margin-top: 5px;
  }
}
.item-media {
  margin-top: 24px;
  .img-wrapper {
    position: relative;
    overflow: hidden;
  }
  .number-index {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00000080;
    width: 100%;
    height: 100%;
    top: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 5px;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    transition: 0.3s all ease-in;
    -moz-transition: 0.3s all ease-in;
    -webkit-transition: 0.3s all ease-in;
  }
  .btn-remove {
    position: absolute;
    top: -10px;
    right: 0px;
    background: rgba(255, 128, 0, 0.65098);
    border-radius: 50%;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    z-index: 2;
    transition: 0.3s all ease-in;
    -moz-transition: 0.3s all ease-in;
    -webkit-transition: 0.3s all ease-in;
    display: none;
    i {
      line-height: 20px;
    }
  }
  &:hover {
    .btn-remove {
      display: flex;
      cursor: pointer;
    }
    .number-index {
      top: 0;
    }
  }
}
// .item-media {
//   position: relative;
//   float: left;
//   margin-right: 5px;
//   .img-media {
//     width: 100px;
//     height: 80px;
//     border-radius: 5px;
//     overflow: hidden;
//     .number-index {
//       position: absolute;
//       text-align: center;
//       color: #fff;
//       background-color: rgba(0, 0, 0, 0.53);
//       width: 26px;
//       height: 20px;
//       border-radius: 5px;
//       line-height: 20px;
//       font-weight: 600;
//       top: 1px;
//       left: 1px;
//       font-size: 10px;
//     }
//     .img-src {
//       width: 100%;
//       height: 100%;
//       border: 0.7px solid #b6b6b6;
//       object-fit: cover;
//       cursor: pointer;
//     }
//     .btn-remove {
//       position: absolute;
//       right: -5px;
//       top: -5px;
//       background-color: #000;
//       color: #fff;
//       width: 15px;
//       height: 15px;
//       text-align: center;
//       line-height: 18px;
//       font-size: 8px;
//       border-radius: 50%;
//       cursor: pointer;
//       border: 0.7px solid #000;
//       &:hover {
//         background-color: rgba(212, 69, 26, 0.7);
//         color: white;
//       }
//     }
//   }

// .video-item {
//   width: 140px;
//   height: 140px;
//   position: relative;
//   margin-left: 70px;
//   border-radius: 5px;
//   overflow: hidden;
//   .number-index {
//     position: absolute;
//     text-align: center;
//     color: #fff;
//     background-color: rgba(0, 0, 0, 0.53);
//     width: 26px;
//     height: 20px;
//     border-radius: 5px;
//     line-height: 20px;
//     font-weight: 600;
//     top: 1px;
//     left: 1px;
//     font-size: 10px;
//   }
//   video {
//     width: 100%;
//     height: 100%;
//   }
// }

.upload-container {
  position: relative;
  width: 220px;
  height: 140px;
  float: left;
  margin: 5px;
  border: 1px solid #d4d7e0;
  background-color: #d4d7e0;
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

  imgs {
    position: absolute;
    top: 0;
    left: 0;
    width: 770px;
    height: 1000px;
  }

  span {
    white-space: nowrap;
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  input {
    cursor: pointer;
    opacity: 0;
  }

  img {
    border: 0;
    object-fit: contain;
  }

  imgs {
    width: 770px;
    height: 1000px;
    object-fit: contain;
  }

  .video-upload-item {
    width: 220px;
    height: 150px;
  }
}
.upload-cover-container {
  position: relative;
  width: 220px;
  height: 140px;
  float: left;
  margin: 5px;
  border: 1px solid #d4d7e0;
  background-color: #d4d7e0;
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

  imgs {
    position: absolute;
    top: 0;
    left: 0;
    width: 770px;
    height: 1000px;
  }

  span {
    white-space: nowrap;
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  input {
    cursor: pointer;
    opacity: 0;
  }

  img {
    border: 0;
    object-fit: contain;
  }

  imgs {
    width: 770px;
    height: 1000px;
    object-fit: contain;
  }

  .video-upload-item {
    width: 220px;
    height: 150px;
  }
}
.slide-detail-image {
  height: 350px;
  .detail-image {
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    .map-tag{
      height: 330px;
      width: 600px;
      position: relative;
      margin-left: 50%;
      transform: translate(-50%);
      .wrapper_tag{
        width: 100%;
        height: 100%;
        .div-text{
          padding: 3px;
          border: 1px #404040 solid;
          border-radius: 3px;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor:pointer;
          position: relative;
          .btn-remove-tag {
            position: absolute;
            top: -10px;
            right: -15px;
            border: 1px solid white;
            border-radius: 50%;
            width: 15px;
            height: 15px;
            font-size: 10px;
            cursor: pointer;
          }
          .btn-update-tag{
            width: 20px;
            height: 17px;
            position: absolute;
            border: 1px white solid;
            padding: 0px;
            border-radius: 5px;
            font-size: 12px;
            background-color: rgba(30, 215, 95, 0.61);
            bottom: 0px;
            right: -20px;
          }
        }
      }
    }
    img {
      height: 330px;
      max-width: 600px;
      object-fit: cover;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }
  }
  .bt-left {
    position: absolute;
    top: 0px;
    left: 10px;
    height: 350px;
    line-height: 350px;
    font-size: 30px;
    cursor: pointer;
    color: #969696;
  }
  .bt-right {
    position: absolute;
    top: 0px;
    right: 10px;
    height: 350px;
    line-height: 350px;
    font-size: 30px;
    cursor: pointer;
    color: #969696;
  }
}
.slide-list-image {
  height: 50px;
  .list-image {
    float: left;
    margin-left: 50%;
    transform: translate(-50%);
    .list-item {
      width: 45px;
      height: 45px;
      float: left;
    }
  }
}
</style>