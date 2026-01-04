
export function Welcome (tour: any){
// PASO 1
    tour.addStep({
        id: 'welcome',
        text: `
                <h2 class="title">
                    Bienvenido 👋
                </h2>
                <p class="text-gray-600 font-weight font-semibold text-xl leading-relaxed">
                    Esta plataforma está diseñada para practicar ejercicios interactivos de PHP.
                </p>
            `,
        buttons: [
            {
                text: 'Siguiente',
                action: tour.next,
                classes: 'fancy-btn-primary'
            }
        ],

    });


}
