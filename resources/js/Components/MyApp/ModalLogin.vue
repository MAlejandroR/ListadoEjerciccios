<script setup>

import Login from "@/Pages/Auth/Login.vue";
import { ref } from "vue";




//Leo los props que vienen de Main
const props = defineProps({show_login: Boolean});

const show_login = ref(props.show_login)

//Creo un mensaje para enviar a Main
const emit = defineEmits(["close"]);

const close=()=>emit("close");
</script>

<template>
    <Teleport to="body">

        <div
            v-if="show_login"
            class="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
        >
            <!-- Smaller modal box -->
            <div class="bg-white/95 rounded-2xl shadow-2xl w-[380px] p-4 relative flex flex-col items-center">
                <!-- Header with close button aligned -->
                <div class="flex w-full justify-between items-center mb-3">
                    <h2 class="text-lg font-semibold text-gray-800">Login</h2>
                    <button
                        @click="close"
                        class="text-gray-500 hover:text-black text-xl leading-none"
                        title="Close"
                    >
                        ✕
                    </button>
                </div>

                <!-- Login form -->
                <Login @login-success="closeLogin"/>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>

</style>
