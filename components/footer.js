import {Box, Typography} from '@mui/material'

const Footer = () => {
    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column-reverse",
                height: "full"
            }}>
                <Typography sx={{
                    fontSize: "20px"
                }}>
                    @Copyright Soojo_Dev 2024
                </Typography>
            </Box>
        </>
    )
}

export default Footer