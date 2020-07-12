<template>
  <div class="justify-end">
    <v-dialog v-model="showEditContactDialog" width="450">
      <v-card>
        <v-form v-model="valid" @submit.prevent="saveAndCloseForm" ref="form">
          <v-container class="px-11 py-7">
            <v-row>
              <h1 class="headline">Edit Contact</h1>
              <v-spacer></v-spacer>
              <v-btn icon @click="resetContactForm()">
                <v-icon dark>mdi-close</v-icon>
              </v-btn>
            </v-row>
            <v-row class="mt-5">
              <label>
                First name
                <span class="grey--text text--lighten-1">(Optional)</span>
              </label>

              <v-responsive width="100%"></v-responsive>
              <v-text-field v-model="firstName" type="text" autocomplete="off" outlined dense></v-text-field>
            </v-row>
            <v-row>
              <label>
                Last name
                <span class="grey--text text--lighten-1">(Optional)</span>
              </label>
              <v-responsive width="100%"></v-responsive>
              <v-text-field v-model="lastName" type="text" autocomplete="off" outlined dense value=lastName></v-text-field>
            </v-row>
            <v-row>
              <label>
                Cellphone
                <span class="grey--text text--lighten-1">(Required)</span>
              </label>
              <v-responsive width="100%"></v-responsive>
              <v-text-field v-model="cellphone" type="text" autocomplete="off" outlined dense></v-text-field>
            </v-row>
            <v-row class="justify-end mt-12">
              <v-card-actions class="pr-0">
                <v-btn outlined color="primary" @click.stop="resetContactForm()">Cancel</v-btn>
                <v-btn type="submit" color="primary">Update Contact</v-btn>
              </v-card-actions>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { eventBus } from "@/eventBus";

export default Vue.extend({
  name: "EditContact",
  data() {
    return {
      hasErrorActive: false,
      valid: true,
      showConfirmationBox: false,
      id: "",
      firstName: "",
      lastName: "",
      cellphone: "",
      errors: {},
    };
  },
  mounted () {
    eventBus.$on("open-edit-contact-modal", (data: any) => {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.cellphone = data.cellphone;
    });
  },
  computed: {
    ...mapState("contact", {
      showEditContactDialog: "showEditContactDialog",
      selectedContacts: "selectedContacts",
      prevPages: "prevPages",
      currentPage: "currentPage",
    }),
  },
  methods: {
    ...mapActions("contact", {
      updateContact: "updateContact",
      updateEditContactDialog: "updateEditContactDialog",
      updateShowNotification: "updateShowNotification",
    }),
    closeDialog() {
      this.updateEditContactDialog(false);
    },
    resetContactForm() {
      this.closeDialog();
    },
    clearErrors() {
      this.errors = {};
    },
    formIsValid() {
      return this.valid && this.cellphone !== "" && !this.hasErrorActive;
    },
    async saveAndCloseForm() {
      const result = await this.saveContact();
      this.closeDialog();

      if (result && result.status === 200) {
        this.updateShowNotification({
          show: true,
          message: "Contact successfuly updated.",
        });
      } else {
        this.updateShowNotification({
          show: true,
          message: "Contact could not be saved. Please try again.",
        });
      }
    },
    async saveContact(): Promise<any> {
      const updateContactResponse: any = await this.updateContact({
        contact: {
          id: this.id,
          firstName: this.firstName,
          lastName: this.lastName,
          cellphone: this.cellphone,
        },
      });
      return updateContactResponse;
    },
  },
});
</script>

<style lang="scss" scoped>
.phone-input {
  width: 100% !important;
}
</style>
