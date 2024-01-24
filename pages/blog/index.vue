<template>
  <div>
    <h1>Blog Posts</h1>
    <ul>
      <li v-for="article in articles" :key="article.guid">
        <h2>{{ article.title }}</h2>
        <p>{{ article.postContent }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { data: articles } = await useFetch("/api/articles");
// console.log(da)
// import { useAsyncData } from "nuxt/app";

// const { data: articles } = useAsyncData(async () => {
//   const response = await fetch("/api/articles"); // Assurez-vous que l'URL correspond à votre endpoint d'API
//   if (!response.ok) {
//     throw new Error("Failed to fetch articles");
//   }
//   return await response.json();
// });
</script>
