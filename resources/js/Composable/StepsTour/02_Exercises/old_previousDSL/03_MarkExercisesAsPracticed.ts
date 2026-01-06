import {offset} from "@floating-ui/dom";


export function MarkExercisesAsPracticed(tour: any) {
    tour.addStep({
        id: "step-exercise",
        text: `
      <h2 class="text-xl font-semibold mb-2 text-gray-900">
        Ejercicios
      </h2>
      <p class="text-gray-600 leading-relaxed">
        Podremos Marcar  ejercicios como realizados.
        Esto se guardará y la próxima conexión los veremos marcados.
        De esta forma puedes recordar los ejercicios que ya realizaste
      </p>
    `,
        beforeShowPromise: async () => {
            const exerciseIds = [133,134];

            for (const id of exerciseIds) {
                const checkbox = document.querySelector(
                    `#exercise-${id}`
                ) as HTMLInputElement | null;

                const box = document.querySelector(
                    `#exercise-box-${id}`
                ) as HTMLElement | null;

                if (checkbox && !checkbox.checked) {
                    checkbox.click(); // 🔥 Vue + backend
                }

                if (box) {
                    box.classList.add("exercise-highlight");
                }
                document
                    .querySelectorAll("#exercise-box-133, #exercise-box-134")
                    .forEach(el => el.classList.add("exercise-highlight"))

                await new Promise(r => setTimeout(r, 100));

            }

            try {
                tour.getCurrentStep().updateStepOptions({
                    attachTo: {
                        element: "#exercise-box-133",
                        on: "right"
                    },
                    floatingUIOptions: {
                        middleware: [offset({mainAxis: 12})]
                    }
                })
            } catch (e) {
                console.warn('No se pudo actualizar options del step (fill):', e);
            }
        },
        when: {
            hide: async () => {
                // limpiar resaltado al salir del step
                document
                    .querySelectorAll(".exercise-highlight")
                    .forEach(el => el.classList.remove("exercise-highlight"));
            }
        },
        buttons: [
            { text: "Atrás", action: tour.back, classes: "fancy-btn-secondary" },
            { text: "Siguiente",action: tour.next,classes: "fancy-btn-primary" }
        ]
    });
}
