import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import {CircleScheme, SchemeColor} from "types/crochet-types";
import {createJBBScheme} from "../../store/action-creators/crochet-circle-action";
import FillIcon from "./FillIcon";


export interface CrochetSchemeExportProps {
    open: boolean;
    colors: Array<SchemeColor>,
    scheme: CircleScheme,
    onClose: () => void;
}

const CrochetSchemeExport: FC<CrochetSchemeExportProps> = (
    {open, onClose, scheme, colors}
) => {

    const [startSpacing, setStartSpacing] = useState(3);

    const [fillColor, setFillColor] = useState(1);
    const [isShowColorSelect, setShowColorSelect] = useState(false);

    useEffect(() => {
        setStartSpacing(3)
        setFillColor(1)
    }, [scheme, colors])

    const handleExport = () => {
        const txt = createJBBScheme("My scheme", scheme, colors, startSpacing, fillColor)

        const url = window.URL.createObjectURL(new Blob([txt]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', "scheme.jbb");
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    }

    return (
        <Dialog
            onClose={onClose}
            open={open}
            fullWidth={true}
        >

            <DialogTitle>Экспорт схемы</DialogTitle>

            <DialogContent>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Отступ частей"
                            value={startSpacing}
                            onChange={event => setStartSpacing(Number(event.target.value))}
                            variant="outlined"
                            fullWidth={true}
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl
                            variant="outlined"
                            fullWidth={true}
                            margin="dense"
                        >
                            <InputLabel id="color-select-label">Исключающий цвет</InputLabel>
                            <Select
                                labelId="color-select-label"
                                id="color-select"
                                open={isShowColorSelect}
                                onClose={() => setShowColorSelect(false)}
                                onOpen={() => setShowColorSelect(true)}
                                value={fillColor}
                                MenuProps={{style: {maxHeight: 300}}}
                                onChange={(event) => setFillColor(event.target.value as number)}
                                label="Исключающий цвет"
                            >
                                {colors.map((item, index) =>
                                    <MenuItem key={index} value={index + 1}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <FillIcon color={item.color}/>
                                            <div style={{marginLeft: 8}}>
                                                {item.color}
                                            </div>
                                        </div>
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

            </DialogContent>

            <DialogActions sx={{display: 'flex'}}>
                <Button onClick={onClose}>
                    Отмена
                </Button>
                <Button onClick={handleExport}>
                    Экспорт
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default CrochetSchemeExport;