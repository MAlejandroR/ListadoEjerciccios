<script setup lang="ts">
import { defineEmits } from "vue";
import AppModal from "@/Components/Layouts/AppModal.vue";
import Login from "@/Components/Modal/Form/Login.vue";
import {router} from "@inertiajs/vue3";

const props = defineProps<{show:Boolean, title:String}>();
const emit = defineEmits(['success','close']);


const login_success = ()=>{
    emit ("close")
    emit ("success")
    router.reload({
        only:["auth","units"]
    });

}



</script>

<template>
    <AppModal  col=1 :title="props.title" v-if="props.show" @close="emit('close')">
            <Login @login-success="login_success" />
    </AppModal>
</template>
<style>

</style>
