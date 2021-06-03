<template>
  <div>
      <label :for="id">{{titulo}}</label>
      <select 
        :id="id"
        class="form-control"
        :value="value"
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
        value: [Number, String],
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
        mensajeError: {
            type: String,
            default: 'Seleccione una opción válida'
        },
        error: {
            type: Boolean,
            default: false
        }
    }
  }
</script>
