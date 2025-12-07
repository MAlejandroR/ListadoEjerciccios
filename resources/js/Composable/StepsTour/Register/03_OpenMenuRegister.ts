import { offset, flip, shift, computePosition } from "@floating-ui/dom";
import { OpenRegisterMenu } from "../../HelperOpenWindow.js";
import { modalRegisterRef} from '../../UseModal.js';
import {computePosition} from "@floating-ui/dom";

export function OpenMenuRegister(tour:any) {

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

        // Notar: no establecemos `attachTo` aquí para que Shepherd no intente posicionar
        // antes de que el modal exista (esto provocaba el parpadeo).
        arrow: true,
        classes: 'shepherd-theme-default',
        buttons: [
            {text: 'Atrás', action: tour.back, classes: 'fancy-btn-secondary'},
            {text: 'Siguiente', action: tour.next, classes: 'fancy-btn-primary'}
        ],

        // Antes de mostrar el step, abrimos el modal y esperamos a que la ref exista.
        // Así cuando Shepherd renderice el tooltip lo hará ya apuntando al elemento real.
        beforeShowPromise: async () => {
            // Abre y anima el modal
            await OpenRegisterMenu();

            // Espera a que la ref esté disponible usando un pequeño poll con requestAnimationFrame
            await new Promise<void>(resolve => {
                const check = () => {
                    if (modalRegisterRef.value) resolve();
                    else requestAnimationFrame(check);
                };
                check();
            });

            const modalBox = modalRegisterRef.value as Element | null;
            console.log('modalBox (beforeShowPromise):', modalBox);

            // Si existe, intentamos apuntar a un elemento concreto dentro del modal
            if (modalBox) {
                // Buscar de forma segura el campo del curso o el primer input/select visible
                const selectors = [
                    'select[name*="course"]',
                    'input[name*="course"]',
                    '[data-course]',
                    'select',
                    'input',
                    'button'
                ];


                // Actualizamos opciones: intentamos placement a la izquierda, con fallbacks
                tour.getCurrentStep().updateStepOptions({
                    attachTo: {
                        element: modalBox,
                        on: "left"
                    },
                    floatingUIOptions: {
                        // Preferimos colocación a la izquierda pero con fallbacks razonables
                        placement: 'left',
                        middleware: [
                            // Offset para separar del target
                            offset({ mainAxis: 16 }),
                            // Permitimos flip con fallback para evitar que se calcule imposible y recicle el paso
                            flip({ fallbackPlacements: ['right', 'top', 'bottom'] })
                        ]
                    }
                });

            }
        }


    }
    );
}
