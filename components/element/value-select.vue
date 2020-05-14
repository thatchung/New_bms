<template>
  <multiselect
    :multiple="multiple"
    v-model="valueSelect"
    @input="change"
    :deselect-label="''"
    :selected-label="''"
    :selected="value"
    :select-label="''"
    :loading="loading"
    :tag-placeholder="tag_placeholder"
    :placeholder="placeholder"
    :options="options"
    :searchable="searchable"
    :taggable="taggable"
    @tag="addTag"
    :allow-empty="true"
  >
    <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>
  </multiselect>
</template>

<script>
export default {
  name: "SelectList",
  props: {
    value: {
      type: Array,
      default: []
    },
    label: {
      type: String,
      default: ""
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "Tìm kiếm"
    },
    state: {
      type: String,
      default: "active"
    },
    searchable: {
      type: Boolean,
      default: false
    },
    taggable: {
      type: Boolean,
      default: false
    },
    tag_placeholder: {
      type: String,
      default: "Thêm mới"
    },
    loadbefore: {
      type: Boolean,
      default: false
    },
    numget: {
      type: Number,
      default: 10
    },
    choiceInactive: {
      type: Boolean,
      default: true
    },
    data: null
  },
  data: () => ({
    customOptionTemplate: false,
    loading: false,
    options: [],
    valueSelect: []
  }),
  mounted() {
    setTimeout(() => {
      for (var i = 0; i < this.value.length; i++) {
        this.options.push(this.value[i]);
        this.valueSelect.push(this.value[i]);
      }
    }, 5000);
  },
  methods: {
    change: function(value) {
      this.value = null;
      this.$emit("input", []);
    },
    addTag(newTag) {
      this.options.push(newTag);
      this.valueSelect.push(newTag);
      this.$emit("input", this.options);
    }
  }
};
</script>