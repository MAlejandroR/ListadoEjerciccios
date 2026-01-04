import { offset as fuiOffset } from "@floating-ui/dom";
import { flip as fuiFlip } from "@floating-ui/dom";




type Side = 'left' | 'right' | 'top' | 'bottom';

type ModalName =
    | 'login'
    | 'register'
    | 'email'
    | 'admin'
    | 'admin_exercises'
    | 'admin_course'
    | 'admin_users';

type StepCtx = {
    tour: any;
    getStep: () => any;
};
type AttachElement=
    |string
    |HTMLElement
    | (()=>HTMLElement|null);

export function tourStep(tour: any, id: string) {

    /* -------------------------------
     * Estado del DSL
     * ------------------------------- */

    let showArrow = true;
    let offsetValue = 16;
    let placement: Side | null = null;
    let flipFallbacks: Side[] | null = null;

    let attachLaterConfig:
        |{element: AttachElement; side:Side}
        |null=null

    let beforeShow: ((ctx: StepCtx) => Promise<void> | void) | null = null;
    let onShow: ((ctx: StepCtx) => Promise<void> | void) | null = null;
    let onHide: ((ctx: StepCtx) => Promise<void> | void) | null = null;

    const buttons: any[] = [];

    const step: any = {
        id,
        text: '',
        buttons,
    };

    const ctx: StepCtx = {
        tour,
        getStep: () => tour.getCurrentStep(),
    };

    /* -------------------------------
     * Builder DSL
     * ------------------------------- */

    const builder = {

        classes(classes: string) {
            step.classes = classes;
            return builder;
        },

        title(title: string) {
            step.text += `<h2 class="title">${title}</h2>`;
            return builder;
        },

        text(text: string) {
            step.text += `<p class="text-gray-600 leading-relaxed">${text}</p>`;
            return builder;
        },

        arrow(enabled = true) {
            showArrow = enabled;
            return builder;
        },

        offset(px: number) {
            offsetValue = px;
            return builder;
        },

        placement(side: Side) {
            placement = side;
            return builder;
        },

        flip(fallbackPlacements: Side[]) {
            flipFallbacks = fallbackPlacements;
            return builder;
        },

        attachLater(element: AttachElement, side: Side) {
            attachLaterConfig = { element, side };
            return builder;
        },

        beforeShow(fn: (ctx: StepCtx) => Promise<void> | void) {
            beforeShow = fn;
            return builder;
        },

        onShow(fn: (ctx: StepCtx) => Promise<void> | void) {
            onShow = fn;
            return builder;
        },

        onHide(fn: (ctx: StepCtx) => Promise<void> | void) {
            onHide = fn;
            return builder;
        },

        back(label = 'Atrás', action?: () => void) {
            buttons.unshift({
                text: label,
                action: () => {
                    action?.();
                    tour.back();
                },
                classes: 'fancy-btn-secondary',
            });
            return builder;
        },

        next(label = 'Siguiente', action?: () => void) {
            buttons.push({
                text: label,
                action: () => {
                    action?.();
                    tour.next();
                },
                classes: 'fancy-btn-primary',
            });
            return builder;
        },

        /* -------------------------------
         * MATERIALIZACIÓN FINAL
         * ------------------------------- */

        end() {

            step.arrow = showArrow;

            step.beforeShowPromise = async () => {

                await beforeShow?.(ctx);

                if (attachLaterConfig) {
                    const el =
                        typeof attachLaterConfig.element === 'string'
                            ? document.querySelector(attachLaterConfig.element)
                            : attachLaterConfig.element;

                    if (!el) {
                        console.warn('attachLater: elemento no encontrado', attachLaterConfig);
                        return;
                    }

                    const middleware = [
                        fuiOffset({ mainAxis: offsetValue }),
                    ];

                    if (flipFallbacks) {
                        middleware.push(
                            fuiFlip({ fallbackPlacements: flipFallbacks })
                        );
                    }

                    ctx.getStep().updateStepOptions({
                        attachTo: {
                            element: el,
                            on: placement ?? attachLaterConfig.side,
                        },
                        floatingUIOptions: {
                            placement: placement ?? attachLaterConfig.side,
                            middleware,
                        },
                    });
                }
            };

            step.when = {
                show: async () => { await onShow?.(ctx); },
                hide: async () => { await onHide?.(ctx); },
            };

            tour.addStep(step);
            return builder;
        },
    };

    return builder;
}
