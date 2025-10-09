<script setup>
import { ref, computed } from "vue";

// Recibimos los props desde Inertia
const { exercices, units } = defineProps({
    exercices: Array,
    units: Array,
});

// Estado local: control de desplegado por unidad (tema)
//Creo un array que me dirá cómo está cada unidad
//Abierta o cerrada
const openUnits = ref([]);

// Alternar apertura/cierre de una unidad
const toggleUnit = (unitId) => {

    if (openUnits.value.includes(unitId)) {
        openUnits.value = openUnits.value.filter((id) => id !== unitId);
    } else {
        openUnits.value.push(unitId);
    }
    console.log (`unidad de tema para cerrar/abrir ${unitId}`)
    console.log ("Valor de array openUnits")
    console.log (openUnits)
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
console.log ("grupos de temas");
console.log (groupedExercices.value);
console.log ("Unidades");
console.log (units);

</script>

<template>
    <aside class="w-72 bg-gray-100 p-4 rounded-xl shadow overflow-y-auto">
        <h2 class="text-md font-bold mb-3 text-gray-800">📘 Listado de prácticas</h2>

        <ul class="space-y-3">
            <li v-for="unit in units" :key="unit.id">
                <!-- Cabecera del tema -->
                <div v-if="unit.show_in_list"
                    class="flex items-center justify-between cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg"
                    @click="toggleUnit(unit.id)"
                >
                    <span class="font-semibold text-gray-700">{{ unit.title }}</span>
                    <span class="text-sm text-gray-600">
            {{ openUnits.includes(unit.id) ? '▲' : '▼' }}
          </span>
                </div>

                <!-- Lista de ejercicios de ese tema -->
                <transition name="fade">
                    <ol
                        v-if="openUnits.includes(unit.id)"
                        class="ml-4 mt-2 border-l-2 border-gray-300 pl-3 space-y-1"
                    >
                        <li
                            v-for="ex in groupedExercices[unit.id]"
                            :key="ex.id"
                            class="hover:bg-gray-100 p-1 rounded"
                        >
                            <a href="#" class="text-blue-600 underline text-sm">
                                {{ ex.list_title }}
                            </a>
                        </li>
                    </ol>
                </transition>
            </li>
        </ul>
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
