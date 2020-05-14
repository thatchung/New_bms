<template>
  <div>
    <i v-if="status === 'active' || status === 'Active' || status == true" class="mdi mdi-check text-success"></i>
    <i v-if="status === 'inactive' || status === 'inActive' || status == false" class="mdi mdi-close text-danger"></i>
  </div>
</template>

<script>
export default {
  name: "status",
  props: {
    status: null
  }
};
</script>
<style lang="scss" scoped>
i {
  font-size: 20px;
  font-weight: bold;
}
</style>