"use server";

import { z } from "zod";
import { handleInput } from "./function";

const FormSchema = z.object({
    integer: z.string().min(1, "Integer is required"),
    language: z.enum(
        ["c", "cpp", "golang", "java", "javascript", "python", "lua"],
        {
            required_error: "Please select a programming language",
        },
    ),
});

export type State = {
    message: string | null;
    errors?: {
        integer?: string[];
        language?: string[];
    };
};

export async function handleForm(
    prevState: State,
    formData: FormData,
): Promise<State> {
    const validatedFields = FormSchema.safeParse({
        integer: formData.get("integer"),
        language: formData.get("language"),
    });

    if (!validatedFields.success) {
        return {
            message: null,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const result = handleInput({
        input: validatedFields.data.integer,
        option: validatedFields.data.language
    });
    if (result instanceof Error) {
        return {
            message: null,
            errors: {
                integer: [result.message],
            },
        };
    }

    return {
        message: result,
        errors: {},
    };
}
