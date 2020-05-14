<template>
  <div class="content">
    <div class="container">
      <slot name="breadcrumb"></slot>
      <div class="row m-t-10">
        <div class="col-xs-12">
          <div class="row">
            <slot name="statistics"></slot>
          </div>
        </div>
        <div class="col-xs-12">
          <slot name="filter"></slot>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <template v-if="checkCreatedLink">
            <NuxtLink :to="createLink" class="add-btn mg-10">
              <div class="btn btn-primary waves-effect waves-light m-b-20">
                <i :class="`${icon} m-r-5`"></i>
                <span>{{text}}</span>
              </div>
            </NuxtLink>
          </template>

          <template v-else>
            <div
              v-if="hasBtn"
              class="btn btn-primary waves-effect waves-light m-b-20"
              @click="handleFunctionClick()"
            >
              <i :class="`${icon} m-r-5`"></i>
              <span>{{text}}</span>
            </div>
          </template>

          <div class="clearfix"></div>
          <div class="card-box">
            <div class="table-rep-plugin">
              <div class="table-responsive">
                <slot name="table"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>

      <slot name="popup"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "data-list",
  props: {
    createLink: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: "Thêm mới"
    },
    hasBtn: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: "fa fa-plus"
    }
  },
  computed: {
    checkCreatedLink: function() {
      if (this.createLink == "") {
        return false;
      }
      return true;
    }
  },
  methods: {
    handleFunctionClick: function() {
      this.$emit("functionClick");
    }
  },
  mounted() {}
};
</script>
