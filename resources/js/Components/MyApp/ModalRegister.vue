<script setup lang="ts">

import Register from "@/Pages/Auth/Register.vue";
import { ref,toRef } from "vue";
import type  {Course} from "@/Components/MyApp/types/Course";





//Leo los props que vienen de Main
const props = defineProps<{show_register:Boolean, courses:Course[]}>();

const show_register = toRef(props, "show_register")

//Creo un mensaje para enviar a Main
const emit = defineEmits(["close_register"]);

const close=()=>emit("close_register");
</script>

<template>
    <Teleport to="body">

        <div
            v-if="show_register"
            class="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
        >
            <!-- Smaller modal box -->
            <div class="bg-white/95 rounded-2xl shadow-2xl w-[380px] p-4 relative flex flex-col items-center">
                <!-- Header with close button aligned -->
                <div class="flex w-full justify-between items-center mb-3">
                    <h2 class="text-lg font-semibold text-gray-800">Register</h2>
                    <button
                        @click="close"
                        class="text-gray-500 hover:text-black text-xl leading-none"
                        title="Close"
                    >
                        ✕
                    </button>
                </div>

                <!-- Register form -->
                <Register :courses="props.courses" @register_success="close"/>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>

</style>
