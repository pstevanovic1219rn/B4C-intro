<template>
  <div id="app">
    <Header subtitle="Izmeni zaposlenog"/>

    <b-form @submit="onSubmit">

      <b-form-group label="Ime:" label-for="ime">
        <b-form-input id="ime" v-model="form.ime" :placeholder="zaposlen.ime" required></b-form-input>
      </b-form-group>

      <b-form-group label="Prezime:" label-for="prezime">
        <b-form-input id="prezime" v-model="form.prezime" :placeholder="zaposlen.prezime" required></b-form-input>
      </b-form-group>

      <b-form-group label="JMBG:" label-for="jmbg">
        <b-form-input id="jmbg" v-model="form.jmbg" :placeholder="zaposlen.jmbg" required></b-form-input>
      </b-form-group>

      <b-form-group label="Email:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" :placeholder="zaposlen.email" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Adresa:" label-for="adresa">
        <b-form-input id="adresa" v-model="form.adresa" :placeholder="zaposlen.adresa" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Pozicija:" label-for="pozicija">
        <b-form-input id="pozicija" v-model="form.pozicija" :placeholder="zaposlen.pozicija" required></b-form-input>
      </b-form-group>

      <b-form-group label="Nadredjeni:" label-for="nadredjeni">
        <b-form-input id="nadredjeni" v-model="form.nadredjeni" :placeholder="zaposlen.nadredjeni" required></b-form-input>
      </b-form-group>

      <b-form-group label="Status:" label-for="status">
        <b-form-input id="status" v-model="form.status" :placeholder="zaposlen.status" required></b-form-input>
      </b-form-group>

      <br>
      <b-button  type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Edit',
    
    components: {
      Header
    },

    data() {
      return {
        zaposlen: '',
        form: {
          id: '',
          jmbg: '',
          ime: '',
          prezime: '',
          email: '',
          adresa: '',
          pozicija: '',
          nadredjeni: '',
          status: ''
        }
      }
    },

    computed: {
      ...mapState([
        'token',
      ])
    },

    methods: {
      ...mapActions([
        'editZaposlenById',
        'fetchZaposlenById'
      ]),

      onSubmit(e) {
        e.preventDefault();

        this.form.id = this.zaposlen.id;
        this.editZaposlenById(this.form);
        this.$router.push({ name: 'Firma' });
      }
    },

    mounted() {
      this.fetchZaposlenById(this.$route.params.id).then( res => {
        this.zaposlen = res;
      });
    },
  }
</script>

<style scoped>

</style>

