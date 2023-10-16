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
    name: 'Firma',
    
    components: {
      Header,
      ZaposleniList
    },

    data() {
        return {
            subtitle: '',
            autID: null
        }
    },

    watch: {
      $route() {

        this.fetchZaposleni();
      }
    },

    mounted() {
        this.fetchZaposleni();
    },

    methods: {
      ...mapActions([
        'fetchZaposleni'
      ])
    }
  }
</script>

<style scoped>

</style>
