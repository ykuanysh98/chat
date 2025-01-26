<template>
  <div>
    <UserSelection v-if="!currentUser" />
    <ChatWindow v-else />
  </div>
</template>

<script>
import { ref } from "vue";
import UserSelection from "@/components/UserSelection.vue";
import ChatWindow from "@/components/ChatWindow.vue";

export default {
  name: "HomePage",
  components: { UserSelection, ChatWindow },
  setup() {
    const currentUser = ref(sessionStorage.getItem("currentUser"));
    return { currentUser };
  },
};
</script>
