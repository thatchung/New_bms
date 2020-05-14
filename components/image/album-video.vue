<template>
  <div style="width: 100%;min-height: 60px;">
    <div class="row item-media-video" v-for="(item,index) in list_photo" :key="index">
      <div class="col-sm-12">
        <div class="col-sm-2" style="padding: 0px">
          <div class="video-item">
            <video controls>
              <source :src="item.link" type="video/mp4" />
            </video>
          </div>
        </div>
        <div class="col-sm-2">
          <div class="img-media">
            <Thumbnail class="img-src" :src="item.cover" ratio="1-1" />
          </div>
        </div>
        <div class="col-sm-6">
          <textarea class="el-input" v-model="item.description" style="height: 80px"></textarea>
        </div>
        <div class="col-sm-2">
          <i
            @click="removeMedia(item.uuid)"
            class="el-icon-circle-close el-button"
            style="float: left;color:rgb(230, 122, 109);font-size: 20px;cursor: pointer;"
          ></i>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <button
          type="button"
          v-if="isUpload && isVideo"
          @click="showUploadVideo()"
          class="btn btn-primary btn-sm"
        >
          <i class="fa fa-plus"></i> Add Video
        </button>
      </div>
    </div>
    <model title="Thêm video" :isOpen.sync="showadd_video">
      <template v-slot:body>
        <el-col :md="24">
          <el-col :md="6">
            <label for>Video:</label>
          </el-col>
          <el-col :md="18">
            <div class="upload-container-video">
              <span v-if="!video.link">Click để chọn video</span>
              <input type="file" accept="video/*" @change="loadVideo" />
              <video v-if="video.link" class="video-upload-item" controls>
                <source :src="video.link" type="video/mp4" />
              </video>
            </div>
          </el-col>
        </el-col>
        <el-col :md="24" class="m-t-10">
          <el-col :md="6">
            <label for>Cover:</label>
          </el-col>
          <el-col :md="18">
            <div class="upload-container-video">
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
          </el-col>
        </el-col>
        <el-col :md="24" class="m-t-10">
          <el-col :md="6">
            <label for>Description:</label>
          </el-col>
          <el-col :md="18">
            <textarea class="el-input" v-model="description" style="height: 80px"></textarea>
          </el-col>
        </el-col>
      </template>
      <template v-slot:footer>
        <button
          :disabled="loading"
          type="button"
          @click="uploadVideo()"
          class="btn btn-primary btn-sm"
        >
          <i class="fa fa-plus"></i> Thêm
          <i v-if="loading" class="fa fa-spinner fa-spin"></i>
        </button>
      </template>
    </model>
  </div>
</template>
<script>
import Util from "@/util";

export default {
  props: {
    name: {
      type: String,
      default: "name"
    },
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
    }
  },
  data() {
    return {
      supportGif: true,
      loadingCreate: false,
      loadingPercent: 0,
      loadingUpimage: false,
      loading: false,
      showadd_video: false,
      video: {
        link: null,
        file: null
      },
      description: null,
      cover: {
        link: null,
        file: null
      },
      showviewmedia: false,
      list_image_view: [],
      carouselData: 0
    };
  },
  async mounted() {
    this.supportGif = gifshot.isSupported();
  },
  methods: {
    showUploadVideo() {
      this.video = {
        link: null,
        file: null
      };
      this.description = null;
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
    // loadVideo(e) {
    //   this.loadingCreate = true;
    //   var reader = new FileReader();
    //   reader.addEventListener(
    //     "load",
    //     () => {
    //       var dataUrl = reader.result;
    //       var videoId = "videoMain";
    //       var $videoEl = $(
    //         '<video style="display:none" id="' + videoId + '"></video>'
    //       );
    //       $("body").append($videoEl);
    //       $videoEl.attr("src", dataUrl);

    //       var videoTagRef = $videoEl[0];
    //       videoTagRef.addEventListener("loadedmetadata", e => {
    //         gifshot.createGIF(
    //           {
    //             video: [this.video.file],
    //             gifHeight: parseInt(
    //               (480 * videoTagRef.videoHeight) / videoTagRef.videoWidth
    //             ),
    //             gifWidth: 480,
    //             numFrames: 5,
    //             frameDuration: 4,
    //             numWorkers: 1,
    //             progressCallback: captureProgress => {
    //               this.loadingPercent = captureProgress
    //                 ? parseInt(captureProgress * 100)
    //                 : 0;
    //             }
    //           },
    //           obj => {
    //             this.loadingCreate = false;
    //             if (!obj.error) {
    //               var image = obj.image;
    //               this.cover.link = image;
    //               fetch(image)
    //                 .then(res => res.blob())
    //                 .then(blob => {
    //                   this.cover.file = new File([blob], "cover.gif", {
    //                     type: "image/gif"
    //                   });
    //                 });
    //             }
    //           }
    //         );
    //       });
    //     },
    //     false
    //   );

    //   var URL = window.URL || window.webkitURL;
    //   let file = e.target.files[0];
    //   reader.readAsDataURL(file);
    //   this.video.file = file;
    //   this.video.link = URL.createObjectURL(file);
    // },
    async loadCover(e) {
      let file = e.target.files[0];
      this.cover.file = file;
      this.cover.link = await Util.fileToBase64(file);
    },
    async uploadVideo() {
      if (this.video.file && this.cover.file) {
        this.loading = true;
        let r = await this.$callApi({
          method: "post",
          lixi_review: true,
          coverFile: this.cover.file,
          videoFile: this.video.file,
          data: { description: this.description },
          url: "media/video"
        });
        this.loading = false;
        if (!r.meta.success) return;
        if (r.data.length == 0) return;

        this.list_photo.push({
          type: "video",
          link: r.data.media_link,
          uuid: r.data.uuid,
          cover: r.data.cover_video_link,
          description: r.data.description,
          up_state: true
        });
        this.$emit("update:list_photo", this.list_photo);
        this.showadd_video = false;
      }
    },
    removeMedia(uuid) {
      this.list_photo = this.list_photo.filter(item => item.uuid != uuid);
      this.$emit("update:list_photo", this.list_photo);
    }
  }
};
</script>
<style lang="scss" >
.control-upload {
  width: 80px;
  float: left;
  .add-image {
    width: 60px;
    height: 35px;
    line-height: 35px;
    padding: 0px;
    font-size: 11px;
    font-weight: 900;
    margin-left: 5px;
    margin-top: 5px;
  }
}
.item-media-video {
  width: 100%;
  position: relative;
  float: left;
  margin-bottom: 10px;
  .img-media {
    width: 100px;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
    .number-index {
      position: absolute;
      text-align: center;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.53);
      width: 26px;
      height: 20px;
      border-radius: 5px;
      line-height: 20px;
      font-weight: 600;
      top: 1px;
      left: 1px;
      font-size: 10px;
    }
    .img-src {
      width: 100%;
      height: 100%;
      border: 0.7px solid #b6b6b6;
      object-fit: cover;
      cursor: pointer;
    }
    .btn-remove {
      position: absolute;
      right: -5px;
      top: -5px;
      background-color: #000;
      color: #fff;
      width: 15px;
      height: 15px;
      text-align: center;
      line-height: 18px;
      font-size: 8px;
      border-radius: 50%;
      cursor: pointer;
      border: 0.7px solid #000;
      &:hover {
        background-color: rgba(212, 69, 26, 0.7);
        color: white;
      }
    }
  }

  .video-item {
    width: 140px;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
    .number-index {
      position: absolute;
      text-align: center;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.53);
      width: 26px;
      height: 20px;
      border-radius: 5px;
      line-height: 20px;
      font-weight: 600;
      top: 1px;
      left: 1px;
      font-size: 10px;
    }
    video {
      width: 100%;
      height: 100%;
    }
  }
}
.upload-container-video {
  position: relative;
  width: 150px;
  height: 120px;
  float: left;
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
    width: 150px;
    height: 120px;
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
    img {
      height: 330px;
      max-width: 600px;
      object-fit: cover;
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