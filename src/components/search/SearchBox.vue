<template>
  <div class="w-full flex content-center">
    <!-- Search box -->
    <input class="w-full my-4 mr-4 bg-white rounded-md p-4 shadow-md hover:shadow-lg focus:shadow-lg custom-outline"
      type="text"
      name="search"
      id="searchInput"
      placeholder="Search"
      v-model="searchQuery"
      v-on:keypress="onKeyDown">
    <button :class="searchButtonClasses" v-on:click="performSearch" :disabled="!this.readyToSearch">
      <i class="material-icons">search</i>
    </button> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    /**
     * True if a search should be performed when triggered.
     *
     * This checks if the search box is empty.
     */
    readyToSearch() {
      return this.searchQuery.trim() !== ''; 
    },
    searchButtonClasses() {
      return {
        'my-4 px-4 py-2 rounded-md focus:custom-outline': true,
        'bg-gray-400': !this.readyToSearch,
        'bg-blue-200 shadow-md hover:shadow-lg focus:shadow-lg': this.readyToSearch,
      };
    },
  },
  methods: {
    onKeyDown(event) {
      console.log(event);
      if (event.key === 'Enter' && this.readyToSearch) {
        this.performSearch();
      }
    },
    onSearchUpdate() {

    },
    performSearch() {
      if (!this.readyToSearch) {
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

<style lang="postcss" scoped>
.custom-outline {
  outline-width: thin;
  outline-color: #64B5F6;
}
</style>