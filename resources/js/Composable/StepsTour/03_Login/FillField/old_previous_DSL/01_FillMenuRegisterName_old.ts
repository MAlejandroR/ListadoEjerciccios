import {offset} from "@floating-ui/dom";
import {OpenRegisterMenu} from "@/Composable/HelperOpenWindow.js";
import {nameRef} from "@/Composable/UseModal.js";
import {nextTick} from "vue";
import {useCancelableTyping} from "@/Composable/UseCancelableTyping.js";

export function FillMenuRegisterName(tour:any) {
    const typing = useCancelableTyping();
    tour.addStep({
        id: 'fill-name-register',
        text: `
    <h2 class="title">
      Rellenando el formulario (name)
    </h2>
    <p class="text-gray-600 leading-relaxed">
      Insertamos un nombre.
    </p>
  `,
        // No adjuntamos aún: lo haremos en beforeShowPromise para evitar parpadeos
        arrow: true,
        buttons: [
            {text: 'Atrás',
                action:()=>{
                   typing.cancel
                    input =
                    tour.back();
                } , classes: 'fancy-btn-secondary'},
            {text: 'Siguiente', action: tour.next, classes: 'fancy-btn-primary'}
        ],

        beforeShowPromise: async () => {

            // // Abrir modal y esperar a que exista el select
            // await OpenRegisterMenu();

            // Esperar a que el campo #name_user esté montado el ref
            await new Promise<boolean>(resolve => {
                const check = () => {
                    if (nameRef.value)
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
                        element: nameRef.value,
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

                await typeInto(nameRef.value as HTMLInputElement, "Usuario Ejemplo", 60);
            }

        }
    });
}
