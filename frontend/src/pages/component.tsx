import React from 'react'
import Link from 'next/link'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { uw, plan, tagline, planYourTerm } from '../constants'

const LandingPage: React.FC = () => {
    return (
        <Container 
            disableGutters
            maxWidth={false}
            className="h-full absolute flex flex-col items-center py-60"
            sx={{
                backgroundImage: "url('mountain.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                <Typography
                    variant="h1"
                    className="flex flex-col md:flex-row self-center text-center text-7xl"
                >
                    {uw}&nbsp;
                    <Typography variant='h1' className='text-7xl' sx={{ color: 'primary.light' }}>
                        {plan}
                    </Typography>
                </Typography>
                <Typography
                    className="text-center self-center w-90"
                    sx={{ color: 'text.secondary' }}
                >
                    {tagline}
                </Typography>
                <Link href="/plan" className="px-1">
                    <Button variant="contained" color="primary" className="w-full">
                        {planYourTerm}
                    </Button>
                </Link>
            </Stack>
        </Container>
  )
}

export default LandingPage
