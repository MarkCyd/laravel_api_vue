<script setup>
import {useAuthStore} from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from "vue";


/* better way calling errors dont forget () */
const {errors} = storeToRefs(useAuthStore());
      /*edited authstore to {authenticate} */
const {authenticate} = useAuthStore(); /* fetch data state in auth.js */

const formData= reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  });

  onMounted(() => (errors.value = {}));
</script>

<template>
  <main>
  <h1 class="title">Register New Account</h1>

    <form @submit.prevent="authenticate('register',formData)" 
    class="w-1/2 mx-auto space-y-6" >
      <div>
        <input type="text" placeholder="name" v-model="formData.name"> 
        <p v-if="errors.name" class="error">{{errors.name[0]}}</p>
        </div>

      <div>
        <input type="text" placeholder="email" v-model="formData.email"> 
        <p v-if="errors.email" class="error">{{errors.email[0]}}</p>
      </div>

      <div>
        <input type="password" placeholder="password" v-model="formData.password"> 
        <p v-if="errors.password" class="error">{{errors.password[0]}}</p>
      </div>

      <div>
        <input type="password" placeholder="confirm password" v-model="formData.password_confirmation"> 
        
      </div>
      <button class="primary-btn">Register</button>
    </form>
  </main>
</template>
