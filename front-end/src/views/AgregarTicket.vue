<template>
    <div class="form">
        <h1>Agregar Ticket</h1>
        <b-form @submit.prevent="agregarTicket()">
            <Input 
                class="mt-2"
                v-model="ticket.Nombre"
                id="nombre"
                titulo="Nombre: "
                placeholder="Ingrese el nombre"
                :maxlength="54"
                :error="erroresValidacion && !validarNombre"
                mensajeError="Debe ingrese un nombre."
            />
            <Input
                class="mt-2"
                v-model="ticket.Descripcion"
                id="Descripcion"
                titulo="Descripcion: "
                placeholder="Ingrese la descripción"
                :maxlength="100"
            />
            <Select 
                class="mt-2"
                v-model="ticket.Prioridad"
                :options="prioridades" 
                id="prioridad" 
                titulo="Prioridad:" 
                placeholder="Seleccione prioridad"
                :error="erroresValidacion && !validarPrioridad"
                mensajeError="Debes seleccionar una prioridad"
            />
            <Select 
                class="mt-2"
                v-model="ticket.Personal"
                :options="selectDePersonal()" 
                id="personal" 
                titulo="Personal:" 
                placeholder="Seleccione personal"
                :error="erroresValidacion && !validarPersonal"
                mensajeError="Debes seleccionar una persona"
            />
            <Select 
                class="mt-2"
                v-model="ticket.Categoria"
                :options="selectDeCategorias()" 
                id="categoria" 
                titulo="Categoría:" 
                placeholder="Seleccione categoría"
                :error="erroresValidacion && !validarCategoria"
                mensajeError="Debes seleccionar una categoría"
            />
            <b-button class="mt-2" type="submit" variant="primary">Agregar</b-button>
        </b-form>
    </div>
</template>

<script>
import Input from '../components/Input'
import Select from '../components/Select'
import {mapActions} from 'vuex'

export default {
    name: 'AgregarTicket',
    components: {
        Input,
        Select
    },
    data() {
        return {
            ticket: {
                Nombre: "",
                Descripcion: "",
                Prioridad: "",
                Personal: "",
                Categoria: "",
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
                this.ticket.Personal !== undefined &&
                this.ticket.Personal.trim() != ''
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
        ...mapActions(['crear_ticket']),
        agregarTicket() {
            if (this.validarNombre && this.validarPrioridad && this.validarPersonal && this.validarCategoria) {
                this.erroresValidacion = false;
                this.crear_ticket({
                    params: this.ticket,
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
    }


}
</script>

<style scoped>
.form {
    text-align: left;
    margin-left: 5%;
    margin-right: 50%;
}
</style>

