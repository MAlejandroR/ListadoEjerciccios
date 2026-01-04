
import {offset} from "@floating-ui/dom";
import {OpenRegisterMenu} from "@/Composable/HelperOpenWindow.js";
import {passwordRef} from "@/Composable/UseModal.js";
import {nextTick} from "vue";
import {useCancelableTyping} from "@/Composable/UseCancelableTyping.js";

export function FillMenuRegisterPassword(tour:any) {
    const typing = useCancelableTyping();
    tour.addStep({
        id: 'fill-password-register',
        text: `
    <h2 class="title">
      Rellenando el formulario (password)
    </h2>
    <p class="text-gray-600 leading-relaxed">
        Insertamos una contraseña válida. Debe tener al menos 8 caracteres, no hay más restricciones.
    </p>
  `,
        // No adjuntamos aún: lo haremos en beforeShowPromise para evitar parpadeos
        arrow: true,
        buttons: [
            {text: 'Atrás',
                action:()=>{
                    typing.cancel();
                    const input = passwordRef.value as HTMLInputElement | null
                    input.value="";
                    input.dispatchEvent(new Event("input", {bubbles:true}))
                    input.blur();
                    tour.back();
                },
                classes: 'fancy-btn-secondary'},
            {text: 'Siguiente', action: tour.next, classes: 'fancy-btn-primary'}
        ],
        beforeShowPromise: async () => {

            // Esperar a que el campo #name_user esté montado el ref
            await nextTick();


            // Actualizar opciones del step para adjuntar al select del curso
            try {
                tour.getCurrentStep().updateStepOptions({
                    attachTo: {
                        element: passwordRef.value,
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
                typing.reset();
                await typing.typeInto(passwordRef.value as HTMLInputElement, "12345678", 60);
            }

        }
    });
}
