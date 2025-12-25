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
                typing.cancel();
                    const input = nameRef.value as HTMLInputElement | null;
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
        beforeShowPromise: async()=>{
           await  nextTick();
           try{
               tour.getCurrentStep().updateStepOptions({
                   attachTo: {
                       element: nameRef.value,
                       on: 'right'
                   },
                   floatingUIOptions: {
                       middleware: [offset({mainAxis: 12})]
                   }
               })


           }catch (e) {
               console.warn('No se pudo actualizar options del step (fill):', e);
           }
        },

        when: {
            show: async () => {
                typing.reset();
                await typing.typeInto(nameRef.value as HTMLInputElement, "Usuario Ejemplo", 60);
            }
        }
    });
}
