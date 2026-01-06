import {tourStep} from "@/Composable/TourDSL";
import {sidebarExercisesRef} from "@/Composable/UseModal";

export function ListThemeExercises(tour: any) {
    tourStep(tour, "list-exercises")
        .title("Listado de ejercicios")
        .text("Aquí podremos ver un listado de ejercicios de cada tema.<br />" +
            "Simplemente desplíegalo y podrás acceder a ellos.")
        .arrow(true)
        .attachLater("#unit-1", "right")
        .offset(12)
        .beforeShow(async () => {
            sidebarExercisesRef.value?.openFirstUnit();
            await new Promise(resolve =>setTimeout(resolve, 250));

        })
        .back("Atrás", () => {
            sidebarExercisesRef.value?.closeFirstUnit();
        })
        .next("Siguiente")
        .end()
}
