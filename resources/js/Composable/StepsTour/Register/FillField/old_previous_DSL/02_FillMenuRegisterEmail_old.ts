
import {offset} from "@floating-ui/dom";
import {OpenRegisterMenu} from "@/Composable/HelperOpenWindow.js";
import {emailRef } from "@/Composable/UseModal.js";
import {nextTick} from "vue";
import {useCancelableTyping} from "@/Composable/UseCancelableTyping.js";

export function FillMenuRegisterEmail(tour:any) {
    const typing = useCancelableTyping();
    tour.addStep({
        id: 'fill-email-register',
        text: `
    <h2 class="title">
      Rellenando el formulario (email)
    </h2>
    <p class="text-gray-600 leading-relaxed">
      Insertamos un email válido.
    </p>
  `,
        // No adjuntamos aún: lo haremos en beforeShowPromise para evitar parpadeos
        arrow: true,
        buttons: [
            {text: 'Atrás',

                action:()=>{
                 typing.cancel();
                    const input = emailRef.value as HTMLInputElement | null;
                    if (input) {
                        input.value = "";
                        input.dispatchEvent(new Event("input", { bubbles: true }));
                        input.blur();
                    }
                    tour.back();
                },

                classes: 'fancy-btn-secondary'},
            {text: 'Siguiente', action: tour.next, classes: 'fancy-btn-primary'}
        ],
        beforeShowPromise: async () => {
            // // Abrir modal y esperar a que exista el select
            // await OpenRegisterMenu();

            // Esperar a que el campo #name_user esté montado el ref
            await nextTick();

            // Actualizar opciones del step para adjuntar al select del curso
            try {
                tour.getCurrentStep().updateStepOptions({
                    attachTo: {
                        element: emailRef.value,
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
                typing.reset()
                await typing.typeInto(emailRef.value as HTMLInputElement, "juan_perez@gmail.com", 60);
            }

        }
    });
}
