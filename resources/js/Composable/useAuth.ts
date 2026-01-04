import { router } from "@inertiajs/vue3";

export function useAuth() {
    /**
     * Tras hacer logout, Laravel invalida la sesión y regenera el token CSRF.
     * Inertia NO actualiza automáticamente el CSRF en una SPA,
     * por lo que si no recargamos la página el siguiente POST fallará
     * con un "419 Page Expired".
     *
     * Por eso, después del logout forzamos una recarga completa
     * para sincronizar sesión y CSRF con el frontend.
     */
    const logout = () => {
        router.post(
            route("logout"),
            {},
            {
                onFinish: () => {
                    window.location.reload();
                }
            }
        );
    };

    return { logout };
}
