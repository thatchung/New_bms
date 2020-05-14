<template>
  <div>
    <table
      v-if="value.items && value.items.length > 0"
      id="tech-companies-1"
      :class="`m-t-20 table m-b-0 ${type}`"
    >
      <slot></slot>
      <tfoot>
        <tr>
          <td colspan="4" v-if="paging">
            <no-ssr>
              <paginate-component @load="submitForm" :meta.sync="value.meta" />
            </no-ssr>
          </td>
        </tr>
      </tfoot>
    </table>
    <div v-if="showEmpty">Hiện chưa có dữ liệu</div>
  </div>
</template>

<script>
export default {
  name: "table-view",
  props: {
    value: null,
    paging: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "tablesaw"
    }
  },
  data() {
    return {
      showEmpty: false
    };
  },
  watch: {
    value: function(val) {
      if (val.items) {
        this.showEmpty = val.items.length === 0;
      } else {
        this.showEmpty = true;
      }
    }
  },
  methods: {
    submitForm: function(page) {
      this.$emit("load", page);
    }
  },
  mounted() {}
};
</script>
