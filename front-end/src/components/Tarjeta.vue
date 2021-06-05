<template>
  <div>
    <b-card
      :border-variant="colorTarjeta(ticket.IDEstatus)"
      :header="ticket.Nombre"
      :header-bg-variant="colorTarjeta(ticket.IDEstatus)"
      :footer="ticket.NombrePersonal + ' ' + ticket.ApellidosPersonal"
      header-text-variant="white"
      align="center"
    >
      <b-card-text
        >{{ticket.Descripcion}} <br />
        <b-progress variant="dark" :animated="true" class="mt-3">
            <b-progress-bar :value="100">
            <span><strong>Prioridad: </strong>{{ticket.Prioridad}}</span>
            </b-progress-bar>
        </b-progress>
</b-card-text
      >
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    ticket: Object,
  },
  data() {
      return {
      }
  },
  methods: {
      colorTarjeta(estatus) {
          if(estatus === 'ABT')
            return "danger";
          if(estatus === 'ESP')
            return "success";
            
          return "secondary";  
      }
  },
};
</script>
