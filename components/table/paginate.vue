<template>
  <paginate
    v-if="meta && (meta.page !== 1 ? (meta.page-1) : meta.page)*meta.pageSize < meta.totalItem"
    :page-count="meta.pageCount "
    :margin-pages="4"
    :prev-text="'Prev'"
    :next-text="'Next'"
    v-model="meta.page"
    :container-class="'pagination'"
    :click-handler="pageChange"
    :page-class="'page-item'"
  ></paginate>
</template>

<script>

export default {
  props: {
    meta: {}
  },
  mounted() {},
  methods: {
    pageChange: function(page) {
      this.$emit("load", page);
    }
  }
};
</script>
