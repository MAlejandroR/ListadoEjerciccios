import {offset} from "@floating-ui/dom";
import {useAuth} from "@/Composable/useAuth";
import {nextTick} from "vue";
import {logoutButton, registerButtonRef} from "@/Composable/UseModal";
import {router} from "@inertiajs/vue3";
import axios from "axios";

export function Logout(tour: any) {
     const {logout} = useAuth();

// LOGIN
    tour.addStep({
        id: 'step-login',
        text: `
                <h2 class="text-xl font-semibold mb-2 text-gray-900">
                    Logout
                </h2>
                <p class="text-gray-600 leading-relaxed">
                    Para deloguearte de la aplicación
                </p>
            `,
        attachTo: {
            element: '#logout',
            on: 'bottom'
        },
        floatingUIOptions: {
            middleware: [offset(20)] // 20px separation
        },
        buttons: [
            {text: 'Atrás', action: tour.back, classes: 'fancy-btn-secondary'},
            {
                text: 'Siguiente', action: async () => {
                    // const form = document.getElementById("logout-form")
                    // if (form)
                    //     form.submit();
                    // // Esperar un momento para asegurar que el usuario se ha registrado
                    // //  const btn = logoutButton.value as HTMLButtonElement | null;
                    // //  console.log (`Valor de btn ${btn}`);
                    // //  if (btn)
                    // //      btn.click();

                    // @ts-ignore (to route function of inertia)
                     axios.post(route('tour-reset'))



                    router.reload({
                        only:['auth','units'],
                        //@ts-ignore
                        preserveState: false
                    });
                     tour.next();
                }, classes: 'fancy-btn-primary'
            }
        ]
    });


}
