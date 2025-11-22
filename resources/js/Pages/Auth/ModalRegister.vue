<script setup lang="ts">
import { defineEmits } from "vue";
import AppModal from "@/Pages/Layouts/AppModal.vue";
import Login from "@/Pages/Auth/Login.vue";
import Register from "@/Pages/Auth/Register.vue";

const props = defineProps<{show:Boolean, title:String}>();


</script>

<template>
    <AppModal  col=2 :title="props.title" v-if="props.show" @close="$emit('close')">
        <Register @login-success="$emit('close')" />
    </AppModal>
</template>
<style>

</style>
