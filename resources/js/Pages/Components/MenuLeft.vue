<script setup>
import {ref, computed} from "vue";

import {router, usePage} from "@inertiajs/vue3";


const page = usePage();
// Recibimos los props desde Inertia
const {exercices, units} = defineProps({
    exercices: Array,
    units: Array,
});
const user = page.props.auth.user;
console.log(user)
// Estado local: control de desplegado por unidad (tema)
//Creo un array que me dirá cómo está cada unidad
//Abierta o cerrada
const openUnits = ref([]);

const hide_show = async (id) => {

    await router.put(route('units.hide_show', id), {}, {
        preserveScroll: true,
        onStart: () => console.log(`Ocultando unidad ${id}...`),
        onSuccess: () => {
            router.reload({only: [units]})
        },
        onError: (err) => console.error('Error ocultando unidad:', err),
    })
    //REalizar una llamada ajax para ocutar el tema
    //Poner el atribute show_in_list a false
    //Volver a obtener el listado de temas
}

// Alternar apertura/cierre de una unidad
const toggleUnit = (unitId) => {

    if (openUnits.value.includes(unitId)) {
        openUnits.value = openUnits.value.filter((id) => id !== unitId);
    } else {
        openUnits.value.push(unitId);
    }
    console.log(`unidad de tema para cerrar/abrir ${unitId}`)
    console.log("Valor de array openUnits")
    console.log(openUnits)
};

// Agrupar los ejercicios por unidad (tema)
//En groups tendría un array indexados por temas
const groupedExercices = computed(() => {
    const groups = {};
    for (const ex of exercices) {
        if (!groups[ex.units_id])
            groups[ex.units_id] = [];
        groups[ex.units_id].push(ex);
    }

    return groups;
});
console.log("grupos de temas");
console.log(groupedExercices.value);
console.log("Unidades");
console.log(units);
const is_admin = computed(() => page.props.auth.user?.is_admin === true);


//Creamos un iframe controlado por una variable
//Para abrir una ventana controlada por filament

const editUrl = ref("");
const modalVisible = ref(false);


const edit_exercice=(id)=>{
    editUrl.value= `admin/exercises/${id}/edit`;
    modalVisible.value=true
}

const closeModal = ()=>{
    modalVisible.value=false;
    window.location.reload();
}


</script>

<template>
    <aside class="w-72 bg-gray-100 p-4 rounded-xl shadow overflow-y-auto">
        <h2 class="text-md font-bold mb-3 text-gray-800">📘 Listado de prácticas</h2>

        <ul class="space-y-3">
            <li v-for="unit in units" :key="unit.id">
                <!-- Cabecera del tema -->
                <div
                    v-if="unit.show_in_list || is_admin"
                    class="flex items-center justify-between bg-gray-200  px-3 py-2
                    rounded-lg "

                >
                    <div class="flex items-center gap-2">
                        <!-- Botón si soy admin -->
                        <button
                            :disabled="sending"
                            @click.stop="hide_show(unit.id)"
                        v-if="is_admin"
                            :title="unit.show_in_list ? 'Hide this unit' : 'Show this unit'"
                            class="flex items-center justify-center w-6 h-6 rounded-full text-white"
                            :class="unit.show_in_list ? 'bg-green-500' : 'bg-red-500 cursor-pointer'"    >
                        <i :class="unit.show_in_list ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
                        </button>

                        <span   class="font-semibold text-gray-700">{{ unit.title }}</span>
                    </div>

                    <span class="text-sm bg- hover:bg-gray-800 hover:text-green-500 text-gray-600 cursor-pointer" @click="toggleUnit(unit.id)">
            {{ openUnits.includes(unit.id) ? '▲' : '▼' }}
          </span>

                </div>

                <!-- Lista de ejercicios -->
                <transition name="fade">
                    <ol
                        v-if="openUnits.includes(unit.id)"
                        class="ml-6 mt-2 border-l-2 border-gray-300 pl-3 space-y-1"
                    >
                        <li
                            v-for="ex in groupedExercices[unit.id]"
                            :key="ex.id"
                            class="hover:bg-gray-100 p-1 rounded"
                        >
                            <a href="#" class="text-blue-600 underline text-sm">
                                <i v-if="is_admin" @click="edit_exercice(ex.id)" class="w-4 h-4 fa-solid fa-pen bg-blue-800 text-white space-x-20 "></i>  {{ ex.list_title }}
                            </a>
                        </li>
                    </ol>
                </transition>
            </li>
        </ul>

        <!-- Modal -->
        <div
            v-if="modalVisible"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div class="bg-white rounded-lg shadow-lg w-5/6 h-5/6 relative">
                <button
                    @click="closeModal"
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2"
                >
                    ✕
                </button>

                <iframe
                    :src="editUrl"
                    class="w-full h-full rounded-b-lg"
                    frameborder="0"
                ></iframe>
            </div>
        </div>
    </aside>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}
</style>


<!--<script setup>-->
<!--const {exercices, units} = defineProps({exercices: Array, units: Array});-->

<!--</script>-->

<!--<template>-->
<!--    &lt;!&ndash;Botón para show/hide &ndash;&gt;-->

<!--    <aside class="w-64 bg-gray-100 p-4 rounded-xl shadow">-->
<!--        <h2 class="text-lg font-bold mb-2">Listado de prácticas</h2>-->
<!--        <ul class="space-y-1">-->
<!--            <li v-for="unit in units" :key="unit.id" class="mb-4">-->
<!--                <h3 class="font-semibold text-gray-700 mb-1">{{ unit.title }}</h3>-->
<!--                <ol class="space-y-2">-->
<!--                    <li v-for="exercice in exercices" :key="exercice.id">-->
<!--                        <a href="#" class="text-blue-600 underline">{{ exercice.list_title }}</a>-->
<!--                    </li>-->
<!--                </ol>-->
<!--            </li>-->
<!--        </ul>-->
<!--    </aside>-->
<!--</template>-->

<!--<style scoped>-->

<!--</style>-->
