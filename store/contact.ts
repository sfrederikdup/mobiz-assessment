import axios from "axios";

export const state = () => ({
  contacts: [],
  notificationMessage: '',
  showAddContactDialog: false,
  showEditContactDialog: false,
  // showRemoveContactDialog: false,
  showNotification: false
});

export const mutations = {
  setAddContactDialog(state: any, showAddContactDialog: boolean) {
    state.showAddContactDialog = showAddContactDialog;
  },

  setEditContactDialog(state: any, showEditContactDialog: boolean) {
    state.showEditContactDialog = showEditContactDialog;
  },

  // setRemoveContactDialog(state: any, showRemoveContactDialog: boolean) {
  //   state.showRemoveContactDialog = showRemoveContactDialog;
  // },

  setNotificationMessage(state: any, notificationMessage: string) {
    state.notificationMessage = notificationMessage;
  },

  setShowNotification(state: any, showNotification: boolean) {
    state.showNotification = showNotification;
  },

  setContacts(state: any, contacts: any[]) {
    state.contacts = contacts;
  },

  addContact(state: any, contact: any) {
    state.contacts.push(contact);
  },

  editContact(state: any, contact: any) {
    state.contacts.push(contact);
  },

  // removeContact(state: any, contact: any) {
  //   state.contacts.push(contact);
  // }
};

export const actions = {
  updateAddContactDialog(context: any, payload: any) {
    context.commit('setAddContactDialog', payload);
  },

  updateEditContactDialog(context: any, payload: any) {
    context.commit('setEditContactDialog', payload);
  },

  // updateRemoveContactDialog(context: any, payload: any) {
  //   context.commit('setRemoveContactDialog', payload);
  //   // console.log('FDP >>> EDIT >> payload', payload);
  // },

  updateShowNotification({ commit }: any, { show, message }: any) {
    commit('setNotificationMessage', message);
    commit('setShowNotification', show);
  },

  async loadContacts({ commit }: any) {
    try {
      const response = await axios.get("http://127.0.0.1:3001/contacts", {});
      commit("setContacts", response.data);
    } catch (error) {
      // Do something with the error
    }
  },

  async createContact({ commit }: any, { contact }: any) {
    try {
      const response = await axios.post("http://127.0.0.1:3001/contacts", { contact });
      commit("addContact", contact);
      return response;
    } catch (error) {
      // Do something with the error
    }
  },

  async updateContact({ commit }: any, { contact }: any) {
    try {
      const response = await axios.patch('http://127.0.0.1:3001/contacts/' + contact.id, { contact });
      commit("editContact", contact);
      return response;
    } catch (error) {
      // Do something with the error
    }
  },

  // async removeContact({ commit }: any, { contact }: any) {
  //   // console.log('FDP >>> ASYNC updateContact: ', contact);
  //   try {
  //     // const response = await axios.delete('http://127.0.0.1:3001/contacts/' + contact.id, { contact });
  //     // commit("removeContact", contact);
  //     console.log('FDP >>> REMOVE response: ', contact);
  //     // return response;
  //   } catch (error) {
  //     // Do something with the error
  //   }
  // }
};
