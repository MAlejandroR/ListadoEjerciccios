<script setup lang="ts">
import AppModal from "@/Components/Layouts/AppModal.vue";
import Register from "@/Components/Modal/Form/Register.vue";
import {router} from "@inertiajs/vue3";

const props = defineProps<{show:Boolean, title:String, courses:Array}>();
const emit = defineEmits(['close','success'])
const success=()=>{
    emit ("close");
    emit ("success");
    router.reload({
        only:["auth","units"]
    });
}


</script>

<template>
    <AppModal  col=2 :title="props.title" v-if="props.show" @close="emit('close')">
        <Register  :courses='courses' @success="success"  />
    </AppModal>
</template>
<style>

</style>
