<template>
  <div class="pt-2">
    <input type="file" multiple @change="handleFileUpload" accept="image/*">
    <div class="image-preview  d-flex flex-row gap-2 pt-2">
      <div v-for="(image, index) in images" :key="index" class="image-item">
        <a @click="openImageReview(image.url)" target="_blank">
          <img :src="image.url" alt="Image preview">
        </a>
        <button type=button @click="removeImage(index)" class="remove-button">X</button>
      </div>
    </div>
  </div>
</template>

<script>
import {errorSwal, handleFileUpload, handleRemoveFileUpload, hideBlockingOverlay, showBlockingOverlay, successSwal, warningSwal} from '@/services/method'

export default {
  methods: {
    handleFileUpload(event) {
      handleFileUpload(event,this.images)
    },
    openImageReview(imageData) {
      localStorage.setItem('imageData',imageData)
      window.open('/image-review', '_blank');
    },
  },
  name: "UploadImages",
  props: {
    images: Array,
  },
  setup(props) {
    const removeImage = (index) => {

      const imageItems = document.querySelectorAll('.image-item');
      imageItems.forEach((element, key) => {
        element.addEventListener('click', () => {
          handleRemoveFileUpload(props.images,index)

          imageItems[key].classList.add('d-none');
        });
      });

    };
    return {
      removeImage
    }
  }
}
</script>
