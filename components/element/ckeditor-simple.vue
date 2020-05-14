<template>
  <div>
    <vue-ckeditor v-model="message" :readOnlyMode="readonlymode" :id="uuid" :config="config"></vue-ckeditor>
  </div>
</template>
<script>
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
    height: {
      type: Number,
      default: 100
    },
    messageHtml: {
      type: String,
      default: null
    }
  },
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
      config: {
        toolbar: [
          {
            name: "clipboard",
            items: [
              "Bold",
              "Italic",
              "Underline",
              "RemoveFormat",
              "TextColor",
              "BGColor",
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
              "Smiley",
              "Font",
              "FontSize"
            ]
          },
          { name: "links", items: ["Link", "Unlink"] }
        ],
        height: this.height
        // extraPlugins: 'Timestamp'
      },
      current_img: null
    };
  },
  methods: {},
  watch: {
    deep: true
  }
};
</script>