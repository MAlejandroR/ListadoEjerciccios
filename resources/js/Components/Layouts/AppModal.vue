<script setup lang="ts">
import {defineEmits, onMounted, onUnmounted, ref} from "vue";

import {X} from "lucide-vue-next"
import {usePage} from "@inertiajs/vue3";
import {modalRegisterRef, modalBoxRef} from "@/Composable/UseModal";



// Titulo y número de columnas del formulario que contenga
const props = defineProps<{ title: String, col: Number }>()

const modalRoot = ref<HTMLElement|null>(null);
const modalBox =  ref<HTMLElement|null>(null);

//Para el royo de shepherd ....
const animateVisible = ref(false);


const emit = defineEmits(["close"]);


const close = () => emit("close");


//TODO Modificar y evitar uso de document usando vue ...
onMounted(() => {
        modalRegisterRef.value = modalBox.value;

        document.addEventListener("keydown", (e) => {
                if (e.key === "Escape")
                    close();
            }
        )
    }
);
onUnmounted(() =>
    document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            close();
        }
    })
);


</script>
<template>
    <!-- Modal que vuelva oscuro el resto-->
    <div @click="close" @key.esc="close"
         class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1.5px] opacity-0 border-2 opacity-100 border-gray-600"
         >
        <!-- Modal donde va a ir el formulario y el botón de X-->
        <div @click.stop class="bg-white rounded-lg shadow-lg p-6"
             :class="props.col == 1 ? 'w-[300px]' : 'w-[600px]'"  ref="modalBox">
            <div class="flex justify-between items-center border-b pb-2">
                <h2 class="text-xl font-semibold text-gray-800">{{ props.title }}</h2>
                <button>
                    <X class="w-6 h-6 text-blue-700 hover:text-gray-800 float-right" @click="close"/>
                </button>
            </div>
            <div class="mt-4">
                <slot></slot>
            </div>
        </div>
    </div>

</template>
<style>

</style>

