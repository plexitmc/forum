import { Button } from "@mantine/core";
import { useState } from "react";

export default function CreateApplicationButton(){

    const [isSubmitting, setSubmitting] = useState(false);

    return (
        <Button variant="outline" color="orange" radius="xl" loading={isSubmitting}>
            Create application
        </Button>
    )
}