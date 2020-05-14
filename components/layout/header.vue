<template>
  <div class="topbar">
    <!-- LOGO -->
    <div class="topbar-left">
      <a href="/" class="logo">
        <span>
          <span>Admin</span>
        </span>
        <i class="mdi mdi-layers"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout-header",

  data: () => ({}),
  computed: {
    title: function() {}
  },

  mounted() {},
  methods: {
    logout: async function() {
      this.$store.commit("common/clearSession");
      this.$router.push("/login");
    }
  }
};
</script>