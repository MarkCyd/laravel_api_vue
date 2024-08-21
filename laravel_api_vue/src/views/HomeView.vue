<script setup>
import { usePostStore } from '@/stores/post';
import { onMounted, ref } from 'vue';
import {RouterLink} from 'vue-router';

const {getAllPosts} = usePostStore();
const posts= ref([]);

onMounted(async () => posts.value = await getAllPosts());
</script>

<template>
  <main>
  <h1 class="title">Lastest Post</h1>

      <div v-if="posts.length > 0">
        <div v-for="post in posts" :key="post.id" class="pl-4 mb-12 border-l-4 border-blue-500">
          <h2 class="text-3xl font-bold ">{{ post.title }}</h2>
          <p class="mb-4 text-xs text-slate-600">
            Posted by: {{post.user.name}}
          </p>
          <p>
            {{post.body}}
            <RouterLink :to="{name: 'show', params: {id: post.id}}"
            class="font-bold text-blue-500 underline">Read more...</RouterLink>
          </p>
        </div>
      </div>

      <div v-else>
        <h2 class="title">No Post Yet</h2>
       </div>
  </main>
</template>
