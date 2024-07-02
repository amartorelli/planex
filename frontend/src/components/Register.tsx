import { useForm } from "@mantine/form";
import { useState } from "react";
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import api from "../api";

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
            await api.post("/api/users/", { username: values.username, password: values.password })
        } catch (error) {
            alert(error) // TODO: show notification
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)} method="post">
            <TextInput
                label="Username"
                placeholder="Username"
                key={form.key('username')}
                {...form.getInputProps('username')}
            />
            <TextInput
                withAsterisk
                label="Password"
                placeholder="password"
                key={form.key('password')}
                {...form.getInputProps('password')}
            />
            <Checkbox
                mt="md"
                label="I agree with the terms and conditions"
                key={form.key('termsOfService')}
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit">Register</Button>
            </Group>
        </form>
    )
}