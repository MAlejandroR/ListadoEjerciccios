import {offset} from "@floating-ui/dom";

export function Units (tour: any){
// UNITS
    tour.addStep({
        id: 'step-units',
        text: `
                <h2 class="text-xl font-semibold mb-2 text-gray-900">
                    Temario
                </h2>
                <p class="text-gray-600 leading-relaxed">
                    Aquí encontrarás todos los temas disponibles según tu curso.
                </p>
            `,
        attachTo: {
            element: '#units',
            on: 'right'
        },
        floatingUIOptions: {
            middleware: [offset(20)] // 20px separation
        },
        buttons: [
            {text: 'Atrás', action: tour.back, classes: 'fancy-btn-secondary'},
            {text: 'Siguiente', action: tour.next, classes: 'fancy-btn-primary'}
        ]
    });
}
