<template>
  <section>
    <div class="container-alt">
      <div class="row">
        <div class="col-sm-12 text-center">
          <div class="wrapper-page">
            <Thumbnail
              :src="this.error.statusCode === 404 ? '/images/common/error.gif' : (this.error.statusCode === 403 ? '/images/common/not_found.gif' : '/images/common/error.gif')  "
              ratio="1-1"
            />
            <h2
              class="text-uppercase text-danger"
            >{{ this.error.statusCode === 404 ? 'Không tìm thấy trang' : (this.error.statusCode == 403 ? 'Không có quyền truy cập' : 'Có lỗi xảy ra') }}</h2>
            <p
              class="text-muted"
            >{{ this.error.statusCode === 404 ? 'Đường dẫn này không khả dụng. Vui lòng liên hệ admin hoặc thử lại!' : (this.error.statusCode == 403 ? 'Bạn không có quyền truy cập đường dẫn này. Vui lòng liên hệ admin hoặc thử lại!' :'Lỗi hệ thống, vui lòng liên hệ admin để được hỗ trợ hoặc thử lại') }}</p>

            <a class="btn btn-primary waves-effect waves-light m-t-20" href="/">Về trang chủ</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["error"],
  components: {},
  mounted() {}
};
</script>