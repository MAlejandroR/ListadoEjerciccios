import {registerButtonRef} from "@/Composable/UseModal.js";
import {offset} from "@floating-ui/dom";

export function PressSubmitRegisterOption(tour: any) {
    tour.addStep({
        id: 'fill-register-submit',
        text: `
    <h2 class="title">
      Registramos el usuario
    </h2>
    <p class="text-gray-600 leading-relaxed">
      Una vez registrado el usuario, podremos acceder a los ejercicios del curso seleccionado.
      Directamente apareceremos logueados, con la opción de logout
    </p>
  `,
        // No adjuntamos aún: lo haremos en beforeShowPromise para evitar parpadeos
        arrow: true,
        buttons: [
            {text: 'Atrás', action: tour.back, classes: 'fancy-btn-secondary'},
            {text: 'Siguiente', action: tour.next, classes: 'fancy-btn-primary'}
        ],

        //Asegura de tener el elemento del dom montado
        beforeShowPromise: async () => {
            //Esperar a que el campo course esté montado el ref
            await new Promise<boolean>(resolve => {
                //check, función que espera hasta que el ref de selectCourse esté activo
                const check = () => {
                    if (registerButtonRef.value)
                        resolve(true)
                    else
                        requestAnimationFrame(check)
                }
                check();
            });

            //Actualizamos la opciones de ete paso
            try {
                tour.getCurrentStep().updateStepOptions({
                    attachTo: {
                        element: registerButtonRef.value,
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
                const btn = registerButtonRef.value as HTMLButtonElement | null;
                if (!btn) return;
                await new Promise(r => setTimeout((r, 600)));
                btn.click();
            }
        }
    });
}
