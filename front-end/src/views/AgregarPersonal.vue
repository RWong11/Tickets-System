<template>
  <div>
    <h1>Agregar Personal</h1>
    <b-form @submit.prevent="guardarPersona()">
      <Input
        v-model="persona.Nombre"
        id="nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre"
        :maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="Es necesario ingresar el nombre"
        class="mb-2"
      />
      <Input
        v-model="persona.Apellidos"
        id="apellidos"
        titulo="Apellidos"
        placeholder="Ingrese los apellidos"
        :maxlength="80"
        :error="erroresValidacion && !validacionApellidos"
        mensajeError="Es necesario ingresar los apellidos"
        class="mb-2"
      />
      <Input
        v-model="persona.Telefono"
        id="telefono"
        titulo="Telefono"
        :maxlength="10"
        placeholder="Ingrese el teléfono"
        class="mb-2"
      />
      <Input
        v-model="persona.Direccion"
        id="direccion"
        titulo="Dirección"
        :maxlength="150"
        placeholder="Ingrese la dirección"
      />
      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Input from "../components/Input";

export default {
    name: 'Agregar',

    components: {
    Input,
  },
  data() {
    return {
      persona: {
        Nombre: "",
        Apellidos: "",
        Telefono: "",
        Direccion: "",
      },
      erroresValidacion: false,
    };
  },

  computed: {
    validacionNombre() {
      return (
        this.persona.Nombre !== undefined && this.persona.Nombre.trim() !== ""

      );
    },
    validacionApellidos() {
      return (
        this.persona.Apellidos !== undefined && this.persona.Apellidos.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["agregarPersona"]),
    guardarPersona() {
      if (this.validacionNombre && this.validacionApellidos) {
        this.erroresValidacion = false;

        this.agregarPersona({
          params: this.persona,
          onComplete: (response) => {
            console.log(response.data);
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.push({
                name: 'Personal'
            })
          },
          onError: (error) => {
            console.log(error.response.data.mensaje);
            this.$notify({
              type: 'error', 
              title: error.response.data.mensaje,
            });
          },
        });
      } else {
        this.erroresValidacion = true;
      }
    },
  },
};
</script>