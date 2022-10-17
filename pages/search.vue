<template>
  <div class="p-8 flex flex-col items-start gap-12">
    <nuxt-link
      to="/"
      class="bg-purple-200 font-semibold text-purple-500 px-4 py-2 rounded ml-auto shadow hover:shadow-xl transition duration-200"
      >Home 🏠</nuxt-link
    >
    <input
      type="search"
      placeholder="cat jam?"
      v-model="computedQuery"
      autofocus
      class="px-6 py-4 w-80 rounded mx-auto"
    />

    <div v-if="isGifAvailable" class="grid md:grid-cols-3 gap-8 masonry">
      <div
        class="shadow rounded-lg overflow-hidden"
        v-for="gif in gifs"
        :key="gif.id"
      >
        <img :src="getGif(gif)" />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      query: "",
    };
  },
  created() {
    this.search = debounce(this.search, 200);
  },
  computed: {
    ...mapState(["searchResults"]),

    computedQuery: {
      get() {
        return this.query;
      },
      set(val) {
        this.query = val;
        this.search(val);
      },
    },

    gifs() {
      return this.searchResults?.results;
    },

    isGifAvailable() {
      return this.gifs?.length > 0;
    },
  },
  methods: {
    ...mapActions(["getTrends", "getSearch"]),

    search(val) {
      this.getSearch(val);
    },

    getGif(gif) {
      return gif?.media_formats?.gif?.url;
    },
  },
};
</script>

<style>
/* Only on FF, but nice to try: https://caniuse.com/?search=%20grid-template-rows%3A%20masonry  */
.masonry {
  grid-template-rows: masonry;
}
</style>
