<template xmlns="http://www.w3.org/1999/html">
  <div class="chat-page text-dark">
    <div class="d-flex">

      <div class="menu-left-sidebar">
        <ul class="list-menu">
          <li class="mb-4">
            <img class="m-auto" :src="icons.IconLogo" alt="Logo" style="width: 80px"/>
          </li>
          <li title="Chờ xử lý" @click="activeType(1)"
              :class="[{ 'active': activeIndex === 1 }, 'position-relative']">
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style="left: 80%">
                {{ messAwait }}
              <span class="visually-hidden">unread</span>
            </span>
            <box-icon name='message-square-dots' color="white"></box-icon>
          </li>
          <li title="Đã xử lý" @click="activeType(2)" :class="{ 'active': activeIndex === 2 }">
            <box-icon name='message-square-check' color="white"></box-icon>
          </li>
          <li title="Danh sách hội thoai" @click="activeType(3)" :class="{ 'active': activeIndex === 3 }">
            <box-icon type='solid' name='user-detail' color="white"></box-icon>
          </li>
          <li title="Chú ý" @click="activeType(4)" :class="{ 'active': activeIndex === 4 }">
            <box-icon name='message-square-error' color="white"></box-icon>
          </li>
          <li title="Bình chọn" @click="activeType(5)" :class="{ 'active': activeIndex === 5 }">
            <box-icon name='bar-chart-square' color="white"></box-icon>
          </li>
        </ul>
        <div class="bottom-0 absolute m-3">
          <div class="dropdown">
            <img alt="img" :src="icons.IconSetting" width="26" class="dropdown-toggle" data-bs-toggle="dropdown">
            <ul class="dropdown-menu border-0" aria-labelledby="dropdownMenuButton1">
              <li>
                <button class="dropdown-item" @click="logout">{{ $t('chat_page.logout') }}</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="chat-left-sidebar" v-show="activeIndex !== 5">
        <div class="px-4 pt-4">
          <div class="row mb-3">
            <h4 class="text-start">
              <template v-if="activeIndex === 1">Chờ xử lý</template>
              <template v-else-if="activeIndex === 2">Đã xử lý</template>
              <template v-else-if="activeIndex === 3">Danh sách nhóm</template>
              <template v-else-if="activeIndex === 4">Chú ý</template>
              <template v-else-if="activeIndex === 5">Bình chọn</template>
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
                      <div class="animated-background rounded-circle me-2"
                           style="width: 40px; height: 40px"></div>
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
            <li v-for="(group, key) in groupsList" :key="key" :data-group-name="group.baseInfo.groupName"
                :data-group-key="group.baseInfo.groupID"
                :class="['mt-2 mb-1 p-1', group.baseInfo.groupID === activeMenuGroup ? 'active' : '']"
                @click="openGroup(group.baseInfo.groupID)" v-show="showGroupList"
            >
              <a href="javascript: void(0);" class="unread-msg-user position-relative">
                <div class="d-flex align-items-center ms-3">
                  <div class="chat-user-img online align-self-center me-2 ms-0">
                    <img alt="user" class="rounded-circle avatar-40 object-fit-cover"
                         v-if="group.baseInfo.groupAvatarUrl && group.baseInfo.groupAvatarUrl !== 'null'"
                         :src="group.baseInfo.groupAvatarUrl">
                    <span v-else class="avatar avatar-40 btn-ct-primary text-white rounded-circle">
                      {{ group.baseInfo.groupName.replace(/Customer\s+Support\s*-?\s*/g, '').charAt(0) }}
                    </span>
                  </div>
                  <div class="overflow-hidden">
                    <p class="text-truncate mb-0" :title="group.baseInfo.groupName">
                      {{ group.baseInfo.groupName.replace(/Customer\s+Support\s*-?\s*/g, '') }}
                    </p>
                  </div>
                  <!--                  <div class="ms-auto show-new-mess" :data-group-id="group.baseInfo.groupID"-->
                  <!--                       v-if="getNewMessages.length > 0 &&-->
                  <!--                       getNewMessages.some((info) => info === group.baseInfo.groupID)">-->
                  <!--                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"-->
                  <!--                          style="left: 95%">-->
                  <!--                      new-->
                  <!--                    </span>-->
                  <!--                  </div>-->
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <template v-if="!activeGroup">
        <img :src="icons.IconEmpty" alt="" class="m-auto" style="width: 150px;">
      </template>

      <template v-else>
        <div :class="['chat-content']">
          <div class="position-relative">
            <div class="user-chat-top-bar p-3 p-lg-4 bg-white text-secondary">
              <div class="d-flex">
                <div v-if="isLoading">
                  <div class="flex-shrink-0 chat-user-img align-items-center align-self-center me-3 ms-0 d-flex">
                    <div class="animated-background rounded-circle me-2" style="width: 40px; height: 40px"></div>
                    <div class="animated-background" style="width: 200px; height: 40px"></div>
                  </div>
                </div>

                <div v-else class="flex-grow-1 chat-user-img align-items-center align-self-center me-3 ms-0 d-flex">
                  <img alt="user" class="rounded-circle avatar-40 object-fit-cover me-3"
                       v-if="activeGroup.groupAvatar && activeGroup.groupAvatar !== 'null'"
                       :src="activeGroup.groupAvatar"
                       v-show="activeIndex !== 5">
                  <span v-else class="avatar avatar-40 btn-ct-primary text-white rounded-circle me-3"
                        v-show="activeIndex !== 5">
                      {{ activeGroup.groupName.replace(/Customer\s+Support\s*-?\s*/g, '').charAt(0) }}
                  </span>
                  <div :class="['mt-1', 'title-group-name']">
                    <h5 v-if="activeIndex !== 5">
                      {{ activeGroup.groupName.replace(/Customer\s+Support\s*-?\s*/g, '') }}
                    </h5>
                    <h5 v-else>
                      TẤT CẢ ANGEL
                    </h5>
                  </div>
                </div>
                <div v-show="activeIndex === 1">
                  <button class="btn btn-sm btn-outline-success mt-1 d-flex align-items-center" id="btnConfirm"
                          @click="onConfirmProcessed(activeGroup.groupID)">
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg" class="me-2">
                      <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#4eac6d " stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round"/>
                      <path
                          d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                          stroke="#4eac6d " stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    Đã xử lý
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div ref="scrollChatBarContent" class="simple-bar-content" id="scrollChatBarContent">

            <div v-if="isLoading || isLoadingChat" class="spinner-border text-success m-auto" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>

            <ul v-else class="list-unstyled chat-conversation-list">
              <Messages v-for="message in messages" :groupMember="groupMember" :message="message"
                        v-if="activeIndex !== 5"/>
              <MessageVoting :messages="messages" :groupMember="groupMember" v-else></MessageVoting>
            </ul>
          </div>
          <div class="simple-send-box">
            <div class="d-flex align-items-center">
              <!--              <div class="dropdown" style="width: 50px; padding-left: 20px">-->
              <!--                <a class="d-flex align-items-center cursor-pointer" data-bs-toggle="dropdown">-->
              <!--                  <box-icon name='dots-horizontal-rounded' color="gray"></box-icon>-->
              <!--                </a>-->
              <!--                <ul class="dropdown-menu border-0" aria-labelledby="dropdownMenuButton1">-->
              <!--                  <li>-->
              <!--                    <button class="dropdown-item" @click="logout">{{ $t('chat_page.logout') }}</button>-->
              <!--                  </li>-->
              <!--                </ul>-->
              <!--              </div>-->
              <input type="text"
                     id="input-send-box"
                     @keyup.enter="enterKeySendMess"
                     v-model="from.inputSend" autocomplete="off"
                     :placeholder="activeIndex !== 5 ? 'Nhập nội dung tin nhắn...' : 'Nhập nôi dung bình chọn...'"
              >
              <!--              <input v-if="activeGroup.groupID === 'chat_support_all_angel'" type="checkbox" v-model="checkBox">-->
              <button class="btn btn-sm ms-auto border-0" id="btn-send" @click="sendMess">
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

import moment from "moment";
import router from "@/router";
import {ZIM} from 'zego-zim-web';
import {onMounted, ref} from 'vue';
import IconUser from "@/assets/icons/user.svg";
import {appConfig, generateToken} from "@/utils";
import IconLogo from "@/assets/logo/Background.png";
import IconEmpty from "@/assets/icons/empty-box.png";
import IconSend from "@/assets/icons/paper-plane.svg";
import Messages from "@/modules/chats/components/Messages.vue";
import IconSetting from "@/assets/icons/setting-svgrepo-com.svg";
import MessageVoting from "@/modules/chats/components/MessageVoting.vue";

const userId = localStorage.getItem('userId')
const realName = localStorage.getItem('realName')
const userInfo = {userID: userId, userName: realName};


export default {
  name: "ChatPage",
  components: {
    MessageVoting,
    Messages,
  },
  data() {
    return {
      icons: {
        iconSend: IconSend,
        iconUser: IconUser,
        IconLogo: IconLogo,
        IconSetting: IconSetting,
        IconEmpty: IconEmpty,
      },
      groups: '',
      showGroupList: true,
      from:
          {
            inputSend: '',
            searchChatUser: ''
          }
    }
  },

  setup() {
    const groupsFull = ref();
    const activeGroup = ref();
    const groupMember = ref();
    const messages = ref([]);
    const messAwait = ref(0);
    const activeIndex = ref(1);
    const groupsList = ref([]);
    const checkBox = ref(false);
    const isLoading = ref(true);
    const getNewMessages = ref([]);
    const isLoadingChat = ref(true);
    const activeMenuGroup = ref('');

    ZIM.create(appConfig);
    const zim = ZIM.getInstance();

    // khởi tạo ban đầu, load tin nhắn của nhóm đầu tiên và danh sách nhóm
    onMounted(() => {
      const token = generateToken(userInfo.userID, 0);
      zim.setLogConfig({logLevel: 'disable'});
      zim.login(userInfo, token)
          .then(async () => {
            queryGroupList().then(resolvedResult => {
              groupsFull.value = resolvedResult
              convListAwait()
            });
            isLoading.value = false
          }).catch((err) => {
            console.log(err);
          }
      );
    });

    // lấy lịch sử tin nhắn
    const fetchHistoryMessages = (groupId) => {
      const config = {
        nextMessage: null,
        count: 5000,
        reverse: true
      };

      zim.queryHistoryMessage(groupId, 2, config).then(async (res) => {

        const config = {count: 1000, nextFlag: 0};
        await zim.queryGroupMemberList(groupId, config)
            .then(function ({userList}) {
              groupMember.value = userList
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
                    senderName = 'Bạn'
                  } else {
                    senderName = sender.userName;
                  }
                }
                messages.value.push({
                  dataItem: item,
                  type: senderType,
                  id: item.messageID,
                  time_send: timestamp,
                  content: item.message,
                  senderName: senderName,
                  messagesType: item.type,
                  timestamp: item.timestamp,
                  senderAvatar: senderAvatar,
                  groupId: activeGroup.value.groupID
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
      try {
        const res = await zim.queryGroupList();
        const queryGroupSupport = res.groupList.filter(item => item.baseInfo.groupID.includes('support'));

        const groupInfoPromises = queryGroupSupport.map(item =>
            zim.queryGroupInfo(item.baseInfo.groupID)
        );

        const groupInfos = await Promise.all(groupInfoPromises);

        return groupInfos.map(_i_ => ({
          baseInfo: _i_.groupInfo.baseInfo,
          groupAttributes: _i_.groupInfo.groupAttributes
        }));
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    // gửi tin nhắn
    const sendMessage = (messageText) => {
      if (messageText) {

        const conversationType = 2;
        const config = {
          priority: 1,
        };
        const messageTextObj = {
          type: 1,
          message: messageText,
          extendedData: ""
        };
        if (activeMenuGroup.value === 'chat_support_all_angel') {
          messageTextObj.extendedData = JSON.stringify({'type': 'voting'})
        }
        zim.sendMessage(messageTextObj, activeMenuGroup.value, conversationType, config)
            .then(function ({message}) {
              const timestamp = moment(message.timestamp).format('DD/MM/YYYY HH:mm');
              let senderType = 'right';
              messages.value.push({
                senderName: 'Bạn',
                senderAvatar: '',
                type: senderType,
                dataItem: message,
                time_send: timestamp,
                id: message.messageID,
                content: message.message,
                messagesType: message.type,
                timestamp: message.timestamp,
                groupId: activeGroup.value.groupID
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
                    senderName = 'Bạn'
                  } else {
                    senderName = sender.userName;
                  }
                }
                messages.value.push({
                  dataItem: item,
                  type: senderType,
                  id: item.messageID,
                  time_send: timestamp,
                  content: item.message,
                  senderName: senderName,
                  messagesType: item.type,
                  timestamp: item.timestamp,
                  senderAvatar: senderAvatar,
                  groupId: activeGroup.value.groupID
                });

              });
              isLoading.value = false
            })
            .catch(function (err) {
              console.log(err)
            });
      }
      messageList.forEach((item) => {
        if (item.senderUserID === item.conversationID.split('_')[0]) {
          zim.setGroupAttributes({type: 'progress'}, fromConversationID)
        }
      })

    });

    zim.on('conversationChanged', (zim, data) => {
      try {
        sortConvNewChange(data)
      } catch (e) {
        console.log('conversationChanged')
        console.log(e)
      }
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

    const filteredList = async (searchText) => {
      checkActiveType(activeIndex.value, searchText)
    }

    zim.on('groupStateChanged', function (zim, data) {
      // console.log(data)
    })

    // Chờ xử lý
    const convListAwait = async (search = null) => {
      clearUI();
      isLoading.value = true
      if (!search) {
        await queryGroupList().then(resolvedResult => {
          groupsFull.value = resolvedResult
          groupsList.value = resolvedResult.filter(item => {
            return item.groupAttributes && item.groupAttributes.type === 'progress' && item.baseInfo.groupID !== 'chat_support_all_angel';
          })
        });
        messAwait.value = groupsList.value.length
      } else {
        groupsList.value = groupsFull.value.filter(item => {
          return item.groupAttributes && item.groupAttributes.type === 'progress' &&
              item.baseInfo.groupName.toLowerCase().includes(search.toLowerCase()) &&
              item.baseInfo.groupID !== 'chat_support_all_angel';
        })
      }
      isLoading.value = false
    }

    // Đã xử lý
    const convListProcessed = async (search = null) => {
      clearUI();
      isLoading.value = true
      if (!search) {
        await queryGroupList().then(resolvedResult => {
          groupsFull.value = resolvedResult
          groupsList.value = resolvedResult.filter(item => {
            return item.groupAttributes && item.groupAttributes.type === 'done' && item.baseInfo.groupID !== 'chat_support_all_angel';
          })
        });
      } else {
        groupsList.value = groupsFull.value.filter(item => {
          return item.groupAttributes && item.groupAttributes.type === 'done' &&
              item.baseInfo.groupName.toLowerCase().includes(search.toLowerCase()) &&
              item.baseInfo.groupID !== 'chat_support_all_angel';
        })
      }
      isLoading.value = false
    }

    // Full group
    const convListFull = async (search = null) => {
      clearUI();
      isLoading.value = true
      if (!search) {
        groupsList.value = groupsFull.value.filter(item => item.baseInfo.groupID !== 'chat_support_all_angel');
      } else {
        groupsList.value = groupsFull.value.filter(item => {
          return item.baseInfo.groupName.toLowerCase().includes(search.toLowerCase()) &&
              item.baseInfo.groupID !== 'chat_support_all_angel';
        })
      }
      isLoading.value = false
    }

    // Chú ý
    const convListNote = (result) => {
      clearUI();
      groupsList.value = result
    }

    // Bình chọn
    const convListVoting = async () => {
      clearUI();
      isLoading.value = true
      await queryGroupList().then(resolvedResult => {
        groupsFull.value = resolvedResult
        groupsList.value = resolvedResult.filter(item => item.baseInfo.groupID === 'chat_support_all_angel');
        isLoading.value = false
      });
      changeActiveGroup(groupsList.value[0].baseInfo.groupID)
    }

    const checkActiveType = (index, search = null) => {
      activeIndex.value = index
      switch (index) {
        case 1:
          convListAwait(search)
          break
        case 2:
          convListProcessed(search)
          break
        case 3:
          convListFull(search)
          break
        case 4:
          convListNote(search)
          break
        case 5:
          convListVoting()
          break
      }
    }
    // đăng xuất zim
    const logoutZim = () => {
      zim.logout()
      location.reload();
    }

    // Clear thông tin group active và message đang hiện
    const clearUI = () => {
      activeGroup.value = ''
      messages.value = []
    }

    // CS xác nhận đã xử lý xong
    const confirmProcessed = (groupID) => {
      zim.setGroupAttributes({type: 'done'}, groupID)
      clearUI()
    }

    // Ghim tin nhắn
    const pinnedMessage = (groupID, dataItem) => {
      console.log(groupID, dataItem)
    }


    const handleLockVoting = (message) => {
      return zim.addMessageReaction('done', message)
    }

    return {
      moment,
      messages,
      checkBox,
      messAwait,
      isLoading,
      logoutZim,
      groupsList,
      addNewUser,
      groupMember,
      activeGroup,
      activeIndex,
      sendMessage,
      convListNote,
      convListFull,
      filteredList,
      pinnedMessage,
      isLoadingChat,
      convListAwait,
      getNewMessages,
      activeMenuGroup,
      checkActiveType,
      confirmProcessed,
      handleLockVoting,
      joinUserNewGroup,
      changeActiveGroup,
      convListProcessed,
      fetchHistoryMessages,
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
      this.from.searchChatUser = '';
    },

    onConfirmProcessed(groupID) {
      this.$swal.fire({
        title: "Xác nhận đã xử lý xong?",
        position: "center",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4eac6d",
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        closeOnConfirm: false,
        closeOnCancel: false
      }).then((confirmed) => {
        if (confirmed) {
          if (confirmed.isConfirmed) {
            this.confirmProcessed(groupID)
            const elements = document.querySelectorAll('[data-group-key]');
            elements.forEach(element => {
              const ele = element.getAttribute('data-group-key');
              if (ele === groupID) {
                element.classList.add('running');
              }
              setTimeout(() => {
                if (ele === groupID) {
                  element.remove();
                }
              }, 1200);

            });
            this.messAwait = this.messAwait - 1
          }
        } else {
          this.$swal("Lỗi rồi", "Vui lòng thử lại hoặc liên hệ phòng trên nha...", "error");
        }
      });

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
  },

  mounted() {
    this.$eventBus.$on('currentPinned', (groupID, dataItem) => {
      this.pinnedMessage(groupID, dataItem)
    })
    this.$eventBus.$on('currentRevokeMessage', (message) => {
      this.handleLockVoting(message).then((res) => {
        console.log(res)
      }).catch((err) => {
        this.$swal("Lỗi rồi", "Vui lòng thử lại hoặc liên hệ phòng trên nha...", "error");
      })
    })
  },

}
</script>
<style>
@import "../style/index.scss";
</style>