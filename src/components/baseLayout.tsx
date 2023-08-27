import React, { ReactNode } from "react"
import Header from "./header"
import Footer from "./footer"
import { Container } from "@mui/material"

const BaseLayout: React.FC<{children: ReactNode }> = ({children}) => {
    return (
        <>
        <Header />
        <Container
            component="main"
            sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            }}
        >
            {children}
        </Container>
        <Footer />
    </>
    )
}

export default BaseLayout
