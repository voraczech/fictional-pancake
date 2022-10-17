<template>
  <div class="p-8 flex flex-col items-start">
    <nuxt-link
      to="/search"
      class="bg-purple-200 font-semibold text-purple-500 px-4 py-2 rounded mb-8 ml-auto shadow-sm hover:bg-purple-300 hover:text-purple-700 transition duration-200"
      >Search 🔎</nuxt-link
    >
    <div
      v-if="isGifAvailable"
      class="grid md:grid-cols-3 lg:grid-cols-6 gap-8 masonry"
    >
      <div
        class="shadow rounded-lg overflow-hidden my-auto"
        v-for="gif in gifs"
        :key="gif.id"
      >
        <img :src="getGif(gif)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  async fetch() {
    await this.getTrends();
  },
  computed: {
    ...mapState(["trends"]),

    gifs() {
      return this.trends?.results;
    },

    isGifAvailable() {
      return this.gifs?.length > 0;
    },
  },
  methods: {
    ...mapActions(["getTrends"]),

    getGif(gif) {
      return gif?.media_formats?.gif?.url;
    },
  },
};
</script>

<style>
/* Low support, but nice to try: https://caniuse.com/?search=%20grid-template-rows%3A%20masonry  */
.masonry {
  grid-template-rows: masonry;
}
</style>
