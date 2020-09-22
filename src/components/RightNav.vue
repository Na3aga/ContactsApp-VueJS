<template>
  <aside class="sidebar-right">
    <ul>
      <li>
        <button class="nav-button" @click="setAction(ACTION_EDIT_CONTACTS)" v-if="currentAction==ACTION_DEFAULT">
          <svg
            class="btn-icon"
            id="edit-btn"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 120"
          >
            <circle cx="60" cy="60" r="60" class="edit-btn-circle" />
            <path
              d="M43.9 75.2L57.7 75.1 87.8 45.3C88.9 44.1 89.6 42.6 89.6 40.9 89.6 39.2 88.9 37.7 87.8 36.5L82.8 31.5C80.4 29.2 76.3 29.2 74 31.5L43.9 61.3V75.2ZM78.4 35.9L83.4 40.9 78.4 45.8 73.4 40.9 78.4 35.9ZM50.1 63.9L69 45.3 73.9 50.2 55.1 68.9 50.1 68.9V63.9Z"
              class="edit-btn-pen"
            />
            <path
              d="M37.6 87.6H81.4C84.8 87.6 87.6 84.8 87.6 81.4V54.3L81.4 60.5V81.4H47.5C47.4 81.4 47.3 81.4 47.2 81.4 47.1 81.4 47 81.4 46.9 81.4H37.6V37.6H59L65.3 31.4H37.6C34.2 31.4 31.4 34.2 31.4 37.6V81.4C31.4 84.8 34.2 87.6 37.6 87.6Z"
              class="edit-btn-pen"
            />
          </svg>
        </button>
      </li>
      <li>
        <button class="nav-button" @click="setAction(ACTION_ADD_CONTACTS)" v-if="currentAction==ACTION_DEFAULT">
          <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="236.2" class="add-btn-back" />
            <path
              d="M256 512C114.9 512 0 397.2 0 256 0 114.9 114.9 0 256 0c141.2 0 256 114.9 256 256C512 397.2 397.2 512 256 512zM256 39.7C136.7 39.7 39.7 136.7 39.7 256S136.7 472.3 256 472.3 472.3 375.3 472.3 256C472.3 136.7 375.3 39.7 256 39.7z"
              class="add-btn-back"
            />
            <path
              d="M256 373.2c-10.9 0-19.8-8.9-19.8-19.8V155.1c0-10.9 8.9-19.8 19.8-19.8 10.9 0 19.8 8.9 19.8 19.8v198.3C275.8 364.3 266.9 373.2 256 373.2z"
              class="add-btn-plus"
            />
            <path
              d="M355.1 274H156.9c-10.9 0-19.8-8.9-19.8-19.8 0-10.9 8.9-19.8 19.8-19.8h198.3c11 0 19.8 8.9 19.8 19.8C375 265.2 366.1 274 355.1 274z"
              class="add-btn-plus"
            />
          </svg>
        </button>
      </li>
      <li>
        <button class="nav-button" @click="setAction(ACTION_DEFAULT)" v-if="currentAction!=ACTION_DEFAULT">
          <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -46 417.8 417">
            <path
              d="m160 318.6c-4 4-9.4 6.3-15.1 6.3s-11.1-2.2-15.1-6.2l-120.4-120.5c-12.5-12.5-12.5-32.8 0-45.2l15.1-15.1c12.5-12.5 32.8-12.5 45.3 0l75.2 75.2 203.2-203.2c12.5-12.5 32.8-12.5 45.3 0l15.1 15.1c12.5 12.5 12.5 32.8 0 45.2zm0 0"
              fill="green"
            />
          </svg>
        </button>
      </li>
      <li>
        <button class="nav-button" @click="setAction(ACTION_DEFAULT)" v-if="currentAction!=ACTION_DEFAULT">
          <svg
            class="btn-icon cancel"
            viewBox="0 0 365.71733 365"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#f44336">
              <path
                d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0"
              />
              <path
                d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0"
              />
            </g>
          </svg>
        </button>
      </li>
    </ul>
  </aside>
</template>

<script>
// import constant for setting store's actions's value (used in Contacts.vue list items)
import {ACTION_EDIT_CONTACTS , ACTION_ADD_CONTACTS, ACTION_DEFAULT } from '../store/modules/CONTACTS_ACTIONS'
// import vuex funtions to map getters, actions from vuex store module
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RightNav",
  data(){
    return {
      ACTION_EDIT_CONTACTS,
      ACTION_ADD_CONTACTS,
      ACTION_DEFAULT
    }
  },
   methods: {
    ...mapActions(['setCurrentAction']),
    setAction(action){ // called by button click with given action
      this.setCurrentAction(action);
    }
   },
   computed: mapGetters(["currentAction"]),  // used to style page by currentAction
};
</script>

<style scoped>
.sidebar-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-button {
  width: calc(60px + 2vw);
  height: calc(60px + 2vh);
  border-radius: 60px;
  border: none;
  outline: none;
  position: relative;
  background-color: transparent;

  /*  */
}

.cancel {
  width: 95%;
  height: 95%;
}

.nav-button:hover .btn-icon {
  /*  */
  filter: opacity(50%);
  transform: scale(1.05);
}

.edit-btn-circle {
  fill: #005b96;
}

.edit-btn-pen {
  fill: #fafafa;
}

.add-btn-back {
  fill: #005b96;
}

.add-btn-plus {
  fill: #fafafa;
}

@media all and (max-width: 1024px) {
  .sidebar-right {
    justify-content: center;
  }

  aside {
    grid-column: 1 / 4;
  }

  ul {
    flex-direction: row;
  }

  li {
    float: left;
  }
}
</style>