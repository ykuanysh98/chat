<template>
  <div class="message-list">
    <template v-if="messages.length">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="{
          sent: message.sender === currentUser,
          received: message.receiver === currentUser,
        }"
      >
        <p>
          <strong>{{ message.sender }}</strong
          >: {{ message.text }}
        </p>
      </div>
    </template>
    <h1 v-else>Нет чата</h1>
  </div>
</template>

<script>
export default {
  props: ["messages", "currentUser"],
};
</script>

<style scoped>
.message-list {
  padding: 10px 20px;
  box-sizing: border-box;
  height: calc(100vh - 62px);
  overflow-y: auto;
  background: #f4f7fa;
}

.message-list h1 {
  color: #888;
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
}

.message-list div {
  margin-bottom: 16px;
}

.sent p {
  width: fit-content;
  background: rgb(238, 255, 222);
  color: rgb(0, 0, 0);
  padding: 10px 15px;
  border-radius: 20px;
  text-align: right;
  max-width: 70%;
  word-wrap: break-word;
  margin-left: auto;
  margin-right: 0;
}

.received p {
  width: fit-content;
  background: #e5e5ea;
  color: #000;
  padding: 10px 15px;
  border-radius: 20px;
  text-align: left;
  max-width: 70%;
  word-wrap: break-word;
  margin-left: 0;
  margin-right: auto;
}

strong {
  font-weight: bold;
  color: #247bed;
}
</style>
