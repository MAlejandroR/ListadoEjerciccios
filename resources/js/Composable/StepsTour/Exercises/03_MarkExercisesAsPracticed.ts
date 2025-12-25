import {offset} from "@floating-ui/dom";

export function MarkExercisesAsPracticed (tour: any){


// EXERCISES
    tour.addStep({
        id: 'step-exercise',
        text: `
                <h2 class="text-xl font-semibold mb-2 text-gray-900">
                    Ejercicios
                </h2>
                <p class="text-gray-600 leading-relaxed">
                    Cada unidad contiene ejercicios prácticos. Puedes marcar los que ya hayas revisado.
                </p>
            `,
        attachTo: {
            element: '#exercise',
            on: 'right'
        },
        floatingUIOptions: {
            middleware: [offset(20)] // 20px separation
        },

        buttons: [
            {text: 'Atrás', action: tour.back, classes: 'fancy-btn-secondary'},
            {text: 'Finalizar', action: tour.cancel, classes: 'fancy-btn-primary'}
        ],


    })
}
