import { selectCourseRef} from "@/Composable/UseModal.js";
import {offset} from "@floating-ui/dom";
import {nextTick} from "vue";
import {useCancelableTyping} from "@/Composable/UseCancelableTyping.js";

export function FillMenuRegisterSelectCourse(tour: any) {
    const typing = useCancelableTyping();
    tour.addStep({
        id: 'fill-course-register',
        text: `
    <h2 class="title">
      Rellenando el formulario (course)
    </h2>
    <p class="text-gray-600 leading-relaxed">
      Seleccionamos un curso del menú desplegable.
    </p>
  `,
        // No adjuntamos aún: lo haremos en beforeShowPromise para evitar parpadeos
        arrow: true,
        buttons: [
            {text: 'Atrás',
                action:()=>{
                    typing.cancel();
                    const select = selectCourseRef.value as HTMLSelectElement | null;
                    if (select){
                        select.selectedIndex=0; //Seleccionamos la primera opción
                        select.dispatchEvent(new Event("change", {bubbles:true}));
                        select.blur();
                    }

                    tour.back();
                },
                classes: 'fancy-btn-secondary'},
            {text: 'Siguiente', action: tour.next, classes: 'fancy-btn-primary'}
        ],

        //Asegura de tener el elemento del dom montado
        beforeShowPromise: async () => {
            //Esperar a que el campo course esté montado el ref
            await nextTick();


            //Actualizamos la opciones de ete paso
            try {
                tour.getCurrentStep().updateStepOptions({
                    attachTo: {
                        element: selectCourseRef.value,
                        on: 'right'
                    },
                    floatingUIOptions: {
                        middleware: [offset({mainAxis: 12})]
                    }

                });

            } catch (e) {
                console.warn("No se pudo actualizar options en el step (fill course)", e)

            }
        },
        when: {
            show: async () => {
                // obtener el select desde el ref
                const select = selectCourseRef.value as HTMLSelectElement | null;
                    if (!select) return;

                    select.focus();
                    select.style.outline = '3px solid rgba(239,68,68,0.12)';
                    const opt = select.options[3];
                    if (!opt)return
                    select.value=opt.value;
                    select.dispatchEvent(new Event("change",{bu
                    :true}));
            }
        }
    });
}
