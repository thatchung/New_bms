<template>
  <div>
    <vue-ckeditor
      v-model="message"
      :readOnlyMode="readonlymode"
      :id="uuid"
      :config="config"
      @blur="onBlur($event)"
      @focus="onFocus($event)"
      @contentDom="onContentDom($event)"
      @dialogDefinition="onDialogDefinition($event)"
    ></vue-ckeditor>
    <input
      :id="'edit-bt-image-button'"
      style="display: none;"
      type="file"
      accept="image/*"
      multiple
      @change="loadImageFile"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import VueCkeditor from "vue-ckeditor2";
export default {
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    uuid: {
      type: String,
      default: "editer-id"
    },
    messageHtml: {
      type: String,
      default: null
    },
    listImageUuid: {
      type: Array,
      default: []
    },
    placeholder: 
    {
      type: String
    },
          
  },
  ...mapActions({
    postbyUrl: "common/postbyUrl"
  }),
  components: {
    "vue-ckeditor": VueCkeditor
  },
  computed: {
    message: {
      get: function() {
        return this.messageHtml;
      },
      set: function(newValue) {
        this.$emit("update:messageHtml", newValue);
      }
    },
    readonlymode: {
      get: function() {
        return this.readonly;
      }
    }
  },
  data() {
    return {
      listMedia: [],
      config: {
        filebrowserBrowseUrl: "/media",
        toolbar: [
          {
            name: "document",
            items: ["Source", "-", "Save", "Preview", "Print"]
          },
          {
            name: "clipboard",
            items: [
              "Cut",
              "Copy",
              "Paste",
              "PasteText",
              "PasteFromWord",
              "-",
              "Undo",
              "Redo"
            ]
          },
          "/",
          {
            name: "basicstyles",
            items: [
              "Find",
              "SelectAll",
              "-",
              "Bold",
              "Italic",
              "Underline",
              "Strike",
              "Subscript",
              "Superscript",
              "-",
              "CopyFormatting",
              "RemoveFormat",
              "TextColor",
              "BGColor"
            ]
          },
          {
            name: "paragraph",
            items: [
              "NumberedList",
              "BulletedList",
              "-",
              "Outdent",
              "Indent",
              "-",
              "JustifyLeft",
              "JustifyCenter",
              "JustifyRight",
              "JustifyBlock",
              "Language"
            ]
          },
          { name: "links", items: ["Link", "Unlink"] },
          {
            name: "insert",
            items: [
              "Font",
              "FontSize",
              "Image",
              "Flash",
              "Table",
              "HorizontalRule",
              "Smiley",
              "SpecialChar",
              "Iframe",
              "uploadimagefile"
            ]
          }
        ],
        height: 300
        // extraPlugins: 'Timestamp'
      },
      current_img: null
    };
  },
  beforeMount() {
    if (window.localStorage.hasOwnProperty("list_image")) {
      window.localStorage.removeItem("list_image");
    }
  },
  mounted() {
    if(this.placeholder && (!this.messageHtml || this.messageHtml == '' || this.messageHtml == null)){
      this.message = '<p style="color: #5d5d5d;">' + this.placeholder + '</p>'
    }
  },
  beforeUpdate() {
    this.checkData();
  },
  methods: {
    onBlur(evt) {
      this.checkData();
    },
    onFocus(evt) {
      this.checkData();
    },
    onContentDom(evt) {
      this.checkData();
    },
    onDialogDefinition(evt) {
      evt;
    },
    checkData() {
      if (window.localStorage.hasOwnProperty("list_image")) {
        let list_media = JSON.parse(window.localStorage.getItem("list_image"));
        for (let img of list_media) {
          let findIndex = this.listImageUuid.findIndex(x => x == img);
          if (findIndex < 0) {
            this.listImageUuid.push(img);
          }
        }
      }

      if (this.message) {
        this.$emit("update:messageHtml", this.messageHtml);
      }

      this.$emit("update:listImage", this.listImageUuid);

      this.$emit("load");
    },
    async loadImageFile(e) {
      let files = e.target.files;
      for (var i = 0; i < files.length; i++) {
        if (files[i].size >= 3000000) {
          this.$Notification({
            type: "warning",
            title: "Chú ý!",
            message: "File ảnh tải lên có dung lượng vượt mức 3MB!"
          });
          return;
        } else {
          let params = this.warterMark
            ? {
                apply_watermark: true,
                watermark_with_name: true,
                author_uuid: this.author_uuid
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

          CKEDITOR.instances["editer-id"].insertHtml(
            "<p style='text-align: center;'><img data-uploaded='Uploaded' " +
              "src='" +
              r.data[0].media_link +
              "' style='display: block; " +
              " max-width: 96%;margin:0px auto;' /></p>"
          );
        }
      }
    }
  },
  watch: {
    deep: true
  }
};
</script>