<script setup>
import { useAuthStore } from '@/stores/auth';
import { usePostStore } from '@/stores/post';
import { onMounted , ref} from 'vue';
import { useRoute , RouterLink } from 'vue-router';

const route =useRoute();
const {getPost,deletePost} = usePostStore();
const authStore = useAuthStore();
const post = ref(null);

onMounted(async() => post.value =await getPost(route.params.id));
</script>

<template>
    <main>
        <div v-if="post">
        <div class="pl-4 mt-12 border-l-4 border-blue-500">
          <h2 class="text-3xl font-bold ">{{ post.title }}</h2>
          <p class="mb-4 text-xs text-slate-600">
            Posted by: {{post.user.name}}
          </p>
          <p>
            {{post.body}}
           
          </p>
        
          <div v-if="authStore.user && authStore.user.id === post.user_id" class="flex items-center gap-6">
            <form @submit.prevent="deletePost(post)">
                <button class="px-2 py-1 font-bold text-red-500 border border-red-300">Delete</button>
            </form>
            <RouterLink :to="{name: 'update', params: {id: post.id}}"
                class="px-2 py-1 font-bold text-green-500 border border-green-300">Update
                
            </RouterLink>
          </div>
        </div>
      </div>

      <div v-else>
        <h2 class="title">No Post Yet</h2>
       </div>
    </main>
</template>
