

<template>
<div>
  <h1 class="text-center">Formulario</h1>
  <b-breadcrumb :items="items"></b-breadcrumb>

  <div>

    <b-form @submit="onSubmit"  @submit.prevent="checkForm">
      <b-alert variant="danger" dismissible :show="errors.length > 0">
        <b>{{
            errors.length > 1
                ? "Please correct the following errors:"
                : "Please correct the following error:"
          }}</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </b-alert>
      <b-form-group
          id="brand"
          label="brand"
          label-for="brand"
      >
        <b-form-input
            id="brand"
            v-model="vehicle.brand"
            placeholder="brand"

        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="model"
          label="model"
          label-for="model"
      >
        <b-form-input
            id="model"
            v-model="vehicle.model"
            placeholder="model"

        ></b-form-input>

      </b-form-group>

      <b-form-group
          id="year"
          label="year"
          label-for="year"
      >
        <b-form-input
            id="year"
            v-model="vehicle.year"
            placeholder="year"
            type="date"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="serie"
        label="serie"
        label-for="serie"
      >
        <b-form-input
            id="serie"
            v-model="vehicle.serie"
            placeholder="serie"


        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ vehicle }}</pre>
    </b-card>
  </div>

</div>
</template>

<script >

import {PostAutos} from "@/services/Autos";


export default {
  data() {
    return {
      items: [
        {
          text: "Inicio",
          href: "#/inicio",
        },
        {
          text: "Paginacion",
          href: "#/paginacion",
        },
        {
          text: "Formulario",
          active: true,
        },
      ],
      errors:[],
      vehicle:{
        brand: '',
        model: '',
        serie: '',
        year: ''
      },

    };
  },
  methods:{
    checkForm: function (e) {
      this.errors = [];
      if (this.vehicle.brand && this.vehicle.model && this.vehicle.year && this.vehicle.serie) {
        return true;
      }

      if (!this.vehicle.brand) {
        this.errors.push('brand requerida.');
      }


      if (!/^[a-zA-Z0-9]*$/.test(this.vehicle.brand)) {
        this.errors.push('brand solo puede contener letras y numeros.');
      }


      if (!/^[a-zA-Z0-9]*$/.test(this.vehicle.model)) {
        this.errors.push('model solo puede contener letras y numeros.');
      }

      if (!this.vehicle.model) {
        this.errors.push('model requerido.');
      }

      if (parseInt(this.vehicle.year.substring(0,4)) > new Date().getFullYear()) {
        this.errors.push('Año no puede ser superior al actual.');
      }

      if (!this.vehicle.year) {
        this.errors.push('Año requerido.');
      }

      if (!this.vehicle.serie) {
        this.errors.push('No. Serie requerido.');
      }

    },
    async onSubmit() {
      try{
        this.vehicle.year = this.vehicle.year.substring(0,4);
        const response = await PostAutos(this.vehicle);
        if(response== 200){
          alert('Auto registrado correctamente');
        }
      }catch (error) {
        console.error(error);
        alert('Error al registrar auto')
      }
      //extraer primeros cuatro caracteres del año




    }

  }
};
</script>

<style scoped>

</style>