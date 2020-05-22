<template>
  <Layout>
    <header class="hero flex">
      <div class="my-auto">
        <div class="text-4xl">College Survival Guide</div>
        <div class="text-2xl">All the important things.</div>
      </div>
    </header>
    <section id="search">
      <div class="w-full flex content-center">
        <!-- Search box -->
        <input class="w-full my-4 p-2 bg-white rounded-md p-4 shadow-lg"
        type="text"
        name="search"
        id="searchInput"
        placeholder="Search"
        v-model="searchQuery"
        v-on:keypress="onKeyDown">
        <button class="align-center bg-blue-200 p-4 rounded-md shadow-lg m-4" v-on:click="performSearch">
          <i class="material-icons">search</i>
        </button>
      </div>
    </section>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Home',
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    onKeyDown(event) {
      console.log(event);
      if (event.key === 'Enter' && this.searchQuery.trim() !== '') {
        this.performSearch();
      }
    },
    performSearch() {
      if (this.searchQuery.trim() === '') {
        return;
      }
      // TODO: Update results on page
      this.$router.push({
        path: '/search',
        query: {
          q: this.searchQuery,
        },
      });
    }
  },
};
</script>

<style lang="postcss">
.hero {
  height: 256px;
}
</style>
