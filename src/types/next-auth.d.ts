import 'next-auth'
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface User {
        id?: string;
        email?: string;
        username?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean
    }

    interface JWT extends DefaultJWT {
        id?: string;
        isVerified?: boolean;
        name?: string | null;
        email?: string | null;
        picture?: string | null;
        sub?: string;
        iat?: number;
        exp?: number;
        jti?: string;
    }

    // interface DefaultJWT{
    //     name: string
    // }

    interface Session {
        user: {
            id?: string;
            email?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            username?: string

        } & DefaultSession['user'],
        expires: ISODateString;
    }
}

