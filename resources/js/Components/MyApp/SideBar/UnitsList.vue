<script setup lang="ts">
import {defineEmits, defineProps, nextTick, ref} from "vue";
import UnitItem from "@/Components/MyApp/SideBar/UnitItem.vue";
import {Units} from "@/Composable/StepsTour/3_Units_step.js";


const props = defineProps({groupsExercises: Object, units: Units, practiced: Array})


console.log("UntisList");
console.log("grupo de ejercicios");
console.log(props.groupsExercises);

//El primer componente para abrir in shepherd o cerrarlo
//Necesito tenerlo referenciados
const setFirstUnitRef=(el:InstanceType<typeof UnitItem>|null, index:number)=>{
    if (index ===0)
        firstUnitRef.value=el;

};

const firstUnitRef = ref<InstanceType<typeof UnitItem> | null>(null);


//metdodo para abrir la primera unidad para usar en shepherd

const openFirstUnit=()=>{
    console.log("En UnitList en openFirstUnit");
    console.log("firstUnitRef =", firstUnitRef.value);
    firstUnitRef.value?.open();
}
const closeFirstUnit=()=>{
    console.log("En UnitList en openFirstUnit");
    console.log("firstUnitRef =", firstUnitRef.value);
    firstUnitRef.value?.close();
}


defineExpose({
    openFirstUnit,
    closeFirstUnit,
})

//Recojo el evento que está propagando UnitItem que recibe de ExerciseItem y lo propago a Sidebar

const emit = defineEmits(['statement'])

const onStatement = (exercise) => emit("statement", exercise);


</script>

<template>

    <div v-for=" (unit, index) in units" :key="unit.id">
<!--        Solo quiero referenciar la primera unidad para acceder a ella desde sheprherd
y poderla abrir

-->
        <UnitItem :practiced="practiced"
                  :unit="unit"
                  :exercises="groupsExercises[unit.id] ?? []"
                  @statement="onStatement"
                  :id =  "(index===0)? 'unit-1' : null"
                  :ref = "el => setFirstUnitRef(el, index)"
        />
        <!-- Antes el ref era :ref = "(index===0)? firstUnitRef: null"-->
    </div>
</template>

<style scoped>

</style>
