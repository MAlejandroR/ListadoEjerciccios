<script setup lang="ts">
import { defineEmits } from "vue";
import AppModal from "@/Pages/Layouts/AppModal.vue";
import Login from "@/Pages/Auth/Login.vue";

const props = defineProps<{show:Boolean, title:String}>();
const emit = defineEmits(['login-success','close']);



</script>

<template>
    <AppModal  col=1 :title="props.title" v-if="props.show" @close="emit('close')">
            <Login @login-success="emit('login-success')" />
    </AppModal>
</template>
<style>

</style>
