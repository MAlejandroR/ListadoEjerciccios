<script setup lang="ts">
import AppModal from "@/Pages/Layouts/AppModal.vue";
import Register from "@/Pages/Auth/Register.vue";

const props = defineProps<{show:Boolean, title:String, courses:Array}>();


</script>

<template>
    <AppModal  col=2 :title="props.title" v-if="props.show" @close="$emit('close')">
        <Register  :courses='courses' @login-success="$emit('close')" />
    </AppModal>
</template>
<style>

</style>
