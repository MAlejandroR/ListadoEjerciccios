import {offset} from "@floating-ui/dom";
import {sidebarExercisesRef} from "@/Composable/UseModal";

export function ListThemeExercises(tour: any) {

    tour.addStep({
        id: "list-exercises",
        text: `
      <h2 class="title">Listado de ejercicios</h2>
      <p class="text-gray-600 leading-relaxed">
        Aquí podremos ver un listado de ejercicios de cada tema.
        Simplemente desplíegalo y podrás acceder a ellos.
      </p>
    `,
        arrow: true,
        buttons: [
            {text: "Atrás",
                action: ()=>{
                    sidebarExercisesRef.value?.closeFirstUnit();
                    tour.back();
                },
                classes: "fancy-btn-secondary"},
            {text: "Siguiente", action: tour.next, classes: "fancy-btn-primary"}
        ],

        beforeShowPromise: async () => {
            sidebarExercisesRef.value?.openFirstUnit();
            await new Promise(resolve =>
                requestAnimationFrame(() =>
                    requestAnimationFrame(resolve)
                )
            );
            //
            try {
                tour.getCurrentStep().updateStepOptions({
                    attachTo: {
                        element: "#unit-1",
                        on: "right"
                    },
                    floatingUIOptions: {
                        middleware: [offset({mainAxis: 12})]
                    }
                })
            } catch (e) {
                console.warn('No se pudo actualizar options del step (fill):', e);
            }
        }

    });
}
