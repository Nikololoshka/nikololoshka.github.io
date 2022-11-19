import React, {FC} from "react";
import {Box} from "@mui/material";

interface FillIconProps {
    color: string;
}

const FillIcon: FC<FillIconProps> = ({color}) => {
    return (
        <Box
            component="span"
            sx={{
                border: "1px solid #000000",
                backgroundColor: color,
                width: 24,
                height: 24
            }}
        />
    )
}

export default FillIcon;