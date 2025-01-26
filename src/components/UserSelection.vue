<template>
  <div
    class="user-selection"
    :class="{ 'user-selection--chat': isCurrentUser }"
  >
    <h2 v-if="!isCurrentUser" class="title">Выберите пользователя</h2>
    <div v-else class="user-current">
      {{ currentUser.slice(0, 1) }}
    </div>
    <div class="user-sidebar">
      <ul>
        <li
          v-for="user in filteredUsers"
          :key="user"
          @click="selectUser(user)"
          :class="{ 'selected-user': user === currentChat }"
        >
          {{ user }}
        </li>
      </ul>
      <button v-if="isCurrentUser" class="logout" @click="clearCurrent">
        Выйти
      </button>
    </div>
    <router-link v-if="!isCurrentUser" to="/settings" class="settings-link">
      Настройки
    </router-link>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    isCurrentUser: Boolean,
  },
  setup(props) {
    const users = ref(
      JSON.parse(localStorage.getItem("users")) || [
        "User1",
        "User2",
        "User3",
        "User4",
      ]
    );
    const currentUser = ref(sessionStorage.getItem("currentUser"));
    const currentChat = ref(sessionStorage.getItem("currentChat"));

    const filteredUsers = computed(() => {
      return users.value.filter((user) => user !== currentUser.value);
    });

    const selectUser = (user) => {
      if (!props.isCurrentUser) {
        sessionStorage.setItem("currentUser", user);
      } else {
        sessionStorage.setItem("currentChat", user);
        currentChat.value = user;
      }
      window.location.reload();
    };

    const clearCurrent = () => {
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("currentChat");
      window.location.reload();
    };

    return {
      users,
      filteredUsers,
      selectUser,
      currentUser,
      currentChat,
      clearCurrent,
    };
  },
};
</script>

<style scoped>
.user-selection {
  width: 100%;
  max-width: 360px;
  margin: 50px auto;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
}

.user-selection--chat {
  height: 100vh;
  margin: 0;
  box-sizing: border-box;
  border-radius: 0;
}

.title {
  text-align: center;
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}

.user-current {
  width: 60px;
  height: 60px;
  border: 2px solid #4caf50;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  font-size: 16px;
  color: #4caf50;
}

.user-selection ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-selection li {
  padding: 12px;
  margin: 8px 0;
  background-color: #fff;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-selection li:hover {
  background-color: #e5e5e5;
}

.user-selection li:active {
  background-color: #d1d1d1;
}

.user-selection li.selected-user {
  background-color: #4caf50;
  color: white;
}

.user-sidebar {
  height: calc(100% - 84px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logout {
  display: block;
  outline: none;
  border: none;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.settings-link {
  display: block;
  text-align: center;
  padding: 12px;
  margin-top: 20px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
}

.settings-link:hover {
  background-color: #45a049;
}
</style>
