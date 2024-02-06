
<template>
<div>

  <h1 class="text-center">Paginacion</h1>
  <b-breadcrumb :items="items" ></b-breadcrumb>

  <div class="mt-5 mb-5">
    <b-container class="mt-5" >
      <b-input v-model="filtro"></b-input>
      <b-table
          id="my-table"
          :items="vehiculos"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          label-sort-asc=""
          label-sort-desc=""
          small
          :filter="filtro"
          @filtered="onFiltered"
      >
      </b-table>
      <div class="overflow-auto">
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
        ></b-pagination>

        <p class="mt-3">Current Page: {{ currentPage }}</p>
      </div>
    </b-container>
  </div>

  <router-link to="/formulario">Registrar auto</router-link>
</div>
</template>

<script >
import {GetAutos} from "@/services/Autos";
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
          active: true,
        }
      ],
      filtro: null,
      sortBy: "brand",
      sortDesc: false,
      perPage: 5,
      rows: 0,
      currentPage: 1,
      vehiculos: [],
      fields: [{key: "brand", label: "Marca", sortable: true},
        {key: "model", label: "Modelo", sortable: true},
        {key: "year", label: "Año", sortable: true},
        {key: "serie", label: "Serie", sortable: true}
      ],
    }
  },
  mounted() {
    this.obtenerAutos();
  },
    methods:{
      async obtenerAutos(){
        try {
          const data = await GetAutos(
              parseInt(this.currentPage),
              parseInt(this.perPage),
              this.sortBy
          );
          console.log(data);
          this.vehiculos = data.content;
          this.rows = this.vehiculos.length;
        } catch (e) {
          console.log(e);
        }
      },
      onFiltered(filteredItems) {
        this.rows = filteredItems.length;
        this.currentPage = 1;
      }
    },
};
</script>

<style scoped>

</style>