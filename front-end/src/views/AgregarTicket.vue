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
                :maxlength="100"
            />
            <Select 
                class="mt-2"
                v-model="ticket.Prioridad"
                :options="selectDePrioridades()" 
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
import {mapState, mapActions} from 'vuex'

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
            erroresValidacion: false
        }
            
    },
    computed: {
        ...mapState(['prioridades', 'personal', 'categorias']),
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
        ...mapActions(['crear_ticket', 'set_prioridades', 'setCategorias', 'setPersonal']),
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
        selectDePrioridades() {
            let prioridadesSelect = [];
            this.prioridades.forEach(element => {
                prioridadesSelect.push({value: element.ID, text: element.Descripcion})
            });
            return prioridadesSelect;
        },
        selectDePersonal() {
            let personalSelect = [];
            this.personal.forEach(element => {
                personalSelect.push({value: element.ID, text: element.Nombre + " " + element.Apellidos})
            });
            return personalSelect;
        },
        selectDeCategorias() {
            let categoriasSelect = [];
            this.categorias.forEach(element => {
                categoriasSelect.push({value: element.ID, text: element.Nombre})
            });
            return categoriasSelect;
        }
    },
    mounted() {
        this.set_prioridades();
        this.setCategorias();
        this.setPersonal();
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

