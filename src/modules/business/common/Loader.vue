<template>
  <div class="row g-1" :class="rowClass">
    <div :class="classCol" v-for="index in itemLoop" :key="index">
      <div class="w-100 animated-background" :class="bgClass" :style="'height:' + height"></div>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
  },
  name: "Loader",
  props: {
    rowClass: String,
    height: String,
    classCol: String,
    itemLoop: Number,
    bgClass:  String
  },
}
</script>
