import React from "react"
import Link from "next/link"
import { Button, Grid } from "@mui/material"

const Header: React.FC = () => {
    return (
        <Grid container={true} sx={{height:50}} className='bg-blue-300 justify-center items-center'>
            <Link href='/plan'><Button>Plan</Button></Link>
            <Link href='/profile'><Button>Profile</Button></Link>
        </Grid>)
}

export default Header
