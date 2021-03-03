<template>
<section class="breadcrumbs-wrapper">
<router-link to="/">Home</router-link>
<p> / </p>
<router-link v-if="path2" :to="path1"> {{path1}} </router-link>

<p v-else> {{path1}}</p>
<p v-if="path2">/ {{path2}}</p>
</section>
</template>

<script>
export default {
props: {
  path1: String,
  path2: String
}
}
</script>

<style lang="scss" scoped>
.breadcrumbs-wrapper {
  display: flex;
  margin: 2rem 0;
  font-size: 1.2rem;
}
</style>