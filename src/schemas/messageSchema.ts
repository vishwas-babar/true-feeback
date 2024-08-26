import { z } from "zod"



export const messageSchema = z.object({
    content: z.string().min(1, "message must be at least 1 character"),
})