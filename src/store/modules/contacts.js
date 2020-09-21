import { ACTION_EDIT_CONTACTS, ACTION_ADD_CONTACTS, ACTION_DEFAULT, NEW_CONTACT } from './CONTACTS_ACTIONS'

const state = {
    contacts: [
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
    currentAction: ACTION_DEFAULT,
    currentContact: NEW_CONTACT,
    initialContacts: []
};

const getters = {
    allContacts: (state) => state.contacts,
    currentAction: (state) => state.currentAction,
    currentContact: (state) => state.currentContact,
};

const actions = {
    getContacts({ commit }) {
        const ids = JSON.parse(localStorage.getItem('contacts-ids'));
        console.log(ids)
        if (ids === null) {
            console.log("there is no contacts in localStorage, so we will put a placeholder");
            localStorage.setItem('contacts-ids', '[]');
            state.contacts.forEach(con => {
                localStorage.setItem('contacts-ids', JSON.stringify([...JSON.parse(localStorage.getItem('contacts-ids')), con.id]));
                localStorage.setItem('contact' + con.id, JSON.stringify(con));
            });
            commit('setContacts', state.contacts);
            return;
        }

        let result = [];
        try {
            ids.forEach(id => {
                try {
                    result.push(JSON.parse(localStorage.getItem('contact' + id)));

                } catch (e) {
                    console.log(e);
                    console.log(localStorage.getItem('contact' + id));
                }
            });
        } catch (e) {
            console.log(ids);
        }
        console.log(result);
        state.initialContacts  = JSON.parse(JSON.stringify(result));
        commit('setContacts', result);

    },
    addNewContact({ commit }, contact) {
        localStorage.setItem('contacts-ids', JSON.stringify([...JSON.parse(localStorage.getItem('contacts-ids')), contact.id]));
        localStorage.setItem('contact' + contact.id, JSON.stringify(contact));

        commit('newContact', JSON.parse(localStorage.getItem('contact' + contact.id)));
    },
    delContact({ commit }, contact) {
        localStorage.removeItem('contact' + contact.id);
        localStorage.setItem('contacts-ids', JSON.stringify(JSON.parse(localStorage.getItem('contacts-ids')).filter(id => id !== contact.id)));

        commit('deleteContact', contact);
    },
    updateContact({ commit }, contact) {
        localStorage.setItem('contact' + contact.id, JSON.stringify(contact));
        commit('updateContacts', contact);
    },
    setCurrentAction({ commit }, action) {
        if ([ACTION_EDIT_CONTACTS, ACTION_ADD_CONTACTS, ACTION_DEFAULT].indexOf(action) <= -1) {
            console.log("Wrong action " + action);
        }

        console.log("Changing action to " + action);
        commit('changeAction', action);
    },
    setCurrentContact({ commit }, contact) {
        if (contact === NEW_CONTACT) {
            // Contact editing view holds non-existing contact
            // And adds it to the list after submitting
            console.log('current contact is NEW');
            commit('setCurrContact', NEW_CONTACT);
            return
        } else {
            commit('setCurrContact', contact);
        }
    }
};

const mutations = {
    setContacts: (state, contacts) => {
        state.contacts = contacts;
    },
    updateContacts: (state, contact) => {
        state.contacts = state.contacts.filter(con => con.id !== contact.id);
        state.contacts.push(contact);
    },
    newContact: (state, contact) => {
        state.contacts.push(contact);
    },
    deleteContact: (state, contact) => {
        state.contacts = state.contacts.filter(con => con.id !== contact.id);
    },
    changeAction: (state, action) => {
        state.currentAction = action;
    },
    setCurrContact: (state, contact) => {
        state.currentContact = contact;
    },
    emptyState: (state) => {
        state.contacts = JSON.parse(JSON.stringify(state.initialContacts));
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}

