<template>
  <div>

    <div class="camp">
      
      <ul>
        <li>Ime: {{ zaposlen.ime }}</li>
        <li>Prezime: {{ zaposlen.prezime }}</li>
        <li>JMBG: {{ zaposlen.jmbg }}</li>
        <li>Email: {{ zaposlen.email }}</li>
        <li>Adresa: {{ zaposlen.adresa }}</li>
        <li>Pozicija: {{ zaposlen.pozicija }}</li>
        <li>Datum zaposlenja: {{ zaposlen.datum_zaposlenja }}</li>
        <li>Nadredjenji: {{ zaposlen.nadredjeni }}</li>
        <li>Status zaposljenja: {{ zaposlen.status }}</li>
      </ul>
    </div>

    <div>
      <button type="button" v-on:click="editZaposlen(zaposlen.id)">Edit</button>
      <button type="button" v-on:click="deleteZaposlen(zaposlen.id)">Delete</button>
      </div>

  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'SingleZaposlen',

    props: {
      zaposlen: Object
    },

    computed: {
      ...mapState([
        'zaposleni'
      ])
    },

    methods: {
      ...mapActions([
        'deleteZaposlenById'
      ]),

      editZaposlen(zaposlenId){
        this.$router.push({ name: 'Edit', params: { id: zaposlenId } });
      },

      deleteZaposlen(zaposlenId){
      this.deleteZaposlenById(zaposlenId);
      this.$router.push({ name: 'Firma'});
      },

    }
  }

</script>

<style scoped>

  img {
    max-width: 600px;
    max-height: 600px;
  }

  .art {
    border-bottom-style: solid;
    margin-bottom: 10px;
  }

  .button {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

</style>