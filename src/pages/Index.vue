<template>
  <Layout>
    <header class="hero flex">
      <div class="my-auto">
        <div class="text-4xl">College Survival Guide</div>
        <div class="text-2xl">All the important things.</div>
      </div>
    </header>
    <section id="search">
      <div class="w-full">
        <!-- Search box -->
        <input class="w-full my-4 p-2 bg-white rounded-md p-4 shadow-lg" type="text" name="search" id="searchInput" placeholder="Search" v-on>
      </div>
    </section>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Home',
  },
};
</script>

<style lang="postcss">
.hero {
  height: 256px;
}
</style>
