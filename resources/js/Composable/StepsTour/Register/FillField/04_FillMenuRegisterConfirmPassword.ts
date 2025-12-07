
import {offset} from "@floating-ui/dom";

import {confirmPasswordRef} from "@/Composable/UseModal.js";

export function FillMenuRegisterConfirmPassword(tour:any) {
    tour.addStep({
        id: 'fill-confirm-password-register',
        text: `
    <h2 class="title">
      Rellenando el formulario (confirm-password)
    </h2>
    <p class="text-gray-600 leading-relaxed">
        Volvemos a insertar la contraseña para confirmarla.
    </p>
  `,
        // No adjuntamos aún: lo haremos en beforeShowPromise para evitar parpadeos
        arrow: true,
        buttons: [
            {text: 'Atrás', action: tour.back, classes: 'fancy-btn-secondary'},
            {text: 'Siguiente', action: tour.next, classes: 'fancy-btn-primary'}
        ],
        beforeShowPromise: async () => {

            // Esperar a que el campo #name_user esté montado el ref
            await new Promise<boolean>(resolve => {
                const check = () => {
                    if (confirmPasswordRef.value)
                        resolve(true);
                    else
                        requestAnimationFrame(check)

                };
                check();
            });

            // Actualizar opciones del step para adjuntar al select del curso
            try {
                tour.getCurrentStep().updateStepOptions({
                    attachTo: {
                        element: confirmPasswordRef.value,
                        on: 'right'
                    },
                    floatingUIOptions: {
                        middleware: [offset({mainAxis: 12})]
                    }
                });
            } catch (e) {
                console.warn('No se pudo actualizar options del step (fill):', e);
            }
        },

        when: {
            show: async () => {
                const typeInto = async (input: HTMLInputElement | null, text: string, delay = 40) => {
                    if (!input) return;
                    input.focus();
                    input.value = "";
                    for (let i = 0; i <= text.length; i++) {
                        input.value = text.slice(0, i);
                        input.dispatchEvent(new Event("input", {bubbles: true}));
                        await new Promise(r => setTimeout(r, delay));
                    }
                    input.blur();
                };

                await typeInto(confirmPasswordRef.value as HTMLInputElement, "12345678", 60);
            }

        }
    });
}
