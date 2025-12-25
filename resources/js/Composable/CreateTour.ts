import Shepherd from 'shepherd.js';
import {Welcome} from '@/Composable/StepsTour/1_WelcomeStep';
import {Register} from "@/Composable/StepsTour/2_Register_1_Step";
import {Email} from "@/Composable/StepsTour/6_Email_step";
import {Login} from "@/Composable/StepsTour/5_Login_1_step";
import {Units} from "@/Composable/StepsTour/3_Units_step";
import {Exercises} from "@/Composable/StepsTour/4_Exercises_step";
import axios from "axios";



export function CreateTour() {
    //Lo primero borrar si existe el usuario de ejemplo del tour

    async function startTour() {
        // ensure axios sends cookies
        axios.defaults.withCredentials = true;

        try {
            const response = await axios.post('tour/reset');
            console.log ("Tour user reset response:", response.data);
            if (response.data.csrf) {
                const meta = document.querySelector('meta[name="csrf-token"]');
                const oldToken = meta?.getAttribute('content') ?? null;

                // Actualizamos axios default header
                axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf;

                // Actualizamos la meta tag si existe para que otras librerías también la lean
                if (meta) {
                    meta.setAttribute('content', response.data.csrf);
                }

                // Aseguramos también window.axios si está definido globalmente
                if ((window as any).axios) {
                    (window as any).axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf;
                }

                // Si el token cambió, forzamos una recarga completa antes de iniciar el tour
                // para garantizar que la cookie de sesión y el token estén 100% sincronizados.
                // if (oldToken && oldToken !== response.data.csrf) {
                //     try {
                //         sessionStorage.setItem('startTourAfterReload', '1');
                //     } catch (e) {
                //         console.warn('Could not access sessionStorage:', e);
                //     }
                //     // Forzamos recarga completa
                //     // window.location.reload();
                //     // No continuar aquí: la recarga interrumpirá la ejecución.
                //     return;
                // }
            }
        }catch (error){
            console.error("Error resetting tour user:", error);
            return;
        }

        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                classes: "shepherd-fancy tour-border bg-white " +
                    "p-6 rounded-2xl shadow-xl max-w-md text-4xl font-semi",
                // scrollTo: false,
                scrollTo: {behavior: 'smooth', block: 'center'},
                cancelIcon: {enabled: true}
            }
        });
        Welcome(tour);
        Register(tour);
        Units(tour);
        Exercises(tour);
        Email(tour);
        Login(tour);

        tour.start();
    }

    return {startTour};
}
