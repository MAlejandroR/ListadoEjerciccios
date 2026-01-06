import {offset} from "@floating-ui/dom";

export function MainRegister(tour:any) {
    tour.addStep({
        id: 'step-register',
        text: `
    <h2 class="text-xl font-semibold mb-2 text-gray-900">
      Registrarse
    </h2>
    <p class="text-gray-600 leading-relaxed">
      Regístrate para matricularte en un curso y desbloquear los ejercicios del temario.
    </p>
  `,
        attachTo: {
            element: '#register',
            on: 'bottom'
        },

        floatingUIOptions: {
            middleware: [offset(20)] // 20px separation
        },
        arrow: true,
        buttons: [
            {text: 'Atrás', action:

                tour.back,

                classes: 'fancy-btn-secondary'},
            {text: 'Siguiente', action: tour.next, classes: 'fancy-btn-primary'}
        ]
    });
}
