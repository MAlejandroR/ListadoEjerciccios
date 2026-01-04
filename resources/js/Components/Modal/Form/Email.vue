<script setup>
import Checkbox from '@/Components/Utilities/Checkbox.vue';
import InputError from '@/Components/Utilities/InputError.vue';
import InputLabel from '@/Components/Utilities/InputLabel.vue';
import PrimaryButton from '@/Components/Utilities/PrimaryButton.vue';
import TextInput from '@/Components/Utilities/TextInput.vue';
import {Head, Link, useForm, usePage} from '@inertiajs/vue3';

defineProps({
    status: {
        type: String,
        default: null
    },
});

const email=usePage().props.auth?.user?.email ?? "";
const emit = defineEmits(['sent']);



const form = useForm({
    from: email,
    to: '',
    subject: '',
    message: '',
    cc: false,
});

const submit = () => {
    form.post(route('email.send'), {
        onSuccess: () => {
            emit('sent');
            form.reset();
        }
    });
};
</script>

<template>
    <Head title="Send Email" />

    <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
        {{ status }}
    </div>

    <form @submit.prevent="submit" class="space-y-6">
        <!-- TWO COLUMN GRID -->

            <!-- LEFT COLUMN -->
            <div class="space-y-4">
                <div>
                    <InputLabel for="from" value="From" />

                    <TextInput
                        id="from"
                        type="email"
                        class="mt-1 block w-full"
                        v-model="form.from"
                        required
                        autocomplete="email"
                        :disabled="email!==null"
                        :class="email!==null? 'text-gray-500':'text-black'"

                    />

                    <InputError class="mt-2" :message="form.errors.from" />
                </div>

                <div>
                    <InputLabel for="to" value="To" />

                    <TextInput
                        id="to"
                        type="email"
                        class="mt-1 block w-full"
                        v-model="form.to"
                        required
                        autocomplete="email"
                    />

                    <InputError class="mt-2" :message="form.errors.to" />
                </div>

                <div class="mt-4 block">
                    <label class="flex items-center">
                        <Checkbox name="cc" v-model:checked="form.cc" />
                        <span class="ms-2 text-sm text-gray-600">Send me a copy (CC)</span>
                    </label>
                </div>
            </div>

            <!-- RIGHT COLUMN -->
            <div class="space-y-4">
                <div>
                    <InputLabel for="subject" value="Subject" />

                    <TextInput
                        id="subject"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.subject"
                        required
                    />

                    <InputError class="mt-2" :message="form.errors.subject" />
                </div>

                <div>
                    <InputLabel for="message" value="Message" />

                    <textarea
                        id="message"
                        rows="7"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        v-model="form.message"
                        required
                    ></textarea>

                    <InputError class="mt-2" :message="form.errors.message" />
                </div>
            </div>

        <!-- BUTTON -->
        <div class="flex justify-end">
            <PrimaryButton
                class="ms-4"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                Send Email
            </PrimaryButton>
        </div>
    </form>
</template>
