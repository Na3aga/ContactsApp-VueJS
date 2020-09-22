// https://avatars.abstractapi.com/v1/?api_key=eb302de9e78b40869bd42a05a43a647d&name=

<template>
  <div class="contact-wrapper">
    <div class="contact-box">
      <img
        class="contact-avatar"
        :src="`https://avatars.abstractapi.com/v1/?api_key=eb302de9e78b40869bd42a05a43a647d&image_size=100&name=${contact.name}`"
      />
      <div class="text-info">
        <h3 class="small-contact online" v-bind:class="{'busy': !contact.isOnline}">{{contact.name}}</h3>
        <p>{{contact.brief}}</p>
      </div>
    </div>
    <div class="small-actions" v-if="currentAction==ACTION_EDIT_CONTACTS">
      <button class="contact-button" type="submit" v-on:click="changeContact">
        <svg class="btn-icon">
          <use xlink:href="#edit-btn" />
        </svg>
      </button>
      <button class="contact-button" type="submit" @click="deleteContact(contact)">
        <svg class="btn-icon" v-if="confirmed">
          <use xlink:href="#delete-btn" />
        </svg>

        <div class="sure" v-if="!confirmed">SURE?</div>
      </button>
    </div>
  </div>
</template>

<script>
// import constants for setting store's currentContact's value, and to change markup by currentAction 
import { ACTION_EDIT_CONTACTS, NEW_CONTACT } from "../store/modules/CONTACTS_ACTIONS";
// import router to change page (for editing contacts)
import router from "../router";
// import vuex funtions to map getters, actions from vuex store module
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ContactSmall",
  props: ["contact"],
  data() {
    return {
      ACTION_EDIT_CONTACTS,
      confirmed: true,
    };
  },
  methods: {
    ...mapActions(["delContact", 'setCurrentContact']),
    deleteContact() { // called by button click 
      // if button was clicked ones => change 'confirmed' value to display another icon 
      this.confirmed = !this.confirmed;
      console.log(this.confirmed)
      if(this.confirmed !== true){ //if button was clicked ones => give 5 seconds to confirm the action
        setTimeout(()=>{ this.confirmed = true }, 5000);
        return;
      }
      console.log("Contact gonna be deleted");
      if (this.currentContact === this.contact){ // if EditContact is editing this contcat => change it to create new
        this.setCurrentContact(NEW_CONTACT);
      }
      this.delContact(this.contact); // finally delete
    },
    changeContact() { // change store's currentContact value and route to about page (EditContact.vue)
      console.log("Contact gonna be changed");
      this.setCurrentContact(this.contact);
      router.push("about");
    },
  },
  computed: mapGetters(["currentAction", 'currentContact']),
};
</script>

<style scoped>
.contact-wrapper {
  width: -webkit-fill-available;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.online {
  color: limegreen;
}

.busy {
  color: red;
}

.small-actions {
  display: flex;
  /* position: relative; */
  padding: 0 10px 0 10px;
  align-self: center;
  right: 0;
}

.contact-box {
  flex: 1;
  display: flex;
  background: #ffffff;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 10px;
  justify-content: flex-start;
}

.contact-avatar {
  width: calc(60px + 2vw);
  height: calc(60px + 2vw);
  margin-right: 10px;
  background: linear-gradient(180deg, #eed603 0%, rgba(255, 255, 255, 0) 100%),
    #ca3d11;

  border-radius: 100%;
}

.text-info {
  flex-direction: column;
  text-align: left;
}

.contact-button {
  width: calc(40px + 2vw);
  height: calc(40px + 2vh);
  border-radius: 60px;
  border: none;
  outline: none;
  position: relative;
  background-color: transparent;

  /*  */
}

.contact-button:hover .btn-icon {
  /*  */
  filter: opacity(50%);
  transform: scale(1.05);
}

.btn-icon {
  width: 100%;
  height: 100%;
}

.sure {
  width: 100%;
  height: 100%;
  background: coral;
  border-radius: 25px;
  color: #fafafa;
  display: flex;
  align-items: center;
  text-align: center;
  align-content: center;
  font: 800;
  font-size: 1.2em;
}

@media all and (max-width: 1024px) {
  .small-actions {
    flex-direction: column;
  }
}
</style>>
