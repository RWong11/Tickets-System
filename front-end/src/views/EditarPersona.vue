<template>
    <div>
        <h1>Editar Persona</h1>
        <b-form @submit.prevent="guardarPersona()">
        <Input
            v-model="persona.Nombre"
            id="nombre"
            titulo="Nombre"
            :valueText="persona.Nombre"
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
            :valueText="persona.Apellidos"
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
            :valueText="persona.Telefono"
            :maxlength="10"
            placeholder="Ingrese el teléfono"
            class="mb-2"
        />
        <Input
            v-model="persona.Direccion"
            id="direccion"
            titulo="Dirección"
            :valueText="persona.Direccion"
            :maxlength="150"
            placeholder="Ingrese la dirección"
        />
        <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
        </b-form>  
    </div>
</template>
<script>
import Vue from 'vue'
import { mapActions , mapState} from 'vuex'
import Input from "../components/Input";

export default {

    name: 'Editar-Persona',
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
        ...mapActions(['obtenerPersona', 'editarPersona']),
        guardarPersona(){
            if(this.validacionNombre && this.validacionApellidos){
                this.erroresValidacion = false;

                this.editarPersona({
                    id: this.$route.params.id,
                    params:this.persona,
                    onComplete: (response) => {
                        console.log(respose.data);
                        this.$notify({
                            type: 'success',
                            title: response.data.mensaje,
                        });
                        this.$router.push({
                            name: 'Editar-Principal'
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
            }else {
                this.erroresValidacion = true;
            }
        }
    },
    created() {
        this.obtenerPersona({
            id: this.$route.params.id,
            onComplete: (response) => {
                Vue.set(this, 'persona', response.data.data)
            }
        })
    }
}
</script>