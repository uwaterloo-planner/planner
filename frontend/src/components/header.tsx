import React from "react"
import Image from 'next/image'
import { signOut } from "next-auth/react"
import { Box, AppBar, Toolbar, Container } from '@mui/material'
import { MenuItemButton, AuthenticationButton } from "./button"
import { plan, profile, signIn, signOutText, signUp } from "@/constants"

const Header: React.FC = () => {
    return (
        <AppBar
            className="shadow-none bg-transparent bg-none mt-3"
        >
            <Container maxWidth={false}>
                <Toolbar
                    variant="regular"
                    className="
                        shadow-none
                        max-h-10
                        justify-end
                        gap-5
                    "
                >
                    {/* <Image src="/icon.png" alt="logo" width={30} height={30} /> */}
                    <MenuItemButton href="/plan" text={plan} />
                    <MenuItemButton href="/profile" text={profile} />
                    <AuthenticationButton
                        variant="contained"
                        text={signOutText}
                        onClick={() => signOut()}
                    />
                    {/* <AuthenticationButton
                        variant="contained"
                        href="/material-ui/getting-started/templates/sign-up/"
                        text={signUp}
                    /> */}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
