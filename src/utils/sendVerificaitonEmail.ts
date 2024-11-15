import VerificationEmailTemplate from "@/components/email formats/VerificationEmailFormat"
import { resend } from "@/lib/resend"


export const sendVerificationEmail = async (to: string, username: string, otp: string): Promise<{ success: boolean, error?: any }> => {
    try {
        const { data, error } = await resend.emails.send({
            from: "True Feedback <noreply@vishwasvb.me>",
            to: [to],
            subject: "True Feedback OTP Verification",
            react: VerificationEmailTemplate({ username, verificationCode: otp })
        })

        console.log(data)

        if (error) {
            console.log(error)
            return { success: false, error }
        }

        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, error }
    }

}

export const generateSixDigitOtp = (): string => {
    
    const digits = '0123456789'
    let otp = ''
    const numebrOfDigits = 6;

 
    for (let i = 0; i < numebrOfDigits; i++){
        let random = Math.floor(Math.random() * 10)

        otp+=random.toString()
    }

    console.log('generatedOtp: ', otp)
    return otp;
}

generateSixDigitOtp()