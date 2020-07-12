<!--<template>
  <div class="justify-end">
    <v-dialog v-model="showRemoveContactDialog" width="450">
      <v-card>
        <v-form v-model="valid" @submit.prevent="removeAndCloseForm" ref="form">
          <v-container class="px-11 py-7">
            <v-row>
              <h1 class="headline">Remove {{this.firstname}}</h1>
              <v-spacer></v-spacer>
              <v-btn icon @click="resetContactForm()">
                <v-icon dark>mdi-close</v-icon>
              </v-btn>
            </v-row>
            <v-row>
              <v-card-text>
                <p>
                    Are you sure?
                </p>
              </v-card-text>
            </v-row>
            <v-row class="justify-end mt-12">
              <v-card-actions class="pr-0">
                <v-btn outlined color="primary" @click.stop="resetContactForm()">Cancel</v-btn>
                <v-btn type="submit" color="primary">Remove Contact</v-btn>
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
  name: "RemoveContact",
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
    eventBus.$on("open-remove-contact-modal", (data: any) => {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.cellphone = data.cellphone;
    });
  },
  computed: {
    ...mapState("contact", {
      showRemoveContactDialog: "showRemoveContactDialog",
      selectedContacts: "selectedContacts",
      prevPages: "prevPages",
      currentPage: "currentPage",
    }),
  },
  methods: {
    ...mapActions("contact", {
      removeContact: "removeContact",
      updateRemoveContactDialog: "updateRemoveContactDialog",
      updateShowNotification: "updateShowNotification",
    }),
    closeDialog() {
      this.updateRemoveContactDialog(false);
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
    async removeAndCloseForm() {
      const result = await this.removeContact();
      this.closeDialog();

      if (result && result.status === 204) {
        this.updateShowNotification({
          show: true,
          message: "Contact successfuly removed.",
        });
      } else {
        this.updateShowNotification({
          show: true,
          message: "Contact could not be removed. Please try again.",
        });
      }
    },
    async removeContact(): Promise<any> {
      const removeContactResponse: any = await this.removeContact();
      return removeContactResponse;
    },
  },
});
</script>

<style lang="scss" scoped>
.phone-input {
  width: 100% !important;
}
</style>-->
