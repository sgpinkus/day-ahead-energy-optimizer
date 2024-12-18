<script setup lang='ts'>
import { computed, provide, type Ref } from 'vue';
import model from '@/model';
// import UserListItemCard from './UserListItemCard.vue';

const rail = computed({
  get() { return model.rail; },
  set(v) { model.rail = v; },
});

provide('rail', rail);

const navDrawerProps = computed(() => ({
  permanent: true,
  app: true,
  rail: rail.value,
  order: 2,
}));

function login() {
  null;
}

// const authUser = computed(() => null);
const connectionOk: Ref<string | boolean> = computed(() => false);
const authOk: Ref<string | boolean> = computed(() => false);

function clickOutsideClear() {
  // Hack: Mobile can't press ESC key to deactivate active object. This give them a break out.
  // Means need to carefully stop propagation buttons in the nav we dont want this to happen on -
  // example focus and activate buttons!
  null;
}
</script>

<template>
  <v-navigation-drawer
    v-bind="navDrawerProps"
    @click="clickOutsideClear"
  >
    <template #prepend>
      <v-list-item
        prepend-icon="mdi-menu"
        @click="rail = !rail"
      />
      <v-divider />
    </template>
    <template #append>
      <v-divider />
      <v-list-item v-if="connectionOk === 'pending'">
        <template #prepend>
          <v-icon class="loading">
            mdi-loading
          </v-icon>
        </template>
        Checking Connection
      </v-list-item>
      <v-list-item
        v-else-if="connectionOk === false"
        @click="() => {}"
      >
        <template #prepend>
          <v-icon>mdi-api-off</v-icon>
        </template>
        Offline Mode
      </v-list-item>
      <v-list-item v-else-if="authOk === 'pending'">
        <template #prepend>
          <v-icon class="loading">
            mdi-loading
          </v-icon>
        </template>
        Checking Auth
      </v-list-item>
      <v-list-item
        v-else-if="authOk === false"
        prepend-icon="mdi-login-variant"
        @click="login"
      >
        Login / Signup
      </v-list-item>
      <!-- <template v-else>
        <v-menu>
          <template v-slot:activator='{ props }'>
            <UserListItemCard
              v-bind='props'
              :user='authUser'
            ></UserListItemCard>
          </template>
          <v-list>
            <router-link to='/account'>
              <v-list-item prepend-icon="mdi-account-arrow-right">
                Account
              </v-list-item>
            </router-link>
            <router-link to='/logout'>
              <v-list-item prepend-icon="mdi-logout-variant">
                Logout
              </v-list-item>
            </router-link>
          </v-list>
        </v-menu>
      </template> -->
    </template>
    <template #default>
      <slot />
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
  @keyframes loading {
    100% { transform: rotate(360deg); }
  }

  .loading {
    animation: loading 4s linear infinite;
  }
</style>