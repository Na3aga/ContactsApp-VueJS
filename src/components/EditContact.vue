<template>
  <div class="create-contact-box">
    <div class="sign">{{currSign}}</div>
    <form @keypress="preventSubmit($event)" @submit="submitContact" class="create-contact-form">
      <div v-if="show" style="padding: 10px">Enter valid name, pls</div>
      <input
        @keypress="preventSubmit($event)"
        class="txt-input"
        type="text"
        name="cname"
        v-model="cname"
        :placeholder="'Enter name'"
      />
      <input
        @keypress="preventSubmit($event)"
        class="txt-input brief"
        type="text"
        name="brief"
        v-model="brief"
        id
        :placeholder="'Enter brief description'"
      />
      <div v-bind:key="index" v-for="(field, index) in additional">
        <div class="additional wrapper">
          <input
            @keypress="preventSubmit($event)"
            class="txt-input additional"
            type="text"
            name="additional"
            v-model="additional[index].fname"
            :placeholder="'Put information'"
          />
          <input
            @keypress="preventSubmit($event)"
            class="txt-input additional"
            type="text"
            name="additional"
            v-model="additional[index].fvalue"
            :placeholder="'Put information'"
          />
          <button
            @click="undoFieldChange(index)"
            class="field-btn"
            type="button"
            @keypress="preventSubmit($event)"
          >
            <svg
              class="field-btn icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 438.5 438.5"
            >
              <path
                d="M421.1 134.2c-11.6-27-27.2-50.3-46.8-69.9C354.7 44.6 331.4 29 304.4 17.4 277.3 5.8 249 0 219.3 0c-28 0-55.1 5.3-81.2 15.8C111.9 26.4 88.6 41.3 68.2 60.5l-37.1-36.8c-5.7-5.9-12.3-7.2-19.7-4C3.8 22.9 0 28.6 0 36.5v127.9c0 4.9 1.8 9.2 5.4 12.8 3.6 3.6 7.9 5.4 12.9 5.4h127.9c8 0 13.6-3.8 16.8-11.4 3.2-7.4 1.9-14-4-19.7l-39.1-39.4c13.3-12.6 28.6-22.2 45.7-29 17.1-6.8 35-10.1 53.7-10.1 19.8 0 38.7 3.9 56.7 11.6 18 7.7 33.5 18.1 46.7 31.3 13.1 13.1 23.6 28.7 31.3 46.7 7.7 18 11.6 36.9 11.6 56.7 0 19.8-3.9 38.7-11.6 56.7 -7.7 18-18.1 33.5-31.3 46.7 -13.1 13.1-28.7 23.6-46.7 31.3 -18 7.7-36.9 11.6-56.7 11.6 -22.7 0-44.1-4.9-64.2-14.8 -20.2-9.9-37.2-23.9-51.1-42 -1.3-1.9-3.5-3-6.6-3.4 -2.9 0-5.2 0.9-7.1 2.6l-39.1 39.4c-1.5 1.5-2.3 3.5-2.4 5.9 -0.1 2.4 0.5 4.5 1.9 6.4 20.7 25.1 45.9 44.6 75.4 58.4 29.5 13.8 60.6 20.7 93.4 20.7 29.7 0 58.1-5.8 85.1-17.4 27-11.6 50.3-27.2 69.9-46.8 19.6-19.6 35.2-42.9 46.8-69.9s17.4-55.4 17.4-85.1C438.5 189.6 432.7 161.2 421.1 134.2z"
              />
            </svg>
          </button>
          <button @click="removeProp(index)" class="field-btn" type="button">
            <svg class="field-btn icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="m256 0c-141.2 0-256 114.8-256 256s114.8 256 256 256 256-114.8 256-256-114.8-256-256-256zm0 0"
                fill="#f44336"
              />
              <path
                d="m350.3 320.1c8.3 8.3 8.3 21.8 0 30.2-4.2 4.2-9.6 6.3-15.1 6.3-5.5 0-10.9-2.1-15.1-6.2l-64.1-64.1-64.1 64.1c-4.2 4.2-9.6 6.3-15.1 6.3-5.5 0-10.9-2.1-15.1-6.2-8.3-8.3-8.3-21.8 0-30.2l64.1-64.1-64.1-64.1c-8.3-8.3-8.3-21.8 0-30.2 8.3-8.3 21.8-8.3 30.2 0l64.1 64.1 64.1-64.1c8.3-8.3 21.8-8.3 30.2 0 8.3 8.3 8.3 21.8 0 30.2l-64.1 64.1zm0 0"
                fill="#fafafa"
              />
            </svg>
          </button>
        </div>
      </div>
      <button class="prop-btn" @click="addProp" type="button">
        <div class="new-prop">Add new property</div>
      </button>
      <button class="prop-btn" @click="undo" type="button">
        <div class="new-prop">UNDO</div>
      </button>
      <button class="sb-btn btn" type="submit" value="Submit">
        <svg class="sb-btn icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <circle cx="256" cy="256" r="236.2" class="back" />
          <path
            d="M256 512C114.9 512 0 397.2 0 256 0 114.9 114.9 0 256 0c141.2 0 256 114.9 256 256C512 397.2 397.2 512 256 512zM256 39.7C136.7 39.7 39.7 136.7 39.7 256S136.7 472.3 256 472.3 472.3 375.3 472.3 256C472.3 136.7 375.3 39.7 256 39.7z"
            class="back"
          />
          <path
            d="M256 373.2c-10.9 0-19.8-8.9-19.8-19.8V155.1c0-10.9 8.9-19.8 19.8-19.8 10.9 0 19.8 8.9 19.8 19.8v198.3C275.8 364.3 266.9 373.2 256 373.2z"
            class="plus"
          />
          <path
            d="M355.1 274H156.9c-10.9 0-19.8-8.9-19.8-19.8 0-10.9 8.9-19.8 19.8-19.8h198.3c11 0 19.8 8.9 19.8 19.8C375 265.2 366.1 274 355.1 274z"
            class="plus"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
// import constant for checking store's currentContact's value 
import { NEW_CONTACT } from "../store/modules/CONTACTS_ACTIONS";
// import vuex funtions to map getters, actions from vuex store module
import { mapGetters, mapActions } from "vuex";
// import for creting unique id for new user 
import { v4 as uuidv4 } from "uuid";

export default {
  name: "EditContact",
  data() { 
    return {
      contact: {},
      cname: "",
      brief: "",
      additional: [],
      valid: false,
      show: false,
      NEW_CONTACT,
      previous: {}, // stores the vrevious contact to undo changes
    };
  },
  methods: {
    ...mapActions([
      "updateContact",
      "addNewContact",
      "setCurrentContact",
    ]),
    submitContact(e) { // validates inputs and performs currentContat changes 
      e.preventDefault();
      if (this.cname !== "") this.valid = true;
      if (this.valid) {
        let newContact;
        switch (this.currentContact) {
          case this.NEW_CONTACT: // if contact is new, saves it and makes inputs empty 
            newContact = {
              id: uuidv4(),
              name: this.cname,
              brief: this.brief,
              avatar: 1,
              isOnline: true,
              additional: this.additional,
            };

            this.addNewContact(newContact);
            this.cname = "";
            this.brief = "";
            this.additional = [];
            break;
          default: // if contact was already in lcoalStorage
            this.contact.name = this.cname;
            this.contact.brief = this.brief;
            // copy additional into contact 
            this.contact.additional = JSON.parse(
              JSON.stringify(this.additional)
            );
            this.updateContact(this.contact);
            // save changes to undo if necessary 
            this.previous = this.currentContact; 
            this.setCurrentContact(this.contact);
            break;
        }
        this.valid = false;
        this.show = false;
      } else {
        this.show = true;
      }
    },
    undoFieldChange(i) { // asks confirmation and changes local additional with component's update
      if (confirm("Do you want to undo changes?")) {
        this.additional[i] = JSON.parse(
          JSON.stringify(this.currentContact.additional[i])
        );
        this.$forceUpdate();
      }
    },
    addProp() { // add another key value field to contact
      this.additional.push({ fname: "field name", fvalue: "field value" });
    },
    removeProp(i) { // remove key value field after confirmation
      if (confirm("Are you sure you want to delete this field?")) {
        this.additional.splice(i, 1);
      }
    },
    preventSubmit(e) { // prevents enter key to submit form 
      var key = e.charCode || e.keyCode || 0;
      if (key == 13) {
        e.preventDefault();
      }
    },
    undo() { // switchs contact information to the previous and updates component
      if (confirm("Do you want to undo changes?")) {
        this.contact = JSON.parse(JSON.stringify(this.previous));
        this.cname = this.contact.name;
        this.brief = this.contact.brief;
        this.additional = JSON.parse(JSON.stringify(this.contact.additional));
        this.updateContact(this.contact);
        this.$forceUpdate();
      }
    },
  },
  computed: {
    ...mapGetters(["currentContact"]),
    currSign() { // Sets the sign of the form
      return this.currentContact === this.NEW_CONTACT
        ? "Add new contact"
        : "Edit contact";
    },
  },
  created() { // loads contact information in the form
    console.log(this.currentContact);
    switch (this.currentContact) {
      case this.NEW_CONTACT:
        this.contact = {};
        break;
      default:
        this.contact = JSON.parse(JSON.stringify(this.currentContact));
        this.previous =  JSON.parse(JSON.stringify(this.currentContact));
        this.cname = this.contact.name;
        this.brief = this.contact.brief;
        this.additional = [...this.contact.additional];
        break;
    }
  },
};
</script>

<style>
.create-contact-box,
.create-contact-form {
  display: flex;
  flex-direction: column;
}

.create-contact-box {
  background: rgba(0, 0, 0, 0);
  padding: 20px;

  justify-content: center;
  align-content: center;
  align-items: center;
}

.create-contact-form {
  box-sizing: content-box;
  min-width: min(50%, 90vw);
  max-width: 800px;
  background: #fff;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 10px;
}

.sign {
  background: #1138f7;
  color: #fafafa;
  border-radius: 50px;
  width: 40%;
  align-self: center;
  padding: 15px;
  font-size: 1.2em;
  margin-bottom: -15px;
  z-index: 1;
}

.prop-btn {
  appearance: none;
  border: none;
  outline: none;
  position: relative;
  background-color: transparent;
  align-self: center;
  display: flex;
  width: 100%;
  justify-content: center;
}

.new-prop {
  text-align: center;
  background: #1138f7;
  color: #fafafa;
  border-radius: 50px;
  width: 25%;
  min-width: 80px;
  padding: 10px;
  font-size: 1.05em;
}

.txt-input,
.btn {
  margin: 10px;
}

.txt-input {
  height: 20px;
  border-radius: 8px;
  border-color: rgba(0, 0, 0, 0.2);
}

.txt-input + .brief {
  height: 40px;
}

.txt-input:focus {
  border-color: rgba(0, 0, 0, 0.2);
}

.additional {
  display: flex;
  justify-content: center;
}

.sb-btn,
.field-btn {
  border: none;
  outline: none;
  position: relative;
  background-color: transparent;
  align-self: center;
}

.field-btn {
  fill: #eca202;
}

.field-btn .icon {
  height: 24px;
  width: 24px;
}

.sb-btn .icon {
  width: 60px;
  height: 60px;
  margin: 0 0 -40px 0;
}

.sb-btn .icon .back {
  fill: #1138f7;
}

.sb-btn .icon .plus {
  fill: #fafafa;
}

.prop-btn:hover .new-prop {
  /*  */
  filter: opacity(50%);
  transform: scale(1.05);
}

.sb-btn:hover .sb-btn {
  /*  */
  filter: opacity(50%);
  transform: scale(1.05);
}

.field-btn:hover .field-btn {
  filter: opacity(50%);
  transform: scale(1.05);
}
</style>