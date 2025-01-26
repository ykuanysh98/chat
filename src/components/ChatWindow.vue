<template>
  <div class="chat-window">
    <UserSelection isCurrentUser />
    <MessageWindow v-if="currentChat" />
    <h1 v-else>Выберите Чат</h1>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import MessageWindow from "./MessageWindow.vue";
import UserSelection from "./UserSelection.vue";

export default {
  components: { MessageWindow, UserSelection },
  setup() {
    const currentChat = ref(null);

    onMounted(() => {
      currentChat.value = sessionStorage.getItem("currentChat");
    });

    return {
      currentChat,
    };
  },
};
</script>

<style scoped>
.chat-window {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
h1 {
  margin: 120px auto;
}
</style>
