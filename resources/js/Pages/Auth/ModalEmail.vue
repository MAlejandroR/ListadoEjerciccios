<script setup lang="ts">
import { defineEmits } from "vue";
import AppModal from "@/Pages/Layouts/AppModal.vue";
import Email from "@/Pages/Auth/Email.vue";

const props = defineProps<{show:Boolean, title:String}>();


</script>

<template>
    <AppModal  col=2 :title="props.title" v-if="props.show" @close="$emit('close')">
            <Email @login-success="$emit('close')" />
    </AppModal>
</template>
<style>

</style>
