import React from "react"
import Image from 'next/image'
import { signOut } from "next-auth/react"
import { Box, AppBar, Toolbar, Container } from '@mui/material'
import { MenuItemButton, AuthenticationButton } from "./button"
import { plan, profile, signIn, signOutText, signUp } from "@/constants"

const Header: React.FC = () => {
    return (
        <AppBar
            className="shadow-none bg-transparent bg-none mt-4"
        >
            <Container maxWidth="lg">
                <Toolbar
                    variant="regular"
                    className="
                        rounded-full
                        bg-black/40
                        backdrop-blur-[24px]
                        max-h-10
                        border
                    "
                    sx={{
                        borderColor: 'divider',
                        boxShadow: '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                    }}
                >
                    <Box className="flex-grow flex items-center">
                        <Image src="/icon.png" alt="logo" width={30} height={30} />
                        <MenuItemButton href="/plan" text={plan} />
                        <MenuItemButton href="/profile" text={profile} />
                    </Box>
                    <Box className="flex gap-0.5 items-center" >
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
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
