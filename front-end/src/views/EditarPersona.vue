<template>
    <div>
        <h1>Editar Persona</h1>  
    </div>
</template>
<script>
import Vue from 'vue'
import { mapActions , mapState} from 'vuex'

export default {

    name: 'Editar-Persona',
    /*computed: {
        ...mapState(["persona"])
    },
    methods: {
        ...mapActions(['obtenerPersona'])
    },
    created() {
        this.obtenerPersona({
            id: this.$route.params.id,
            onComplete: (response) => {
                Vue.set(this, 'persona', response.data.data)
            }
        })
    }*/
}
</script>