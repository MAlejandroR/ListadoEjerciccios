declare module "@floating-ui/dom" {
    // Export minimal types used por el proyecto
    export function offset(value?: number | {mainAxis?: number, crossAxis?: number}): any;
    // Re-export any to allow usar otras utilidades si es necesario
    const _default: any;
    export default _default;
}

