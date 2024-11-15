import { z } from "zod";

export const verifySchema = z.object({
    code: z.number().min(100000, "code must be 6 digits").max(999999, "code must be 6 digits")
})