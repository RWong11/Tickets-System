<template>
  <div>
      <label :for="id">{{titulo}}</label>
      <select 
        :id="id"
        class="form-control"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
        >
        <option 
            value="" selected disabled hidden
        >
        {{placeholder}}
        </option>
        
        <option 
            v-for="(option, i) in options" :key="'option' + i" 
            :value="option.value"  
            :selected='option.value === selectedItem'
        > 
        {{option.text}}
        </option>
        
      </select>
        <span v-if="error" class="text-danger">{{ mensajeError }}</span>
  </div>
</template>

<script>
  export default {
    props: {
        options: [],
        id: {
            type: [Number, String],
            required: true
        },
        titulo: String,
        tipo: {
            type: String,
            default: 'text'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: 'Seleccione'
        },
        selectedItem: {
            type: [Number, String],
            default: ''
        },
        mensajeError: {
            type: String,
            default: 'Seleccione una opción válida'
        },
        error: {
            type: Boolean,
            default: false
        },
    },
  }
</script>
