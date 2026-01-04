<script setup lang="ts">
import { defineEmits } from "vue";
import AppModal from "@/Components/Layouts/AppModal.vue";
import Email from "@/Components/Modal/Form/Email.vue";

const props = defineProps<{show:Boolean, title:String}>();
const emit = defineEmits(['close']);



</script>

<template>
    <AppModal   col=2 :title="props.title" v-if="props.show" @close="emit('close')">
            <Email @sent="emit('close')" />
    </AppModal>
</template>
<style>

</style>
