<template>
  <div class="settings">
    <h2>Настройки</h2>
    <div class="settings__wrap">
      <div class="input-group">
        <input
          v-model="newUser"
          type="text"
          placeholder="Новое имя пользователя"
        />
        <button @click="addUser" class="add-button">Добавлять</button>
      </div>
      <ul class="users-list">
        <li v-for="user in users" :key="user" class="user-item">
          <span>{{ user }}</span>
          <button @click="removeUser(user)" class="remove-button">
            Удалить
          </button>
        </li>
      </ul>
      <button @click="goToHome" class="home-button">
        Перейти на главную страницу
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "UserSettings",
  setup() {
    const newUser = ref("");
    const users = ref(
      JSON.parse(localStorage.getItem("users")) || [
        "User1",
        "User2",
        "User3",
        "User4",
      ]
    );

    const router = useRouter();

    const addUser = () => {
      if (newUser.value.trim() && !users.value.includes(newUser.value.trim())) {
        users.value.push(newUser.value.trim());
        localStorage.setItem("users", JSON.stringify(users.value));
        newUser.value = "";
      }
    };

    const removeUser = (user) => {
      users.value = users.value.filter((u) => u !== user);
      localStorage.setItem("users", JSON.stringify(users.value));
    };

    const goToHome = () => {
      router.push("/");
    };

    return { newUser, users, addUser, removeUser, goToHome };
  },
};
</script>

<style>
.settings {
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.settings h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.settings__wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  display: flex;
  margin-bottom: 20px;
}

.settings input {
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 250px;
  margin-right: 10px;
  transition: all 0.3s ease;
}

.settings input:focus {
  border-color: #4caf50;
  outline: none;
}

.add-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #45a049;
}

.users-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.user-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  margin: 5px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  align-items: center;
}

.user-item:hover {
  background-color: #f1f1f1;
}

.remove-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.remove-button:hover {
  background-color: #e60000;
}

.home-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.home-button:hover {
  background-color: #0056b3;
}
</style>
