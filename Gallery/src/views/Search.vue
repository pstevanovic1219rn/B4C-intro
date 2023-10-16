<template>
  <div id="app">
    <Header :subtitle="subtitle"/>
    <ZaposleniList />
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import ZaposleniList from '@/components/ZaposleniList.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Search',
    
    components: {
      Header,
      ZaposleniList
    },

    data() {
      return {
        subtitle: 'Search results: ',
        imageIDs: null
      }
    },

    mounted() {
      this.search(this.$route.query.q).then( res => {
        this.subtitle += res;
      });
    },

    methods: {
      ...mapActions([
        'search'
      ])
    }
  }
</script>

<style scoped>

</style>
