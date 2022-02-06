import React, { FC } from 'react'
import { Box, SxProps, Theme } from '@mui/material'

interface ContentBoxProps {
    sx?: SxProps<Theme>;
    children: React.ReactChild | React.ReactNode;
}

const ContentBox: FC<ContentBoxProps> = ({ sx = { padding: 3 }, children }) => {
    return (
        <Box sx={sx}>
            {children}
        </Box>
    )
}

export default ContentBox
