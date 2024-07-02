import { useForm } from "@mantine/form";
import { useState } from "react";
import { Box, Button, Group, LoadingOverlay } from '@mantine/core';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

export default function LogoutForm() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const form = useForm({
        mode: 'uncontrolled',
    });

    const handleSubmit = async () => {
        setLoading(true)
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        setLoading(false)
        navigate("/")
    }

    return (
        <Box pos="relative">
            <LoadingOverlay visible={loading} loaderProps={{ children: 'Loading...' }} />
            <form onSubmit={form.onSubmit(handleSubmit)} method="post">
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Logout</Button>
                </Group>
            </form>
        </Box>
    )
}