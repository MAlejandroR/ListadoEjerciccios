import { modalRegisterRef, showRegister  } from '@/Composable/UseModal';
import { nextTick } from 'vue';

export function useCancelableTyping() {


    let canceled = false;

    const cancel = () =>
        canceled = true;

    const reset = () =>
        canceled = false;

    const typeInto = async (input: HTMLInputElement | null, text: string, delay = 40) => {
        if (!input) return;
        input.focus();
        input.value = "";
        input.dispatchEvent(new Event("input", {bubbles: true}));
        for (let i = 0; i <= text.length; i++) {
            if (canceled) return;
            input.value = text.slice(0, i);
            input.dispatchEvent(new Event("input", {bubbles: true}));
            await new Promise(r => setTimeout(r, delay));
        }
        input.blur();
    };
    return {
        typeInto,
        cancel,
        reset,
    };

}
