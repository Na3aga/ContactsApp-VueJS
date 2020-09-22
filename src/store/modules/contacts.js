// import constants 
import { ACTION_EDIT_CONTACTS, ACTION_ADD_CONTACTS, ACTION_DEFAULT, NEW_CONTACT } from './CONTACTS_ACTIONS'

const state = {
    contacts: [ // Placeholder for initial app launch
        {
            id: 0,
            name: "Patrick Scott",
            brief: "Old friend",
            avatar: 1,
            isOnline: true,
            additional: [],
        },
        {
            id: 1,
            name: "Edison Tesla",
            brief: "engineer or car",
            avatar: 2,
            isOnline: true,
            additional: [],
        },
        {
            id: 2,
            name: "Elon Musk",
            brief: "guy who sold me tesla",
            avatar: 3,
            isOnline: false,
            additional: [],
        },
    ],
    currentAction: ACTION_DEFAULT, // Used to indicate what action Contacts list should perform (Editing/Adding/Nothing) 
    currentContact: NEW_CONTACT, // Used to indicate the current contact to edit in EditContact (NEW_CONTACT if to create new)
};

// GETTERS
const getters = { // Getters (used in components to get the current state values) 
    allContacts: (state) => state.contacts,
    currentAction: (state) => state.currentAction,
    currentContact: (state) => state.currentContact,
};

// ACTIONS
const actions = {
    getContacts({ commit }) { // gets contacts form localStorage and load to the state
        const ids = JSON.parse(localStorage.getItem('contacts-ids')); // getting contacts ids form localStorage
        console.log(ids) // displaying
        if (ids === null) { // if localStorage ids is empty then putting a placeholder in it (it's already in state)
            console.log("there is no contacts in localStorage, so we will put a placeholder");
            localStorage.setItem('contacts-ids', '[]');
            state.contacts.forEach(con => {
                localStorage.setItem('contacts-ids', JSON.stringify([...JSON.parse(localStorage.getItem('contacts-ids')), con.id]));
                localStorage.setItem('contact' + con.id, JSON.stringify(con));
            });
            commit('setContacts', state.contacts); // commiting contacts to the state (mutation call)
            return; // break function
        }

        let result = [];
        try { // Get all saved contacts information from localStorages
            ids.forEach(id => { 
                try {
                    result.push(JSON.parse(localStorage.getItem('contact' + id))); // Every contact is stored as { id: {info} } pair
                } catch (e) {
                    console.log(e);
                    console.log(localStorage.getItem('contact' + id));
                }
            });
        } catch (e) {
            console.log(ids); // display ids, if any of them caused error 
        }
        console.log(result);
        commit('setContacts', result);  // commiting contacts to the state (mutation call)

    },
    addNewContact({ commit }, contact) { // Adds new contact to localStorage and to the state
        localStorage.setItem('contacts-ids', JSON.stringify([...JSON.parse(localStorage.getItem('contacts-ids')), contact.id]));
        localStorage.setItem('contact' + contact.id, JSON.stringify(contact));

        commit('newContact', JSON.parse(localStorage.getItem('contact' + contact.id)));  // adding contact to the state (mutation call)
    },
    delContact({ commit }, contact) { // Deletes given contact from localStorage and from the state
        localStorage.removeItem('contact' + contact.id);
        localStorage.setItem('contacts-ids', JSON.stringify(JSON.parse(localStorage.getItem('contacts-ids')).filter(id => id !== contact.id)));

        commit('deleteContact', contact); // deleting contacts from the state (mutation call)
    },
    updateContact({ commit }, contact) { // Updates contact in localStorage and state
        localStorage.setItem('contact' + contact.id, JSON.stringify(contact));
        commit('updateContacts', contact); // updating contacts in the state (mutation call)
    },
    setCurrentAction({ commit }, action) { // Set current action (used in Contacts.vue list items)
        // if the state is not defined in contstants => break  
        if ([ACTION_EDIT_CONTACTS, ACTION_ADD_CONTACTS, ACTION_DEFAULT].indexOf(action) <= -1) {
            console.log("Wrong action " + action);
            return;
        }

        console.log("Changing action to " + action);
        commit('changeAction', action);
    },
    setCurrentContact({ commit }, contact) { // Set current editing contact (used in EditContact.vue)
        if (contact === NEW_CONTACT) {
            // Contact editing view holds non-existing contact (creates new)
            // And adds it to the list after submitting
            console.log('current contact is NEW');
            commit('setCurrContact', NEW_CONTACT); // changing currentContact to NEW_CONTACT (mutation call)
            return
        } else {
            commit('setCurrContact', contact); // changing currentContact in the state (mutation call)
        }
    },
};

// MUTATIONS
const mutations = {
    setContacts: (state, contacts) => { //
        state.contacts = contacts;
    },
    updateContacts: (state, contact) => { // filters contacts in the state and adds updated one
        state.contacts = state.contacts.filter(con => con.id !== contact.id);
        state.contacts.push(contact);
    },
    newContact: (state, contact) => { // adds updated one
        state.contacts.push(contact);
    },
    deleteContact: (state, contact) => { // filters contacts in the state
        state.contacts = state.contacts.filter(con => con.id !== contact.id);
    },
    changeAction: (state, action) => { // changes currentAction the state
        state.currentAction = action;
    },
    setCurrContact: (state, contact) => { // changes currentContact the state
        state.currentContact = contact;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}

