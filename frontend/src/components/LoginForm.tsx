import { useForm } from "@mantine/form";
import { useState } from "react";
import { Box, Button, Group, LoadingOverlay, TextInput } from '@mantine/core';
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            // username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true)

        try {
            const res = await api.post("/token/", { username: values.username, password: values.password })
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            navigate("/")
        } catch (error) {
            alert(error) // TODO: show notification
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box pos="relative">
            <LoadingOverlay visible={loading} loaderProps={{ children: 'Loading...' }} />
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
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Login</Button>
                </Group>
            </form>
        </Box>
    )
}