<script setup lang="ts">
import {defineEmits, onMounted, ref} from "vue";
import AppModal from "@/Components/Layouts/AppModal.vue";
import Login from "@/Components/Modal/Form/Login.vue";
import {router} from "@inertiajs/vue3";
import {loginRef} from "@/Composable/UseModal";


const login_ref = ref<InstanceType<typeof Login>|null>(null);

const props = defineProps<{show:Boolean, title:String}>();
const emit = defineEmits(['success','close']);


const login_success = ()=>{
    emit ("close")
    emit ("success")
    router.reload({
        only:["auth","units"]
    });

}
onMounted(()=>{
    if (login_ref.value)
        loginRef.value = login_ref.value
})


</script>

<template>
    <AppModal  col=1 :title="props.title" v-show="props.show" @close="emit('close')">
            <Login @login-success="login_success" ref="login_ref" />
    </AppModal>
</template>
<style>

</style>
