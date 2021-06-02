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
                mensajeError="Ingrese un nombre válido"
            />
            <Input
                class="mt-2"
                v-model="ticket.Descripcion"
                id="Descripcion"
                titulo="Descripcion: "
                placeholder="Ingrese la descripción"
                :maxlength="100"
                mensajeError="Ingrese una descripción válida"
            />
            <Select 
                class="mt-2"
                v-model="ticket.Prioridad"
                :options="prioridades" 
                id="prioridad" 
                titulo="Prioridad" 
                placeholder="Seleccione prioridad"
            />
            <Select 
                class="mt-2"
                v-model="ticket.Personal"
                :options="selectDePersonal()" 
                id="personal" 
                titulo="Personal" 
                placeholder="Seleccione personal"
            />
            <Select 
                class="mt-2"
                v-model="ticket.Categoria"
                :options="selectDeCategorias()" 
                id="categoria" 
                titulo="Categoría" 
                placeholder="Seleccione categoría"
            />
            <b-button class="mt-2" type="submit" variant="primary">Agregar</b-button>
        </b-form>
    </div>
</template>

<script>
import Input from '../components/Input'
import Select from '../components/Select'
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
                    vlaue: 3,
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
            ],
            categoriasAll: [
                {
                    ID: 5,
                    Descripcion: "Alerta"
                },
                {
                    ID: 6,
                    Descripcion: "Aviso"
                },
                {
                    ID: 7,
                    Descripcion: "Emergencia"
                },
            ]
        }
            
    },
    methods: {
        agregarTicket() {
            console.log("Agregando: ", this.ticket.Prioridad, this.ticket.Personal, this.ticket.Categoria);
            console.log("V: ");
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
    margin-left: 10%;
    margin-right: 10%;
}
</style>

