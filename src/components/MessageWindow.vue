<template>
  <div class="message-window">
    <MessageList :messages="filteredMessages" :currentUser="currentUser" />
    <MessageInput @sendMessage="addMessage" />
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import MessageList from "./MessageList.vue";
import MessageInput from "./MessageInput.vue";

export default {
  components: { MessageList, MessageInput },
  setup() {
    const currentUser = sessionStorage.getItem("currentUser");
    const currentChat = sessionStorage.getItem("currentChat");
    const allMessages = ref(JSON.parse(localStorage.getItem("messages")) || []);

    const filteredMessages = computed(() =>
      allMessages.value.filter(
        (msg) =>
          (msg.sender === currentUser && msg.receiver === currentChat) ||
          (msg.sender === currentChat && msg.receiver === currentUser)
      )
    );

    onMounted(() => {
      window.addEventListener("storage", () => {
        allMessages.value = JSON.parse(localStorage.getItem("messages")) || [];
      });
    });

    const addMessage = (message) => {
      allMessages.value.push(message);
      localStorage.setItem("messages", JSON.stringify(allMessages.value));
      window.location.reload();
    };

    return {
      currentUser,
      currentChat,
      filteredMessages,
      allMessages,
      addMessage,
    };
  },
};
</script>

<style>
.message-window {
  width: 100%;
}
</style>
