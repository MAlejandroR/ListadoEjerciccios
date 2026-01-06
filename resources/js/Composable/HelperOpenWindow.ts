import {modalRegisterRef,modalLoginRef, showRegister,
    showLogin, loginRef} from '@/Composable/UseModal';
import { nextTick } from 'vue';

function waitForLoginRef(timeout = 3000): Promise<void> {
    return new Promise((resolve, reject) => {
        const start = performance.now();

        const check = () => {
            if (loginRef.value) {
                resolve();
                return;
            }

            if (performance.now() - start > timeout) {
                reject(new Error('Login component not mounted'));
                return;
            }

            requestAnimationFrame(check);
        };

        check();
    });
}

export async function OpenRegisterMenu() {

    // 1. Abrimos el modal usando Vue, no haciendo clic
    showRegister.value = true;

    console.log("Mostrando OpenRegister");


    // 2. Esperar a que DOM del modal exista
    await nextTick();

    // 3. Esperar a que ref esté disponible y sea visible (o tenga tamaño)
    await waitForModalVisible();

    const modal = modalRegisterRef.value!;

    // 4. Añadir clases temporales para animación
    modal.classList.add("tour-modal-animation");
    requestAnimationFrame(() => {
        modal.classList.add("tour-modal-animation-active");
        // Asegura que la opacidad global también pase a visible
        modal.style.opacity = "1";
        // Llevar al modal al viewport si es necesario
        try { modal.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) { /* noop */ }
    });

    // 5. Limpiar después
    setTimeout(() => {
        modal.classList.remove("tour-modal-animation");
        modal.classList.remove("tour-modal-animation-active");
    }, 1000);
}
export async function CloseRegisterMenu() {

    // 1. Abrimos el modal usando Vue, no haciendo clic
    showRegister.value = false;

    console.log("Mostrando OpenRegister");


    // 2. Esperar a que DOM del modal exista
    await nextTick();


}
export async function CloseLoginMenu() {

    // 1. Abrimos el modal usando Vue, no haciendo clic
    showLogin.value = false;

    console.log("Mostrando OpenLogin");


    // 2. Esperar a que DOM del modal exista
    await nextTick();


}
export async function OpenLoginMenu() {

    // 1. Abrimos el modal usando Vue, no haciendo clic
    showLogin.value = true;

    console.log("Mostrando OpenRegister");


    // 2. Esperar a que DOM del modal exista
    await nextTick();

    // 3. Esperar a que ref esté disponible y sea visible (o tenga tamaño)
    await waitForModalVisible();
    // await waitForLoginRef();        // Login.vue mounted ✅


    const modal = modalLoginRef.value!;

    loginRef?.value.clearForm();

    // 4. Añadir clases temporales para animación
    modal.classList.add("tour-modal-animation");
    requestAnimationFrame(() => {
        modal.classList.add("tour-modal-animation-active");
        // Asegura que la opacidad global también pase a visible
        modal.style.opacity = "1";
        // Llevar al modal al viewport si es necesario
        try { modal.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) { /* noop */ }
    });




    // 5. Limpiar después
    setTimeout(() => {
        modal.classList.remove("tour-modal-animation");
        modal.classList.remove("tour-modal-animation-active");
    }, 1000);
}
function waitForModalVisible(timeout = 3000): Promise<void> {
    return new Promise(resolve => {
        const start = performance.now();
        const check = () => {
            const el = modalLoginRef.value as HTMLElement | null;
            if (el) {
                const rect = el.getBoundingClientRect();
                const style = getComputedStyle(el);
                const hasSize = rect.width > 0 && rect.height > 0;
                const isRendered = style.display !== 'none' && style.visibility !== 'hidden';
                // Consider visible if it has size OR is rendered (display/visibility).
                if (hasSize || isRendered) {
                    resolve();
                    return;
                }
            }
            if (performance.now() - start > timeout) {
                // Fallback: resolvemos aunque no esté totalmente
                // visible para evitar bloqueo infinito
                resolve();
                return;
            }
            requestAnimationFrame(check);
        };
        check();
    });
}
