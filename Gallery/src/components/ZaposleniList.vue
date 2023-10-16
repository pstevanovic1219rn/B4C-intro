<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="zaposleni.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
    <b-table
      id="image-table"
      hover
      fixed
      :items="items"
      :fields="fields"
      small
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
    >
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="zaposleni.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'ZaposleniList',

    data() {
      return {
        fields: ['ime', 'prezime', 'adresa', 'pozicija'],
        items: [],
        currentPage: 1,
        perPage: 5
      }
    },

    computed: {
      ...mapState([
        'zaposleni'
      ])
    },

    watch: {
      currentPage(nVal, oVal) {
        this.zaposleni.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage).map( id => {
          this.fetchZaposlenById(id).then( obj => this.items.push(obj) );
        });
      },

      zaposleni(nVal, oVal) {
        this.currentPage = 1;
        this.items = [];

         nVal.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage).map( id => {
           this.fetchZaposlenById(id).then( obj => this.items.push(obj) );
         });
      }
    },

    mounted() {
      this.zaposleni.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage).map( id => {
        this.fetchZaposlenById(id).then( obj => this.items.push(obj) );
      });
      
    },

    methods: {
      ...mapActions([
        'fetchZaposlenById'
      ]),

      rowClicked(record, index) {
        this.$router.push({ name: 'Single', params: { id: record.id } });
      }
    }
  }
</script>

<style scoped>
  .pagination {
    justify-content: center;
  }
</style>