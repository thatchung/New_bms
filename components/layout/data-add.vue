<template>
  <div class="content">
    <div class="container">
      <slot name="breadcrumb"></slot>
      <div class="row m-t-10">
        <div class="col-xs-12">
          <div class="row">
            <loading-item :loading="loading"></loading-item>
            <slot name="form"></slot>
          </div>
        </div>
      </div>

      <div class="clearfix"></div>
        <div class="card-box">
          <div class="table-rep-plugin">
            <div class="table-responsive">
              <slot name="table"></slot>
            </div>
          </div>
        </div>
    </div>
    <slot name="popup"></slot>
  </div>
</template>

<script>
export default {
  name: "data-list",
  props: {
    createLink: null,
    loading: true
  },
  methods: {},
  mounted() {}
};
</script>
