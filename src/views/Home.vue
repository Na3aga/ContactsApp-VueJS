<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

    <div class="grid">
      <!-- <div class="mar-wrapper"> -->
      <aside class="sidebar-left"></aside>

      <div id="content">
        <div class="flex1">
          <Contacts v-bind:contacts="allContacts" />
        </div>
        <div class="flex1" v-if="currentAction==ACTION_ADD_CONTACTS">
          <AddContact />
        </div>
      </div>
      <RightNav />

      <footer >Footer</footer>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
// import constant for setting store's actions's value (used in Contacts.vue list items)
import {ACTION_ADD_CONTACTS} from '../store/modules/CONTACTS_ACTIONS';
// import vuex funtions to map getters, actions from vuex store module
import { mapGetters, mapActions } from "vuex";
// Components 
import RightNav from "../components/RightNav.vue"; // Navigation  
import Contacts from "../components/Contacts.vue"; // The list of contacts 
import AddContact from "../components/AddContact.vue"; // Form for creating new contacts

export default {
  name: "Home",
  components: {
    RightNav,
    Contacts,
    AddContact,
  },
  data(){
    return{
      ACTION_ADD_CONTACTS
    }
  },
  methods: {
    ...mapActions(["getContacts"]),
  },
  computed: mapGetters(["allContacts", "currentAction"]),
  created() {
    // getting contacts (stored in LocalStorage)
    this.getContacts();
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  align-content: center;
}

.grid {
  display: grid;
  grid-template-columns: 150px auto 150px;
  grid-template-rows: auto 100px;
  grid-auto-rows: auto;
  grid-gap: 1em;
  width: 100%;
  height: 100vh;
}

/* .mar-wrapper{
  margin-top: max(min(10%,100px + 5vh), 100px );
  position: relative;
    width: 100%;
  height: 100vh;
} */

header,
footer {
  grid-column: 1 / -1;
}

header,
#content,
article,
footer {
  background: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
}

#content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  padding: min(40px, 10%);
}

#contect .flex1 {
  display: inline;
  width: 100%;
  width: -moz-available;          /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
  width: fill-available;
  justify-content: center;
  flex: 1;
}

header {
  height: min(10%, 200px);
}

footer {
  background-color: blue;
  color: white;
    font-family: Roboto;
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
}

.displayed {
  display: none;
}

@media all and (max-width: 1024px) {
  .grid {
    grid-template-rows: 0 auto auto 100px;
  }

  aside,
  #content {
    grid-column: 1 / 4;
  }
  #content {
    flex-direction: column;
  }
}

@media all and (max-width: 1200px) {
  #content {
    flex-direction: column;
  }
}
</style>
