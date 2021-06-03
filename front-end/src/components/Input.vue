<template>
  <div>
      <label :for="id">{{titulo}}</label>
      <input 
        :type="tipo" 
        :id="id"
        class="form-control"
        :value="valueText"
        :maxlength="maxlength"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"/>
        <span v-if="error" class="text-danger">{{ mensajeError }}</span>
  </div>
</template>

<script>
  export default {
    props: {
        id: {
            type: [Number, String],
            required: true
        },
        titulo: String,
        valueText: {
            type: [Number, String],
            default: ''
        },
        tipo: {
            type: String,
            default: 'text'
        },
        maxlength: {
            type: Number,
            default: 100
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: 'Ingresa la información'
        },
        mensajeError: {
            type: String,
            default: 'Campo obligatorio'
        },
        error: {
            type: Boolean,
            default: false
        }
    }
  }
</script>

