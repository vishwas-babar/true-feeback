import { signupSchema } from "@/schemas/signupschema"
import { z } from "zod"

interface user {
    user_name: string,
    password: string,
    email: string,
    verify_code: number,
    is_verified: boolean,
    verify_code_expires: Date,
    created_at: Date,
    updated_at: Date,
    is_accepting_messages: boolean,
}

type User = z.infer<typeof signupSchema>

interface message {
    content: string,
    message_id: number,
    sender: string,
    created_at: Date,
}

export type { user, message }