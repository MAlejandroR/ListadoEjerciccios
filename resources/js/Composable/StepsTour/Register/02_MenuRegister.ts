import {offset} from "@floating-ui/dom";

export function MenuRegister(tour:any) {
    tour.addStep({
        id: 'menu-register',
        text: `
    <h2 class="title">
      Menú Registrarse
    </h2>
    <p class="text-gray-600 leading-relaxed">
      Rellena el formulario para registrase, es muy sencillo<br />
      Selecciona el curso
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
            {text: 'Atrás', action: tour.back, classes: 'fancy-btn-secondary'},
            {text: 'Siguiente', action: tour.next, classes: 'fancy-btn-primary'}
        ],

    });
}
