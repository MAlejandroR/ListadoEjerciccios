
<script setup lang="ts">


//Defino un evento que este componente podrá  enviar al componente padre
const emit = defineEmits (['open-login']);

//Creo una función que asociaré a un evento que ejecutará y  emitirá el evento open-login a componente padre
const showLoginForm = ()=>emit('open-login')

defineProps<{title: string}>()
const goToAdmin=()=>{
    window.location.href='/admin'
};


</script>

<template>
    <!-- Any attributes you pass (like extra classes) will land on this root header via $attrs -->
    <header
        class="bg-red-700 text-white text-3xl font-bold text-center p-6 uppercase"
        v-bind="$attrs"
    >
        <div class="flex flex-row  items-center">
        <h1 class=" text-3xl font-bold leading-tight flex-grow">{{ title }}  </h1>
        <button
            class="btn btn-secundary"
            @click="showLoginForm"
        >
            Login
        </button>
        </div>

        <!-- Optional: anything extra can be slotted below the title -->
        <slot />
    </header>
</template>

