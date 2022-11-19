import React, {FC, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";
import {SchemeSettings} from "types/crochet-types";

interface CrochetCircleSettingsDialogProps {
    open: boolean;
    config: SchemeSettings;
    onClose: (value: SchemeSettings | null) => void;
}

export const CrochetCircleSettingsDialog: FC<CrochetCircleSettingsDialogProps> = (
    {open, config, onClose}
) => {

    const [parts, setParts] = useState(7);
    const [radius, setRadius] = useState(10);

    useEffect(() => {
        setParts(config.parts)
        setRadius(config.radius)
    }, [config])

    return (
        <Dialog onClose={() => onClose(null)} open={open}>
            <DialogTitle>Свойства</DialogTitle>

            <DialogContent>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{marginTop: 1}}
                >
                    <TextField
                        label="Частей"
                        value={parts}
                        onChange={event => setParts(Number(event.target.value))}
                        variant="outlined"
                    />
                    <TextField
                        label="Радиус"
                        value={radius}
                        onChange={event => setRadius(Number(event.target.value))}
                        variant="outlined"
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => onClose(null)}>
                    Отмена
                </Button>
                <Button
                    onClick={() => {
                        onClose({
                            parts: parts,
                            radius: radius
                        })
                    }}
                >
                    Ок
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default CrochetCircleSettingsDialog;