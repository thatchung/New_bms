<template>
  <div class="btn-group">
    <span class="dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="false">
      <button type="button" class="btn btn-primary btn-sm"><i class="mdi mdi-dots-vertical"></i></button>
    </span>
    <ul class="dropdown-menu" style="right: 0; left: unset;top: 0;text-align: center;min-width:6rem">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: "dropdown-item",
  props: {
    
  }
};
</script>

<style lang="scss">
.waves-effect{
  &:after {
    display: none;
  }
}
</style>