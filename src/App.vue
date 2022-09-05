<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand">PTCG Helper</a>
      </div>
    </nav>
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>
