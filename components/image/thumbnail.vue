<template>
  <div
    :class="`thumbnail-wrapper display-flex align-items justify-content ratio_${ratio} ${className}`"
  >
    <img
      v-if="replace"
      :class="'thumbnail-inner img-rounded ' + addclass"
      :src="(src == null || src == '' ) ? '/images/no-image.jpg' : src"
      :alt="alt"
      @error="replaceImageByDefault"
    />
    <img v-else class="thumbnail-inner img-rounded" :src="src" />
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: "no-image.jpg"
    },
    src: {
      type: String,
      default: "/images/no-image.jpg"
    },
    ratio: {
      type: String,
      default: "1-1"
    },
    replace: {
      type: Boolean,
      default: true
    },
    addclass: {
      type: String,
      default: ""
    },
  },
  methods: {
    replaceImageByDefault: function(e, img = "") {
      e.target.src = img !== "" ? img : "/images/no-image.jpg";
    }
  }
};
</script>


<style lang="scss" scoped>
.thumbnail-wrapper {
  background-color: transparent;
  width: 100%;
  position: relative; /* If you want text inside of it */
  &.ratio_banner {
    padding-top: 23%; /* Aspect Ratio custom for banner */
  }
  &.ratio_banner-home {
    padding-top: 33%; /* Aspect Ratio custom for banner at home page */
  }
  &.ratio_1-1 {
    padding-top: 100%; /* 1:1 Aspect Ratio */
  }
  &.ratio_4-3 {
    padding-top: 75%; /* 4:3 Aspect Ratio */
  }
  &.ratio_16-9 {
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  &.ratio_3-2 {
    padding-top: 66.66%; /* 3:2 Aspect Ratio */
  }
  &.ratio_8-5 {
    padding-top: 62.5%; /* 8:5 Aspect Ratio */
  }
  .thumbnail-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
  }
  &.loading {
    .thumbnail-inner {
      width: unset;
      height: unset;
      object-fit: contain;
      top: 30%;
    }
  }
}
@media (max-width: 768px) {
  .thumbnail-wrapper {
    &.ratio_banner-home {
      padding-top: 70%; /* Aspect Ratio custom for banner */
    }
    &.ratio_banner {
      padding-top: 40%; /* Aspect Ratio custom for banner */
    }
  }
}
</style>

