<template>
  <div class="form">
        <h1>{{titulo}}</h1>
        <b-form @submit.prevent="editarTicket()">
            <Input 
                class="mt-2"
                id="nombre"
                titulo="Nombre: "
                placeholder="Ingrese un nombre"

                :valueText="ticket.Nombre"

                :disabled="disabledNombre"
                :maxlength="50"
                :error="erroresValidacion && !validarNombre"
                mensajeError="Debe ingrese un nombre."
            />
            <Input
                class="mt-2"
                v-model="ticket.Descripcion"
                id="Descripcion"
                titulo="Descripcion: "
                placeholder="Ingrese la descripción"
                :valueText="ticket.Descripcion"
                :disabled="disabledDescripcion"
                :maxlength="100"
            />
            <Select 
                class="mt-2"
                v-model="ticket.IDPrioridad"
                :options="prioridades" 
                id="prioridad" 
                titulo="Prioridad:" 
                placeholder="Seleccione prioridad"
                :selectedItem="ticket.IDPrioridad"
                :disabled="disabledPrioridad"
                :error="erroresValidacion && !validarPrioridad"
                mensajeError="Debes seleccionar una prioridad"
            />
            <Select 
                class="mt-2"
                v-model="ticket.IDPersonal"
                :options="selectDePersonal()" 
                id="personal" 
                titulo="Personal:" 
                placeholder="Seleccione personal"
                :selectedItem="ticket.IDPersonal"
                :disabled="disabledPersonal"
                :error="erroresValidacion && !validarPersonal"
                mensajeError="Debes seleccionar una persona"
            />
            <Select 
                class="mt-2"
                v-model="ticket.IDCategoria"
                :options="selectDeCategorias()" 
                id="categoria" 
                titulo="Categoría:" 
                placeholder="Seleccione categoría"
                :selectedItem="ticket.IDCategoria"
                :disabled="disabledCategoria"
                :error="erroresValidacion && !validarCategoria"
                mensajeError="Debes seleccionar una categoría"
            />
            <!-- SOLO SE PODRÁ CAMBIAR EL ESTATUS CUANDO SE SELECCIONE LA OPCIÓN DE CAMBIAR ESTATUS -->
            <Select 
                class="mt-2"
                v-model="ticket.IDEstatus"
                :options="estatusAll" 
                id="estatus" 
                titulo="Estatus: " 
                placeholder="Seleccione el estatus"
                :selectedItem="ticket.IDEstatus"
                :disabled="disabledEstatus"
                :error="erroresValidacion && !validarCategoria"
                mensajeError="Debes seleccionar un estatus"
            />
            <b-button class="mt-2" type="submit" variant="primary">Guardar</b-button>
        </b-form>
    </div>
</template>

<script>
import Vue from 'vue'
import Input from '../components/Input'
import Select from '../components/Select'
import {mapState, mapActions} from 'vuex'

export default {
    name: 'EditarTicket',
    components: {
        Input,
        Select
    },
    props: {
        titulo: {
            type: String,
            default: "Editar Ticket"
        },
        disabledNombre: {
            type: Boolean,
            default: false
        },
        disabledDescripcion: {
            type: Boolean,
            default: false
        },
        disabledPrioridad: {
            type: Boolean,
            default: false
        },
        disabledPersonal: {
            type: Boolean,
            default: false
        },
        disabledCategoria: {
            type: Boolean,
            default: false
        },
        disabledEstatus: {
            type: Boolean,
            deafult: false
        }
    },
    data() {
        return {
            ticket: {

            },
            prioridades: [
                {
                    value: 1,
                    text: "Baja"
                },
                {
                    value: 2,
                    text: "Media"
                },
                {
                    value: 3,
                    text: "Alta"
                },
            ],
            personalAll: [
                {
                    ID: 1,
                    Nombre: "As",
                    Apellidos: "Per"
                },
                {
                    ID: 2,
                    Nombre: "Es",
                    Apellidos: "Ser"
                },
                {
                    ID: 3,
                    Nombre: "Os",
                    Apellidos: "Ner"
                },
                {
                    ID: 4,
                    Nombre: "Weart",
                    Apellidos: "Gar"
                },
            ],
            categoriasAll: [
                {
                    ID: 1,
                    Descripcion: "Peticiones"
                },
                {
                    ID: 2,
                    Descripcion: "Emergencias"
                },
                {
                    ID: 3,
                    Descripcion: "Avisos"
                },
                {
                    ID: 4,
                    Descripcion: "Otros"
                },
            ],
            estatusAll: [
                {
                    value: "ABT",
                    text: "Abierto"
                },
                {
                    value: "ESP",
                    text: "En espera"
                },
                {
                    value: "FIN",
                    text: "Finalizado"
                }
            ],
            erroresValidacion: false
        }
            
    },
    computed: {
        validarNombre() {
            return (
                this.ticket.Nombre !== undefined &&
                this.ticket.Nombre.trim() != ''
            )
        },
        validarPrioridad() {
            return (
                this.ticket.Prioridad !== undefined &&
                this.ticket.Prioridad.trim() != ''
            )
        },
        validarPersonal() {
            return (
                this.ticket.NombrePersonal !== undefined &&
                this.ticket.NombrePersonal.trim() != ''
            )
        },
        validarCategoria() {
            return (
                this.ticket.Categoria !== undefined &&
                this.ticket.Categoria.trim() != ''
            )
        },
    },
    methods: {
        ...mapActions(['set_ticket', 'editar_ticket']),
        editarTicket() {
            if (this.validarNombre && this.validarPrioridad && this.validarPersonal && this.validarCategoria) {
                this.erroresValidacion = false;
                this.editar_ticket({
                    id: this.$route.params.id,
                    params: {
                        Descripcion: this.ticket.Descripcion,
                        Prioridad: this.ticket.IDPrioridad,
                        Personal: this.ticket.IDPersonal,
                        Categoria: this.ticket.IDCategoria,
                        //Sólo habrá cambio de Estatus cuando se seleccione el botón para cambiar Estatus
                        Estatus: this.ticket.IDEstatus
                    },
                    onComplete: (response) => {
                        console.log(response.data);
                        this.$notify({
                            type: 'success',
                            title: response.data.mensaje
                        });
                        this.$router.push({
                            name: 'Tickets'
                        })
                    },
                    onError: (error) => {
                        console.log(error.response.data.mensaje);
                        this.$notify({
                            type: 'error',
                            title: error.response.data.mensaje
                        })
                    }
                })
                return;
            } else {
                this.erroresValidacion = true;
                return;
            }
        },
        selectDePersonal() {
            let personalSelect = [];
            this.personalAll.forEach(element => {
                personalSelect.push({value: element.ID, text: element.Nombre + " " + element.Apellidos})
            });
            return personalSelect;
        },
        selectDeCategorias() {
            let categoriasSelect = [];
            this.categoriasAll.forEach(element => {
                categoriasSelect.push({value: element.ID, text: element.Descripcion})
            });
            return categoriasSelect;
        }
    },
    created() {
        this.set_ticket({
            id: this.$route.params.id,
            onComplete: response => {
                console.log("DATA", response)
                Vue.set(this, 'ticket', response)
            }
        });
    }

}
</script>

<style>
.form {
    text-align: left;
    margin-left: 5%;
    margin-right: 50%;
}
</style>