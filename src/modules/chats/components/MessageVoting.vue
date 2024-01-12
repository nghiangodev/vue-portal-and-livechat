<template>
  <div v-for="(message, index) in messages" :key="index" :ref="message.id">
    <div
        :class="['message-voting', 'd-flex', 'justify-content-center', !message.dataItem?.extendedData !== true && isVotingType(message)]"
        v-if="!message.dataItem?.extendedData !== true && isVotingType(message)">
      <div class="card">
        <template v-if="index === 0 || isNewDay(messages[index - 1].timestamp, message.timestamp)">
          <div :key="'date_' + message.timestamp" class="date-message text-center"
               style="font-size: 12px ">
            <span class="text-white">
              {{
                moment(message.timestamp).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')
                    ? 'Hôm nay' : moment(message.timestamp).format('DD/MM/YYYY')
              }}
            </span>
          </div>
        </template>

        <div class="card-header mb-2 pb-2 d-flex align-items-center">
          <box-icon
              type='solid'
              class="me-2"
              size="20px"
              name='bar-chart-alt-2'
              color="rgba(78, 172, 109, 1)">
          </box-icon>
          <span>
            <strong>{{ message.senderName }}</strong> đã tạo một cuộc bình chọn mới lúc:
            <strong>{{ moment(message.timestamp).format('HH:mm') }}</strong>
          </span>
        </div>
        <div class="card-body">
          <h6 class="mb-4">{{ message.content }}</h6>
          <button type="button"
                  @click="handleVoting(message,'Có', 'y')"
                  data-bs-toggle="modal" data-bs-target="#votingModal"
                  class="w-100 btn btn-custom-voting text-start d-flex justify-content-start align-items-start">
            <span class="pe-3">Có</span>
            <template v-for="(member, index) in getVotingUsers(message,'y').slice(0, 5)">
              <img :class="[index === 0 ? 'image-front' : 'image-back', 'rounded-5']"
                   :src="getMemberAvatar(member)"
                   alt="Avatar"/>
            </template>
          </button>
          <button type="button"
                  @click="handleVoting(message,'1 giờ sau', 'n')"
                  data-bs-toggle="modal" data-bs-target="#votingModal"
                  class="w-100 btn btn-custom-voting text-start d-flex justify-content-start align-items-start">
            <span class="pe-3">1 giờ sau</span>
            <template v-for="(member, index) in getVotingUsers(message, 'n').slice(0, 5)">
              <img :class="[index === 0 ? 'image-front' : 'image-back', 'rounded-5']"
                   :src="getMemberAvatar(member)"
                   alt="Avatar"/>
            </template>
          </button>
        </div>

        <div class="card-footer" :ref="`btnGroup${message.dataItem.messageID}`">
          <button class="btn w-100 text-white"
                  v-if="userId === message.dataItem?.senderUserID &&
                  message?.dataItem?.reactions?.some(item => item?.reactionType === 'done') ||
                  checkTimestamp(message.timestamp)"
                  type="button" disabled style="background-color: #ababab">
            Bình chọn đã kết thúc
          </button>
          <button v-else class="btn btn-outline-success w-100" type="button"
                  @click="handleLockVoting(message.dataItem)">
            Khóa bình chọn
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" ref="votingModal" tabindex="-1" role="dialog" id="votingModal">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          Bình chọn: {{ votingType }}
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body d-flex flex-wrap justify-content-center">
          <div v-if="votingUserList.length > 0" v-for="item in votingUserList" class="p-2">
            <img :src="getMemberAvatar(item)" class="rounded-5 avatar-xs m-auto" alt=""/>
            <span>{{ item.userName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import moment from "moment";
import defaultAvatar from '@/assets/icons/user.svg'
import {ref} from "vue";

export default {
  name: "MessageVoting",
  props: {
    messages: {
      type: Object,
    },
    groupMember: {
      type: Object,
    }
  },

  data() {
    const votingUserList = ref([]);
    const votingType = ref(null);
    const userId = localStorage.getItem('userId');
    // Group messages by date
    const isNewDay = (prevTimestamp, currentTimestamp) => {
      const prevDate = new Date(prevTimestamp);
      const currentDate = new Date(currentTimestamp);
      return (
          prevDate.getFullYear() !== currentDate.getFullYear() ||
          prevDate.getMonth() !== currentDate.getMonth() ||
          prevDate.getDate() !== currentDate.getDate()
      );
    }

    const isVotingType = (message) => {
      if (
          message.dataItem &&
          message.dataItem.extendedData &&
          String(message.dataItem.extendedData) !== undefined
      ) {
        try {
          const extendedDataObject = JSON.parse(message.dataItem.extendedData);
          return extendedDataObject.type === 'voting';
        } catch (error) {
          return false;
        }
      }
      return false;
    }

    const checkTimestamp = (timestamp) => {
      const inputMoment = moment(timestamp);
      const currentMoment = moment();
      const duration = moment.duration(currentMoment.diff(inputMoment));
      return duration.asHours() > 24
    }

    const getVotingUserList = (type, userList) => {
      // votingType.value = type
      // votingUserList.value = userList
    }

    return {
      userId,
      moment,
      isNewDay,
      votingType,
      isVotingType,
      defaultAvatar,
      checkTimestamp,
      votingUserList,
      getVotingUserList,

    }
  },
  methods: {

    handleLockVoting(message) {
      this.$swal.fire({
        position: 'center',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#4eac6d',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        html: "Xác nhận kết thúc cuộc bình chọn"
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.$eventBus.$emit('currentRevokeMessage', message)
          const element = this.$refs[`btnGroup${message.messageID}`];
          if (element && element.length > 0) {
            element[0].innerHTML =
                '<button class="btn w-100 text-white" type="button" disabled style="background-color: #ababab">' +
                ' Bình chọn đã kết thúc' +
                '</button>';
          }
        }
      })
    },
    handleVoting(message, type, reactionType) {
      this.votingType = type
      this.votingUserList = this.getVotingUsers(message, reactionType)
    },

    getVotingUsers(message, reactionType) {
      const userList = message.dataItem?.reactions?.find(item => item.reactionType === reactionType)?.userList || [];
      return this.groupMember.filter(member => userList.some(user => user.userID === member.userID));
    },
    getMemberAvatar(member) {
      return member && member.memberAvatarUrl ? member.memberAvatarUrl : this.defaultAvatar;
    }
  },

}
</script>

<style>
@import "../style/messages.scss";
</style>