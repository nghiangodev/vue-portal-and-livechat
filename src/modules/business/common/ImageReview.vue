<template>
  <div>
    <img :src="imageData" alt="Image">
  </div>
</template>

<script>

import {useRoute} from 'vue-router'

export default {
  data() {
    return {
      imageData:  localStorage.getItem('imageData')
    };
  },
}
</script>
