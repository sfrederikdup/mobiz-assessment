<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="display-1">Contacts</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="primary" dark @click.stop="addContact">
          <v-icon dark left>mdi-account-plus</v-icon>Add contact
        </v-btn>
      </v-col>
    </v-row>

    <AddContact @change-page="goToActionPage" />

    <EditContact @change-page="goToActionPage" />

    <!-- <RemoveContact @change-page="goToActionPage" /> -->

    <v-data-table
      :headers="headers"
      :items="contacts"
      :page.sync="page"
      show-select
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      item-key="id"
      class="elevation-1 mt-4"
      hide-default-footer
      sort-by="firstName"
    >
      
    <template v-slot:item.actions="{item}">
      <v-icon
        small
        class="mr-2"
      >
        mdi-eye
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="editContact(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
      >
        mdi-delete
      </v-icon>
    </template>

    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
    </v-data-table>
    <div class="text-center">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
    <v-snackbar v-model="showNotification" color="blue darken-2">
      {{notificationMessage}}
      <template v-slot:action>
        <v-btn class="black--text" color="grey lighten-4" @click="showNotification = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { Context } from "@nuxt/types";
import { eventBus } from "@/eventBus"

export default Vue.extend({
  name: "Contacts",
  middleware: (context: Context) => {
    context.store.dispatch("contact/loadContacts", {});
    context.store.dispatch("contact/updateContact", {});
    // context.store.dispatch("contact/removeContact", {});
  },
  data: () => {
    return {
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      headers: [
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Cellphone", value: "cellphone" },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("contact", ["contacts"]),
    ...mapState("contact", {
      showNotifications: "showNotification",
      notificationMessage: "notificationMessage",
    }),
    showNotification: {
      get(): any {
        return this.showNotifications;
      },
      set(value): void {
        this.updateShowNotification(value);
      },
    },
  },
  methods: {
    ...mapActions("contact", {
      updateAddContactDialog: "updateAddContactDialog",
      updateEditContactDialog: "updateEditContactDialog",
      // updateRemoveContactDialog: "updateRemoveContactDialog",
      updateShowNotification: "updateShowNotification",
      loadContacts: "loadContacts",
      updateContact: "updateContact",
      // removeContact: "removeContact",
    }),
    addContact() {
      this.updateAddContactDialog(true);
    },
    editContact(item: any) {
      if (item) {
        eventBus.$emit("open-edit-contact-modal", item);
        this.updateEditContactDialog(true);
      }
    },
    // removeContact(item: any) {
    //   if (item) {
    //     eventBus.$emit("open-remove-contact-modal", item);
    //     this.updateRemoveContactDialog(true);
    //   }
    // },
    async goToActionPage(action: string) {
      if (action === "add") {
        await this.loadContacts({});
      }
      if (action === "patch") {
        await this.updateContact({});
      }
      // if (action === "delete") {
      //   await this.removeContact({});
      // }
    },
  },
});
</script>
