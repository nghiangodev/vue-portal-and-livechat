<template>
  <div class="chat-page text-dark">
    <div class="d-flex">
      <div class="menu-left-sidebar">
        <ul class="list-menu">
          <li class="mb-4">
            <img class="m-auto" :src="icons.IconLogo" alt="Logo" style="width: 80px"/>
          </li>
          <li title="Chờ xử lý" @click="activeType(1)" :class="{ 'active': activeIndex === 1 }">
            <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M3 13V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.0799 18 6.2 18H16.2446C16.5263 18 16.6672 18 16.8052 18.0193C16.9277 18.0365 17.0484 18.065 17.1656 18.1044C17.2977 18.1488 17.4237 18.2118 17.6757 18.3378L21 20V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H13M8.12132 3.87868C9.29289 5.05025 9.29289 6.94975 8.12132 8.12132C6.94975 9.29289 5.05025 9.29289 3.87868 8.12132C2.70711 6.94975 2.70711 5.05025 3.87868 3.87868C5.05025 2.70711 6.94975 2.70711 8.12132 3.87868Z"
                  stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </li>
          <li title="Đã xử lý" @click="activeType(2)" :class="{ 'active': activeIndex === 2 }">
            <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M9 11.2222L10.8462 13L15 9M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
                  stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </li>
          <li title="Danh sách hội thoai" @click="activeType(3)" :class="{ 'active': activeIndex === 3 }">
            <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
                  stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </li>
          <li title="Chú ý" @click="activeType(4)" :class="{ 'active': activeIndex === 4 }">
            <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M12 11V14M12 8H12.01M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
                  stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </li>
        </ul>
        <div class="bottom-0 absolute m-3">
          <div class="dropdown ">
            <img alt="img" :src="icons.IconSetting" width="26" class="dropdown-toggle" data-bs-toggle="dropdown">
            <ul class="dropdown-menu border-0" aria-labelledby="dropdownMenuButton1">
              <li>
                <button class="dropdown-item" @click="logout">{{ $t('chat_page.logout') }}</button>
              </li>
              <!--              <li>-->
              <!--                <button class="dropdown-item" @click="logout">Cá nhân</button>-->
              <!--              </li>-->
              <!--              <li>-->
              <!--                <button class="dropdown-item" @click="logout">Cài đặt</button>-->
              <!--              </li>-->
            </ul>
          </div>
        </div>
      </div>
      <div class="chat-left-sidebar">
        <div class="px-4 pt-4">
          <div class="row mb-3">
            <h4 class="text-start">
              <template v-if="activeIndex === 1">Chờ xử lý</template>
              <template v-else-if="activeIndex === 2">Đã xử lý</template>
              <template v-else-if="activeIndex === 3">Danh sách nhóm</template>
              <template v-else-if="activeIndex === 4">Chú ý</template>
            </h4>
            <!--                        <button @click="joinUserGroup">+</button>-->
          </div>
          <div class="row">
            <div class="input-group mb-3">
              <input type="text" id="searchChatUser" :placeholder=" $t('chat_page.search_here') + '...'"
                     autocomplete="off" v-model="from.searchChatUser" @keyup="searchGroup"
                     class="form-control bg-light border-0 pe-0 input-search"
                     style="border-bottom: 1px solid gray !important;border-radius: 0">
              <button type="button" id="search-btn-addon" class="btn btn-light"
                      style="border-bottom: 1px solid gray;border-radius: 0">
                <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 0 512 512">
                  <path
                      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3
                     0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1
                     416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="list-chat-user">

          <div v-if="isLoading">
            <ul class="p-0 m-0">
              <li v-for="i in i=5" class="mt-2 mb-2 p-1" style="height: 45px;">
                <div class="d-flex align-items-center ms-3">
                  <div class="chat-user-img online align-self-center me-2 ms-0">
                    <div class="flex-shrink-0 chat-user-img align-items-center align-self-center me-3 ms-0 d-flex">
                      <div class="animated-background rounded-circle me-2" style="width: 40px; height: 40px"></div>
                      <div class="animated-background" style="width: 200px; height: 40px"></div>
                    </div>
                  </div>
                  <div class="overflow-hidden">
                    <div class="animated-background" style="width: 200px; height: 40px"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <ul v-else class="p-0 m-0">
            <li v-for="(group, key) in groupsList" :key="key" :data-group-name="group.conversationName"
                :class="['mt-2 mb-1 p-1', group.conversationID === activeMenuGroup ? 'active' : '']"
                @click="openGroup(group.conversationID)" v-show="showGroupList"
            >
              <a href="javascript: void(0);" class="unread-msg-user position-relative">
                <div class="d-flex align-items-center ms-3">
                  <div class="chat-user-img online align-self-center me-2 ms-0">
                    <img alt="user" class="rounded-circle avatar-40"
                         v-if="group.conversationAvatarUrl && group.conversationAvatarUrl !== 'null'"
                         :src="group.conversationAvatarUrl">
                    <span v-else class="avatar avatar-40 btn-ct-primary text-white rounded-circle">
                      {{ group.conversationName.replace(/Customer\s+Support\s*-?\s*/g, '').charAt(0) }}
                    </span>
                  </div>
                  <div class="overflow-hidden">
                    <p class="text-truncate mb-0" :title="group.conversationName">
                      {{ group.conversationName.replace(/Customer\s+Support\s*-?\s*/g, '') }}
                    </p>
                  </div>
                  <div class="ms-auto show-new-mess" :data-group-id="group.conversationID"
                       v-if="getNewMessages.length > 0 &&
                       getNewMessages.some((info) => info === group.conversationID)">
                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                          style="left: 95%">
                      new
                    </span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <template v-if="!activeGroup">

      </template>

      <template v-else>
        <div class="chat-content">
          <div class="position-relative">
            <div class="user-chat-top-bar p-3 p-lg-4 bg-white text-secondary">
              <div class="d-flex">
                <div v-if="isLoading">
                  <div class="flex-shrink-0 chat-user-img align-items-center align-self-center me-3 ms-0 d-flex">
                    <div class="animated-background rounded-circle me-2" style="width: 40px; height: 40px"></div>
                    <div class="animated-background" style="width: 200px; height: 40px"></div>
                  </div>
                </div>

                <div v-else class="flex-shrink-0 chat-user-img align-items-center align-self-center me-3 ms-0 d-flex">
                  <img alt="user" class="rounded-circle avatar-40"
                       v-if="activeGroup.groupAvatar && activeGroup.groupAvatar !== 'null'"
                       :src="activeGroup.groupAvatar">
                  <span v-else class="avatar avatar-40 btn-ct-primary text-white rounded-circle">
                    {{ activeGroup.groupName.replace(/Customer\s+Support\s*-?\s*/g, '').charAt(0) }}
                  </span>
                  <div class="ms-3 mt-1 title-group-name">
                    <h5>{{ activeGroup.groupName.replace(/Customer\s+Support\s*-?\s*/g, '') }} </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref="scrollChatBarContent" class="simple-bar-content" id="scrollChatBarContent">


            <div v-if="isLoading || isLoadingChat" class="spinner-border text-success m-auto" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>

            <ul v-else class="list-unstyled chat-conversation-list">
              <ChatItem v-for="message in messages" :key="message.id" :message="message"/>
            </ul>
          </div>
          <div class="simple-send-box">
            <div class="d-flex">
              <input type="text" :placeholder="$t('chat_page.enter_message')" id="input-send-box"
                     v-model="from.inputSend" autocomplete="off"
                     @keyup.enter="enterKeySendMess"
              >
              <input v-if="activeGroup.groupID === 'chat_support_all_angel'" type="checkbox" v-model="checkBox">
              <button class="btn btn-sm ms-auto" id="btn-send" @click="sendMess">
                <img :src="icons.iconSend" width="24" alt="send">
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

import ChatItem from "@/modules/chats/components/Messages.vue";
import IconSend from "@/assets/icons/paper-plane.svg";
import IconUser from "@/assets/icons/user.svg";
import IconLogo from "@/assets/logo/Background.png";
import IconSetting from "@/assets/icons/setting-svgrepo-com.svg";
import {appConfig, generateToken} from "@/utils";
import {ZIM} from 'zego-zim-web';
import moment from "moment";
import {onMounted, ref} from 'vue';
import router from "@/router";


const userId = localStorage.getItem('userId')
const realName = localStorage.getItem('realName')
const userInfo = {userID: userId, userName: realName};


export default {
  name: "ChatPage",
  components: {
    ChatItem,
  },
  data() {
    return {
      icons: {
        iconSend: IconSend,
        iconUser: IconUser,
        IconLogo: IconLogo,
        IconSetting: IconSetting,
      },
      groups: '',
      showGroupList: true,
      from:
          {
            inputSend: '',
            searchChatUser:
                ''
          }
    }
  },

  setup() {
    const checkBox = ref(false);
    const activeGroup = ref();
    const userList = ref([]);
    const activeIndex = ref(1);
    const messages = ref([]);
    const groupsList = ref([]);
    const groupsFull = ref([]);
    const isLoading = ref(true);
    const getNewMessages = ref([]);
    const isLoadingChat = ref(true);
    const activeMenuGroup = ref('');

    const configQueryConv = ref({
      count: 30,
      nextConversation: '',
    });

    ZIM.create(appConfig);
    const zim = ZIM.getInstance();

    // khởi tạo ban đầu, load tin nhắn của nhóm đầu tiên và danh sách nhóm
    onMounted(() => {
      const token = generateToken(userInfo.userID, 0);
      zim.setLogConfig({logLevel: 'disable'});
      zim.login(userInfo, token)
          .then(async () => {
            await queryGroupList()
            isLoading.value = false
            convListAwait()
          }).catch((err) => {
            console.log(err);
          }
      );
    });

    // lấy lịch sử tin nhắn
    const fetchHistoryMessages = (groupId) => {
      const config = {
        nextMessage: null,
        count: 100,
        reverse: true
      };

      zim.queryHistoryMessage(groupId, 2, config).then((res) => {

        const config = {count: 20, nextFlag: 0};

        zim.queryGroupMemberList(groupId, config)
            .then(function ({userList}) {
              console.log(userList)
              res.messageList.forEach((item) => {
                let senderName = '';
                let senderAvatar = '';
                let senderType = 'right';
                const timestamp = moment(item.timestamp).format('DD/MM/YYYY HH:mm');
                const sender = userList.find(user => user.userID === item.senderUserID);
                if (sender) {
                  if (sender.memberAvatarUrl) {
                    senderAvatar = sender.memberAvatarUrl
                  }
                  if (sender.memberRole === 1) {
                    senderType = 'left'
                  }
                  if (sender.userID === userInfo.userID) {
                    senderName = 'You'
                  } else {
                    senderName = sender.userName;
                  }
                }
                messages.value.push({
                  id: item.messageID,
                  content: item.message,
                  senderName: senderName,
                  messagesType: item.type,
                  senderAvatar: senderAvatar,
                  type: senderType,
                  time_send: timestamp,
                  dataItem: item
                });

              });
              isLoading.value = false
            })
            .catch(function (err) {
              console.log(err)
            });
        isLoadingChat.value = false
      }).catch((err) => {
        console.log(err);
      });
    };

    // load lại tin nhắn khi chọn nhóm khác
    const changeActiveGroup = (activeGroupId) => {
      messages.value = [];
      isLoadingChat.value = true
      activeMenuGroup.value = activeGroupId

      zim.queryGroupInfo(activeGroupId)
          .then((res) => {
            activeGroup.value = {
              groupID: res.groupInfo.baseInfo.groupID,
              groupName: res.groupInfo.baseInfo.groupName,
              groupAvatar: res.groupInfo.baseInfo.groupAvatarUrl,
              groupNewMess: 0,
            };
            isLoadingChat.value = true
            fetchHistoryMessages(activeGroupId);
          })
          .catch(function (err) {
            console.log(err)
          });

    };

    // lấy danh sách nhóm
    const queryGroupList = async () => {
      await zim.queryConversationList(configQueryConv.value).then((res) => {
        groupsFull.value = res.conversationList.filter((conv) => {
          if (conv.conversationID.includes('support')) {
            userList.value.push({
              convID: conv.conversationID
            })
          }
          return conv.conversationID.includes('support');
        });
      }).catch((e) => {
        groupsFull.value = [];
      })

    };

    // gửi tin nhắn
    const sendMessage = (messageText) => {
      if (messageText) {
        activeMenuGroup.value
        const conversationType = 2;
        const config = {
          priority: 1,
        };
        const messageTextObj = {
          type: 1,
          message: messageText,
          extendedData: ''
        };
        if (checkBox.value) {
          messageTextObj.extendedData = JSON.stringify({'type': 'voting'})
        }
        zim.sendMessage(messageTextObj, activeMenuGroup.value, conversationType, config)
            .then(function ({message}) {
              const timestamp = moment(message.timestamp).format('DD/MM/YYYY HH:mm');
              let senderType = 'right';
              messages.value.push({
                id: message.messageID,
                content: message.message,
                senderName: 'You',
                senderAvatar: '',
                type: senderType,
                time_send: timestamp,
                dataItem: message,
                messagesType: message.type,
              });
            })
            .catch(function (err) {
              console.log(err)
            });
      }
    }

    // thêm user mới vào nhóm
    const addNewUser = (userIDs, groupID) => {

      zim.inviteUsersIntoGroup(userIDs, groupID)
          .then((res) => {
          })
          .catch(function (err) {
            console.log(err)
          });
    }

    // thêm user mới vào nhóm
    const joinUserNewGroup = (addGroupId) => {
      zim.joinGroup(addGroupId)
          .then(function ({groupInfo}) {
            // console.log(groupInfo)
          })
          .catch(function (err) {
            console.log(err)
          });

    }

    // Kích hoạt khi được join vào group or new mess từ group chat mới được tạo
    zim.on("messageReactionsChanged", function (zim, {reactions}) {
      //type "like"

    })

    // Nhận tin nhắn mới
    zim.on('receiveGroupMessage', function (zim, {messageList, fromConversationID}) {
      if (fromConversationID === activeGroup.value?.groupID) {
        const config = {count: 20, nextFlag: 0};
        zim.queryGroupMemberList(fromConversationID, config)
            .then(function ({userList}) {
              messageList.forEach((item) => {
                let senderName = '';
                let senderAvatar = '';
                let senderType = 'right';
                const timestamp = moment(item.timestamp).format('DD/MM/YYYY HH:mm');
                const sender = userList.find(user => user.userID === item.senderUserID);
                if (sender) {
                  if (sender.memberAvatarUrl) {
                    senderAvatar = sender.memberAvatarUrl
                  }
                  if (sender.memberRole === 1) {
                    senderType = 'left'
                  }
                  if (sender.userID === userInfo.userID) {
                    senderName = 'You'
                  } else {
                    senderName = sender.userName;
                  }
                }
                messages.value.push({
                  id: item.messageID,
                  content: item.message,
                  senderName: senderName,
                  messagesType: item.type,
                  senderAvatar: senderAvatar,
                  type: senderType,
                  time_send: timestamp,
                  dataItem: item
                });

              });
              isLoading.value = false
            })
            .catch(function (err) {
              console.log(err)
            });
      } else {
        messageList.forEach((item) => {
          if (item.senderUserID === item.conversationID.split('_')[0]) {
            zim.setGroupAttributes({type: 'progress'}, fromConversationID)
          }
        })
      }

    });

    zim.on('conversationChanged', (zim, data) => {
      sortConvNewChange(data)
    });

    const sortConvNewChange = (data) => {
      data.infoList.forEach((item) => {
        if (item.conversation.lastMessage.senderUserID !== userId) {
          getNewMessages.value.push(item.conversation.conversationID)
        }
        const index = groupsList.value.findIndex(item => item.conversationID === item.conversationID);
        if (index > -1) {
          const itemToMove = groupsList.value.splice(index, 1)[0];
          groupsList.value.unshift(itemToMove);
        }
      })
    }

    const filteredList = (searchText) => {
      checkActiveType(activeIndex.value)
      if (searchText) {
        groupsList.value = groupsList.value
            .filter(group => group.conversationName.toLowerCase().includes(searchText.toLowerCase()));
      } else {
        checkActiveType(activeIndex.value)
      }
    }

    zim.on('groupStateChanged', function (zim, data) {
      // console.log(data)
    })

    const convListAwait = async () => {
      const newList = groupsFull.value
      const listAwait = []
      userList.value.forEach((item) => {
        zim.queryGroupAttributes(['type'], item.convID).then((res) => {
          if (res.groupAttributes.type === "progress") {
            listAwait.push(item.convID)
          }
        })
      })
      listAwait.forEach((i) => {
        console.log(i)
      })
      groupsList.value = newList.filter(item => item.unreadMessageCount > 0)
    }

    const convListProcessed = () => {
      const newList = groupsFull.value
      groupsList.value = newList.filter(item => item.unreadMessageCount === 0)
    }

    const convListFull = () => {
      groupsList.value = groupsFull.value
    }

    const convListNote = () => {

    }

    const checkActiveType = (index) => {
      activeIndex.value = index
      switch (index) {
        case 1:
          convListAwait()
          break
        case 2:
          convListProcessed()
          break
        case 3:
          convListFull()
          break
        case 4:
          convListNote()
          break
      }
    }
    // đăng xuất zim
    const logoutZim = () => {
      zim.logout()
      location.reload();
    }

    return {
      messages,
      isLoading,
      activeIndex,
      isLoadingChat,
      activeGroup,
      groupsList,
      sendMessage,
      addNewUser,
      logoutZim,
      filteredList,
      joinUserNewGroup,
      activeMenuGroup,
      getNewMessages,
      fetchHistoryMessages,
      changeActiveGroup,
      convListAwait,
      convListProcessed,
      convListNote,
      convListFull,
      checkActiveType,
      checkBox
    };
  },

  methods: {
    openGroup(clickedGroupID) {
      const elements = document.querySelectorAll('[data-group-id]');
      elements.forEach(element => {
        const groupID = element.getAttribute('data-group-id');
        if (groupID === clickedGroupID) {
          element.remove();
        }
      });
      this.changeActiveGroup(clickedGroupID);
      this.from.inputSend = '';
    },

    searchGroup() {
      this.filteredList(this.from.searchChatUser)
    },

    enterKeySendMess() {
      this.sendMessage(this.from.inputSend);
      this.from.inputSend = '';
    },

    addUserToGroup() {
      this.addNewUser(['1490'], this.activeGroup.groupID)
    },

    joinUserGroup() {
      this.joinUserNewGroup('1116_chat_support')
    },

    sendMess() {
      this.sendMessage(this.from.inputSend)
      this.from.inputSend = '';
    },

    activeType(index) {
      this.checkActiveType(index)
    },

    logout() {
      this.logoutZim()
      localStorage.setItem("isLoggedIn", 'false')
      localStorage.setItem('userId', '')
      localStorage.setItem('token', '')
      localStorage.setItem('realName', '')
      localStorage.setItem('isCheckin', '')
      localStorage.setItem('isActivated', '')
      localStorage.setItem('isAdminLogin', '')
      router.push({name: 'Login'});
    }
  }
}
</script>
<style>
@import "../style/index.scss";
</style>