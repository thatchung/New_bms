<template>
  <multiselect
    :multiple="multiple"
    clearable
    v-model="value"
    @search-change="search"
    @open="search"
    @input="change"
    :deselect-label="''"
    :selected-label="''"
    :select-label="''"
    :loading="loading"
    track-by="id"
    :label="label"
    :placeholder="placeholder"
    :custom-label="itemLabel"
    :internal-search="false" 
    :options="data"
    :allow-empty="allowEmpty"
  >
   <template
      slot="noResult"
    >Không tìm thấy kết quả vui lòng nhập từ khóa tìm kiếm khác</template>
  </multiselect>
</template>

<script>
export default {
  name: "RemoteSelect",

  props: {
    value: null,
    "allow-empty": {
      type: Boolean,
      default: true
    },
    "remote-data": {
      type: Function,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "Tìm kiếm"
    },
    "track-by": {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    loadbefore: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    data: [],
    customOptionTemplate: false,
    loading: false,
    dataValueSelect: {
      title: null,
      id: null
    },
    timer: null
  }),

  methods: {
    itemLabel: function(item) {
      return item[this.label] ? item[this.label] : this.placeholder;
    },

    change: function(value) {
      this.$emit("input", value);
    },

    search: async function(query) {
      var seft = this;
      window.clearTimeout(seft.timer);
      seft.timer = window.setTimeout(async function() {
        seft.loading = true;
        seft.data = await seft.remoteData(query);
        seft.loading = false;
      }, 600);
    }
  },

  watch: {
    value: function() {
      if (!this.value || this.data.length > 0) return;
      this.dataValueSelect = this.value;
      this.data = this.multiple ? this.value : [this.value];
    }
  },

  mounted: function() {
    this.customOptionTemplate = this.$scopedSlots.item;
    if (this.loadbefore) this.search();
  }
};
</script>