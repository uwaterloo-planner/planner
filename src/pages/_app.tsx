import React, { PropsWithChildren } from "react"
import { AppProps } from "next/app"
import { SessionProvider, useSession } from "next-auth/react"
import { loadingStatus } from "@/constants"
import LoadingState from "@/components/loading"
import { Container } from "@mui/material"

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps): React.ReactNode {
    return (
        <SessionProvider session={session}>
            <Auth>
                <Component {...pageProps} />
            </Auth>
        </SessionProvider>
    )
}

const Auth: React.FC<PropsWithChildren> = ({ children }) => {
    // status can only be "loading" or "authenticated"
    const { status } = useSession({ required: true })

    if (status === loadingStatus) {
        return (
            <Container>
                <LoadingState />
            </Container>)
    }

    return children
}