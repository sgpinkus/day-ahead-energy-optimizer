<script lang='ts'>
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import model from '@/model';
import defaultAvatar from '@/assets/default-avatar.svg';
import { userTitle } from '@/model/utils';
import type { IUser } from '@/types';


export default defineComponent({
  props: {
    isSelf: { required: false, default: false,  type: Boolean },
    badge: { required: false, default: false, type: Boolean },
    user: { required: true, type: Object as PropType<IUser> },
    imgIconSize: { default: 32 },
    focused: { type: Boolean as PropType<boolean>, default: false },
  },
  data() {
    return {
      model,
      defaultAvatar,
    };
  },
  computed: {
    profilePictureUrl() {
      return this.user?.picture ?? defaultAvatar;
    },
    userTitle() {
      if(!this.user && this.isSelf) return 'You';
      if(this.user) {
        if(!this.isSelf) return userTitle(this.user);
        else return userTitle(this.user) + ' (you)';
      }
      return '-';
    },
    userSubTitle() {
      return this.user?.email;
    }
  },
});
</script>

<template>
    <v-list-item :class='{ focused: focused }'>
    <v-list-item-title>
      {{ userTitle }}
    </v-list-item-title>
    <v-list-item-subtitle v-if='userSubTitle'>
      {{ userSubTitle }}
    </v-list-item-subtitle>
    <template v-slot:prepend>
      <v-badge v-if='badge' dot color="success" style='margin-right: 16px'>
        <v-avatar :size='imgIconSize'>
          <v-img :src='profilePictureUrl'></v-img>
        </v-avatar>
      </v-badge>
      <v-avatar v-else :size='imgIconSize'>
        <v-img :src='profilePictureUrl'></v-img>
      </v-avatar>
    </template>
  </v-list-item>
</template>

<style>
  .focused {
    background-color: lightgray;
  }

  .v-btn {
    min-width: 1em;
    padding: 0;
    margin: 0;
  }
</style>