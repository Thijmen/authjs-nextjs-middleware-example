import NextAuth from "next-auth"
import Auth0 from "@auth/core/providers/auth0";
import {Provider} from "@auth/core/providers";

const providers: Provider[] = [
    Auth0
]

export const providerMap = providers.map((provider) => {
    if (typeof provider === 'function') {
        const providerData = provider()
        return { id: providerData.id, name: providerData.name }
    } else {
        return { id: provider.id, name: provider.name }
    }
})
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    debug: true,
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname === "/tester") return !!auth
            return true
        },
    }
})