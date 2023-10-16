<template>
  <div id="app">
    <Header subtitle="Novi zaposleni"/>

    <b-form @submit="onSubmit">

      <b-form-group label="Ime:" label-for="ime">
        <b-form-input id="ime" v-model="form.ime" placeholder="Unesi ime" required></b-form-input>
      </b-form-group>

      <b-form-group label="Prezime:" label-for="prezime">
        <b-form-input id="prezime" v-model="form.prezime" placeholder="Unesi prezime" required></b-form-input>
      </b-form-group>

      <b-form-group label="JMBG:" label-for="jmbg">
        <b-form-input id="jmbg" v-model="form.jmbg" placeholder="Unesi JMBG" required></b-form-input>
      </b-form-group>

      <b-form-group label="Email:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Unesi email" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Adresa:" label-for="adresa">
        <b-form-input id="adresa" v-model="form.adresa" placeholder="Unesi adresu" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Pozicija:" label-for="pozicija">
        <b-form-input id="pozicija" v-model="form.pozicija" placeholder="Unesi poziciju" required></b-form-input>
      </b-form-group>

      <b-form-group label="Datum zaposlenja:" label-for="datum_zaposlenja">
        <b-form-input id="datum_zaposlenja" v-model="form.datum_zaposlenja" placeholder="Unesi datum zaposlenja" required></b-form-input>
      </b-form-group>

      <b-form-group label="Nadredjeni:" label-for="nadredjeni">
        <b-form-input id="nadredjeni" v-model="form.nadredjeni" placeholder="Unesi nadredjenog" required></b-form-input>
      </b-form-group>

      <b-form-group label="Status:" label-for="status">
        <b-form-input id="status" v-model="form.status" placeholder="Unesi status zaposljenja" required></b-form-input>
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
    name: 'Insert',
    
    components: {
      Header
    },

    data() {
      return {
        form: {
          jmbg: '',
          ime: '',
          prezime: '',
          email: '',
          adresa: '',
          pozicija: '',
          datum_zaposlenja: '',
          nadredjeni: '',
          status: ''
        }
      }
    },

    computed: {
      ...mapState([
        'token'
      ])
    },

    methods: {
      ...mapActions([
        'insert'
      ]),

      onSubmit(e) {
        e.preventDefault();

        this.insert(this.form);
        this.$router.push({ name: 'Firma' });
      }
    }
  }
</script>

<style scoped>

</style>

