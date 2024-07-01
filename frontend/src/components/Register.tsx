import { useForm } from "@mantine/form";
import { useState } from "react";
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export default function RegisterForm() {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
            termsOfService: false,
        },

        validate: {
            // username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true)

        try {
            const res = await api.post("/register", { username: values.username, password: values.password })
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        } catch (error) {
            alert(error) // TODO: show notification
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label="Email"
                placeholder="your@email.com"
                key={form.key('email')}
                {...form.getInputProps('email')}
            />
            <TextInput
                withAsterisk
                label="Password"
                placeholder="password"
                key={form.key('password')}
                {...form.getInputProps('password')}
            />
            {/* <Checkbox
                mt="md"
                label="I agree with the terms and conditions"
                key={form.key('termsOfService')}
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            /> */}
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )
}