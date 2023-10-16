<template>
  <div>
    <!--Header :subtitle="subtitle"/-->
    <SingleZaposlen v-if="zaposlen" :zaposlen="zaposlen" />
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import SingleZaposlen from '@/components/SingleZaposlen.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Single',

    components: {
      Header,
      SingleZaposlen
    },

    data() {
      return {
        zaposlen: null,
        }
    },
    
    methods: {
      ...mapActions([
        'fetchZaposlenById'
      ])
    },

    mounted() {
      this.fetchZaposlenById(this.$route.params.id).then( res => {
        this.zaposlen = res;
      });
    }
  }

</script>