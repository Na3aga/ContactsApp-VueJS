<template>
  <div>
    <h1>Contacts</h1>
    <div class="contacts-wrapper">
      <div v-bind:key="contact.id" v-for="contact in contacts">
        <ContactSmall v-bind:contact="contact" v-on:del-contact="$emit('del-contact', contact.id)" />
      </div>
    </div>

    <svg display="none">
      <symbol id="edit-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="60" class="edit-btn-circle" />
        <path
          d="M43.9 75.2L57.7 75.1 87.8 45.3C88.9 44.1 89.6 42.6 89.6 40.9 89.6 39.2 88.9 37.7 87.8 36.5L82.8 31.5C80.4 29.2 76.3 29.2 74 31.5L43.9 61.3V75.2ZM78.4 35.9L83.4 40.9 78.4 45.8 73.4 40.9 78.4 35.9ZM50.1 63.9L69 45.3 73.9 50.2 55.1 68.9 50.1 68.9V63.9Z"
          class="edit-btn-pen"
        />
        <path
          d="M37.6 87.6H81.4C84.8 87.6 87.6 84.8 87.6 81.4V54.3L81.4 60.5V81.4H47.5C47.4 81.4 47.3 81.4 47.2 81.4 47.1 81.4 47 81.4 46.9 81.4H37.6V37.6H59L65.3 31.4H37.6C34.2 31.4 31.4 34.2 31.4 37.6V81.4C31.4 84.8 34.2 87.6 37.6 87.6Z"
          class="edit-btn-pen"
        />
      </symbol>

      <symbol id="delete-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="m256 0c-141.2 0-256 114.8-256 256s114.8 256 256 256 256-114.8 256-256-114.8-256-256-256zm0 0"
          fill="#f44336"
        />
        <path
          d="m350.3 320.1c8.3 8.3 8.3 21.8 0 30.2-4.2 4.2-9.6 6.3-15.1 6.3-5.5 0-10.9-2.1-15.1-6.2l-64.1-64.1-64.1 64.1c-4.2 4.2-9.6 6.3-15.1 6.3-5.5 0-10.9-2.1-15.1-6.2-8.3-8.3-8.3-21.8 0-30.2l64.1-64.1-64.1-64.1c-8.3-8.3-8.3-21.8 0-30.2 8.3-8.3 21.8-8.3 30.2 0l64.1 64.1 64.1-64.1c8.3-8.3 21.8-8.3 30.2 0 8.3 8.3 8.3 21.8 0 30.2l-64.1 64.1zm0 0"
          fill="#fafafa"
        />
      </symbol>
    </svg>
  </div>
</template>

<script>
// Imports contact list items
import ContactSmall from "./ContactSmall.vue";

export default {
  name: "Contacts",
  components: {
    ContactSmall,
  },
  props: ["contacts"],
};
</script>

<style scoped>
.contacts-wrapper {
  display: grid;
  gap: 10px 10px;
  width: -webkit-fill-available;
}

.edit-btn-circle {
  fill: #005b96;
}

.edit-btn-pen {
  fill: #fafafa;
}
</style>>
