<template>
  <div class="create-contact-box">
    <div class="sign">Add new contact</div>
    <form @submit="addContact" class="create-contact-form">
      <div v-if="show" style="padding: 10px">Enter valid name, pls</div>
      <input
        class="txt-input"
        type="text"
        name="cname"
        v-model="cname"
        id
        placeholder="Add name..."
      />
      <input
        class="txt-input brief"
        type="text"
        name="brief"
        v-model="brief"
        id
        placeholder="Add brief description..."
      />
      <!-- <input type="tel" id="phone" name="phone" placeholder="012-345-6789" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required><br><br> -->
      
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
// import vuex funtion to map actions from vuex store module
import { mapActions } from "vuex";
// import for creting unique id for new user 
import { v4 as uuidv4 } from "uuid";

export default {
  name: "AddContact",
  data() {
    return {
      cname: "",
      brief: "",
      valid: false,
      show: false
    };
  },
  methods: {
    ...mapActions(["addNewContact"]),
    addContact(e) { // checks input's values and adds contact 
      e.preventDefault();
      if (this.cname !== ""){
        this.valid = true;
      }
      if (this.valid) { 
        const newContact = {
        id: uuidv4(),
        name: this.cname,
        brief: this.brief,
        avatar: 1,
        isOnline: true,
        additional: [],
      };
      this.addNewContact(newContact); // action to save contact and add it to the state
      this.cname = "";
      this.brief = "";
      this.valid = false;
      this.show = false;
      }else{
        this.show = true;
      }
      
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.create-contact-box,
.create-contact-form {
  display: flex;
  flex-direction: column;
  min-width: 25vw;
}

.create-contact-box {
  background: rgba(0, 0, 0, 0);
}

.create-contact-form {
  background: #fff;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 10px;
}

.sign{
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

.sb-btn {
  border: none;
  outline: none;
  position: relative;
  background-color: transparent;
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

.sb-btn:hover .sb-btn {
  /*  */
  filter: opacity(50%);
  transform: scale(1.05);
}
</style>
