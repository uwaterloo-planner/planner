import React from "react"
import { Box, Grid } from "@mui/material"

const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0, height:50}} className='bg-blue-300 sticky bottom-0'>

        </Box>
    )
}

export default Footer
