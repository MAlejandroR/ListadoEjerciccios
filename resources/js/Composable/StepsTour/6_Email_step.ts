import {offset} from "@floating-ui/dom";

export function Email (tour: any){

    tour.addStep({
        id: 'step-email',
        text: `
                <h2 class="text-xl font-semibold mb-2 text-gray-900">
                    Contactar
                </h2>
                <p class="text-gray-600 leading-relaxed">
                    Puedes enviar un correo al profesor en cualquier momento, incluso sin iniciar sesión.
                </p>
            `,
        attachTo: {
            element: '#email',
            on: 'bottom'
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
