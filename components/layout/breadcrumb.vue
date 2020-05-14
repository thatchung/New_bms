<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="page-title-box">
        <h4 class="page-title">{{ title }}</h4>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout-breadcrumb",
  props: ["title"]
};
</script>