import {confirmPasswordRef, selectCourseRef} from "@/Composable/UseModal.js";
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
                    const input = selectCourseRef.value as HTMLInputElement | null
                    input.value="";
                    input.dispatchEvent(new Event("input", {bubbles:true}))
                    input.blur();
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
                const courseSelect = selectCourseRef.value as HTMLSelectElement | null;

                const selectOption = async (select: HTMLSelectElement | null, value?: string) => {
                    if (!select) return;
                    select.focus();
                    select.style.outline = '3px solid rgba(239,68,68,0.12)';

                    const opt = value ? Array.from(select.options).find(o => o.value === value) : select.options[1];
                    if (opt) {
                        select.value = opt.value;
                        const ev = new Event('change', { bubbles: true });
                        select.dispatchEvent(ev);
                    }

                    await new Promise(r => setTimeout(r, 350));
                    select.blur();
                    select.style.outline = '';
                };

                try {
                    await selectOption(courseSelect);

                    if (courseSelect) {
                        courseSelect.animate([
                            { boxShadow: '0 0 0 0 rgba(34,197,94,0.0)' },
                            { boxShadow: '0 0 0 10px rgba(34,197,94,0.14)' },
                        ], { duration: 600, easing: 'ease-out' });
                    }
                } catch (e) {
                    console.warn('Error rellenando campos del formulario en tour:', e);
                }
            }
        }
    });
}
