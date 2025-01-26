<template>
  <div class="message-input">
    <input
      v-model="text"
      type="text"
      placeholder="Напишите свое сообщение..."
      @keyup.enter="send"
    />
    <button @click="send">Отправлять</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  emits: ["sendMessage"],
  setup(_, { emit }) {
    const text = ref("");

    const send = () => {
      if (!text.value.trim()) return;

      const message = {
        id: Date.now(),
        sender: sessionStorage.getItem("currentUser"),
        receiver: sessionStorage.getItem("currentChat"),
        text: text.value.trim(),
        timestamp: new Date().toISOString(),
      };

      emit("sendMessage", message);
      text.value = "";
    };

    return { text, send };
  },
};
</script>

<style>
.message-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #f6f6f6;
  background: #f4f7fa;
}

.message-input input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  background-color: #ffffff;
  outline: none;
  box-sizing: border-box;
  transition: border 0.3s ease;
}

.message-input input:focus {
  border-color: #3b82f6;
}

.message-input button {
  padding: 10px 15px;
  background-color: #3b82f6;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.message-input button:hover {
  background-color: #2563eb;
}
</style>
