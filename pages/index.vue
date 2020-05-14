<template>
  <div class="content">
    <div class="container">
      <h2 title="Trang chủ"></h2>
      <div class="row m-t-10 m-b-30">
        <div class="col-xs-12">
          <div class="row">
            <div class="col-md-3 col-sm-6">
              <div
                class="box-satastic card-box widget-box-two widget-two-danger"
              >
                  <i
                    :class="`mdi mdi-city widget-two-icon animated`"
                  ></i>
                  <div class="wigdet-one-content">
                    <p
                      class="m-0 text-uppercase font-600 font-secondary text-overflow"
                      title="Tổng địa điểm"
                    >Tổng kol</p>
                    <h2>100</h2>
                  </div>
              </div>
            </div>

            <div class="col-md-3 col-sm-6">
              <div
                class="box-satastic card-box widget-box-two widget-two-warning">
                <nuxt-link to="/review">
                  <i
                    :class="`mdi mdi-new-box widget-two-icon animated `"
                  ></i>
                  <div class="wigdet-one-content">
                    <p
                      class="m-0 text-uppercase font-600 font-secondary text-overflow"
                      title="Tổng review"
                    >Tổng tiền</p>
                    <h2>0</h2>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
export default {
  name: "mainApp",
  layout: "app",
  computed: {
  },
  data: () => ({

  }),
  mounted() {

  },
  methods: {

  }
};
</script>

<style lang="scss">
.box-satastic {
  transition: 0.3s all ease-in-out;
  a {
    color: #797979;
  }
}
.box-satastic:hover {
  box-shadow: 0 0 10px 0 silver;
  a {
    color: #797979;
  }
}
</style>