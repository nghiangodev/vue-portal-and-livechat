<template>
  <li :class="['chat-list', message.type, 'd-flex', {'justify-content-end': message.type === 'right'}]">
    <div v-if="message.type === 'right'" class="bottom-0 ms-1 me-1">
      <div class="dropdown dropstart d-none" style="cursor: pointer">
        <svg class="dropdown-toggle" data-bs-toggle="dropdown" fill="#ababab" width="20px" height="20px"
             viewBox="0 0 32 32" enable-background="new 0 0 32 32"
             id="Glyph" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
          <path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"/>
          <path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"/>
          <path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"/>
        </svg>
        <ul class="dropdown-menu border-0" aria-labelledby="dropdownMenuButton1">
          <li class="dropdown-item" style="font-size: 13px">
            <button class=" d-flex align-items-center" @click="onPinnedMessage(message.groupId, message.dataItem)">
              <svg class="me-2" height="16px" width="16px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 512 512" xml:space="preserve">
              <g>
                <polygon class="st0" fill="#4d4e52"
                         points="85.564,392.665 23.785,454.449 0,508.121 53.677,484.337 180.196,357.818 150.304,327.92 	"/>
                <path class="st0" d="M422.416,93.462L332.837,3.879c-31.304,31.308-12.697,75.686-12.697,75.686l-132.209,84.362
                  c-43.25-22.714-103.589-5.941-133.414,23.884L328.051,461.36c29.843-29.824,46.625-90.166,23.902-133.422l84.351-132.199
                  c0,0,44.388,18.606,75.696-12.693L422.416,93.462z" fill="#4d4e52"/>
              </g>
            </svg>
              Ghim tin nhắn chú ý
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="conversation-list mb-3">
      <div class="chat-avatar" v-if="message.senderAvatar">
        <img alt="" :src="message.senderAvatar" class="object-fit-cover">
      </div>
      <div class="user-chat-content">
        <div class="c-text-wrap">
          <div class="c-text-wrap-content" id="{{ message.id }}">
            <p v-if="message.messagesType === 1" class="mb-0 ctext-content">{{ message.content }}</p>
            <img :src="message.dataItem.thumbnailDownloadUrl" v-if="message.messagesType === 11" alt="Loading fail"
                 @click="openModal(message.dataItem.fileDownloadUrl, message.dataItem.fileName)"
                 style="cursor: pointer">
            <div class="text-user-name">
              <span class="mb-0" v-if="message.type === 'right'">{{ message.senderName }} - </span>
              <span class="time">{{ message.time_send }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="message.type === 'left'" class="bottom-0 ms-1">
      <div class="dropdown dropend d-none" style="cursor: pointer">
        <svg class="dropdown-toggle" data-bs-toggle="dropdown" fill="#ababab" width="20px" height="20px"
             viewBox="0 0 32 32" enable-background="new 0 0 32 32"
             id="Glyph" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
          <path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"/>
          <path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"/>
          <path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"/>
        </svg>
        <ul class="dropdown-menu border-0" aria-labelledby="dropdownMenuButton1">
          <li class="dropdown-item" style="font-size: 13px">
            <button class="d-flex align-items-center" @click="onPinnedMessage(message.groupId, message.dataItem)">
              <svg class="me-2" height="16px" width="16px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 512 512" xml:space="preserve">
              <g>
                <polygon class="st0" fill="#4d4e52"
                         points="85.564,392.665 23.785,454.449 0,508.121 53.677,484.337 180.196,357.818 150.304,327.92 	"/>
                <path class="st0" d="M422.416,93.462L332.837,3.879c-31.304,31.308-12.697,75.686-12.697,75.686l-132.209,84.362
                  c-43.25-22.714-103.589-5.941-133.414,23.884L328.051,461.36c29.843-29.824,46.625-90.166,23.902-133.422l84.351-132.199
                  c0,0,44.388,18.606,75.696-12.693L422.416,93.462z" fill="#4d4e52"/>
              </g>
            </svg>
              Ghim tin nhắn chú ý
            </button>
          </li>
        </ul>
      </div>
    </div>
  </li>

  <div class="modal" ref="imageModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" style="max-width: 80%; overflow: hidden; text-overflow: ellipsis;">{{
              imageName
            }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <img :src="selectedImage" class="img-fluid" alt="Zoomed Image"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Message",
  props: {
    message: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedImage: null,
      imageName: '',
    }
  },

  methods: {
    openModal(image, name) {
      this.imageName = name;
      this.selectedImage = image;
      this.$refs.imageModal.classList.add('show');
      this.$refs.imageModal.style.display = 'block';
    },
    closeModal() {
      this.$refs.imageModal.classList.remove('show');
      this.$refs.imageModal.style.display = 'none';
      this.selectedImage = null;
    },

    onPinnedMessage(groupID, dataMess) {
      this.$eventBus.$emit('currentPinned',
          groupID, dataMess
      );
    }
  }
}
</script>
<style>
.modal {
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
</style>