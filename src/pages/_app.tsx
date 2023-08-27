import React, { PropsWithChildren } from "react"
import { AppProps } from "next/app"
import { SessionProvider, useSession } from "next-auth/react"
import { loadingStatus } from "@/constants"
import LoadingState from "@/components/loading"
import { Container } from "@mui/material"
import 'tailwindcss/tailwind.css'
import BaseLayout from "@/components/baseLayout"
import { CoursesProvider } from "./plan/context"

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps): React.ReactNode {
    return (
        <SessionProvider session={session}>
            <CoursesProvider>
                <Auth>
                    <BaseLayout>
                    <Component {...pageProps} />
                    </BaseLayout>
                </Auth>
            </CoursesProvider>
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