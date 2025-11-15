<script setup lang="ts">
import {computed, defineProps, toRef} from 'vue';
import {usePage, router} from "@inertiajs/vue3";


const props = defineProps<{ title: string }>();

const title = props.title;
console.log("mirando el título");
console.log(props.title);
console.log("// mirando el título");
//Defino un evento que este componente podrá  enviar al componente padre
const emit = defineEmits(['open-login', 'open-register']);

//Creo una función que asociaré a un evento que ejecutará y  emitirá el evento open-login a componente padre
const showLoginForm = () => emit('open-login')
const showRegisterForm = () => emit('open-register')

const goToAdmin = () => {
    window.location.href = '/admin'
};
const logout = () => {
    router.post(route("logout"))

};
const page = usePage();
const user = computed(() => page.props.auth?.user);


</script>

<template>
    <!-- Any attributes you pass (like extra classes) will land on this root header via $attrs -->
    <header
        class="bg-red-700 text-white text-3xl font-bold text-center p-6 uppercase"
        v-bind="$attrs"
    >
        <div class="flex flex-row  items-center">
            <h1 class=" text-3xl font-bold leading-tight flex-grow">{{ title }} </h1>
            <span class="text-sm " v-if="user">
                {{ user.name }}
                <button @click="logout" class="btn btn-sm btn-primary">
                    Logout
                </button>
            </span>
            <div v-else class="space-x-4">
                <button
                    class="btn btn-sm btn-primary"
                    @click="showLoginForm"

                >
                    Login
                </button>
                <button
                    class="btn btn-sm btn-primary"
                    @click="showRegisterForm"
                >
                    Register
                </button>
            </div>
        </div>

        <!-- Optional: anything extra can be slotted below the title -->
        <slot/>
    </header>
</template>

