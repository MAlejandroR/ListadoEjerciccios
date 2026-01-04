import {tourStep} from "@/Composable/TourDSL";

export function MarkExercisesAsPracticed(tour: any) {
    tourStep(tour, "step-exercise")
        .title("Ejercicios")
        .text("Podremos Marcar  ejercicios como realizados.<br />" +
            "Esto se guardará y la próxima conexión los veremos marcados.<br />" +
            "De esta forma puedes recordar los ejercicios que ya realizaste<br />")
        .beforeShow(async() => {
            const exerciseIds = [133, 134];

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
        })
        .attachLater("#exercise-box-133", "right")
        .offset(12)
        .onHide(() => {
            async () => {
                // limpiar resaltado al salir del step
                document
                    .querySelectorAll(".exercise-highlight")
                    .forEach(el => el.classList.remove("exercise-highlight"));
            }
        })
        .next("Siguiente")
        .back("Atrás")
        .end()
}
