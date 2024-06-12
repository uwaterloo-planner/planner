import { FC } from 'react'
import { alpha, Box, Button, Container, Stack, Typography } from '@mui/material'

const LandingPage: FC = () => {
    return (
        <Box
            sx={{
                backgroundImage: `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Container className="flex flex-col items-center py-60">
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                    <Typography
                        variant="h1"
                        className="flex flex-col md:flex-row self-center text-center text-7xl"
                    >
                    UW&nbsp;
                        <Typography variant='h1' className='text-7xl' sx={{ color: 'primary.light' }}>
                        Plan
                        </Typography>
                    </Typography>
                    <Typography
                        className="text-center self-center w-90"
                        sx={{ color: 'text.secondary' }}
                    >
                    Transform your academic journey with our advanced platform — explore all possible course schedules and effortlessly select the perfect classes for a customized, efficient term planning experience.
                    </Typography>
                    <Button variant="contained" color="primary">
                    Plan your term
                    </Button>
                </Stack>
            </Container>
        </Box>
  )
}

export default LandingPage
