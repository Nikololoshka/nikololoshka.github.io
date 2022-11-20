import React, {ChangeEvent, FC, useEffect, useState} from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Tooltip
} from "@mui/material";
import {UploadFile} from "@mui/icons-material";
import {
    SchemeColor,
    SchemeData, SchemeSettings
} from "types/crochet-types";
import {
    parseCBBColors, parseCBBScheme,
    parseJBBColors, parseJBBScheme,
} from "store/action-creators/crochet-circle-action";
import FillIcon from "./FillIcon";

export interface CrochetSchemeImportProps {
    open: boolean;
    onClose: (data: CrochetSchemeImportResult | null) => void;
}

export interface CrochetSchemeImportResult {
    scheme: SchemeData;
    settings: SchemeSettings
}

export interface FileData {
    name: string;
    text: string;
}

const CrochetSchemeImport: FC<CrochetSchemeImportProps> = (
    {open, onClose}
) => {

    const [schemeFile, setSchemeFile] = useState({name: "", text: ""})

    const [parts, setParts] = useState(7);
    const [radius, setRadius] = useState(10);

    const [colors, setColors] = useState(Array<SchemeColor>())
    const [color, setColor] = useState<string>("");
    const [isShowColorSelect, setShowColorSelect] = useState(false);

    const handleClose = () => onClose(null);

    useEffect(() => {
        if (open) {
            setSchemeFile({name: "", text: ""})
            setColors(Array<SchemeColor>())
            setColor("")
            setParts(7)
            setRadius(10)
        }
    }, [open])

    useEffect(() => {
        if (schemeFile.name.endsWith(".jbb")) {
            setColors(parseJBBColors(schemeFile.text))
        }
        if (schemeFile.name.endsWith(".cbb")) {
            setColors(parseCBBColors(schemeFile.text))
        }
    }, [schemeFile])

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return

        const file = files[0];
        file.text().then(text => setSchemeFile({name: file.name, text: text}))
    }

    const handleImport = () => {
        const fillColor = colors.findIndex(item => item.color === color) + 1
        const settings: SchemeSettings = {parts: parts, radius: radius}

        if (schemeFile.name.endsWith(".jbb")) {
            const scheme = parseJBBScheme(schemeFile.text, fillColor)
            onClose({scheme: scheme, settings: settings})
        }
        if (schemeFile.name.endsWith(".cbb")) {
            const scheme = parseCBBScheme(schemeFile.text, fillColor)
            onClose({scheme: scheme, settings: settings})
        }
    }

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            fullWidth={true}
        >

            <DialogTitle>Импорт схемы</DialogTitle>

            <DialogContent>

                <FormControl
                    variant="outlined"
                    fullWidth={true}
                    margin="dense"
                >
                    <InputLabel htmlFor="outlined-import-file">Файл (.cbb, .jbb)</InputLabel>
                    <OutlinedInput
                        id="outlined-import-file"
                        value={schemeFile.name}
                        label="Файл (.cbb, .jbb)"
                        readOnly={true}
                        endAdornment={
                            <InputAdornment position="end">
                                <Tooltip title="Загрузить">
                                    <IconButton component="label">
                                        <UploadFile/>
                                        <input type="file" accept=".cbb, .jbb" hidden onChange={handleFileUpload}/>
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Частей"
                            value={parts}
                            onChange={event => setParts(Number(event.target.value))}
                            variant="outlined"
                            fullWidth={true}
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Радиус"
                            value={radius}
                            onChange={event => setRadius(Number(event.target.value))}
                            variant="outlined"
                            margin="dense"
                            fullWidth={true}
                        />
                    </Grid>
                </Grid>

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
                        value={color}
                        MenuProps={{style: {maxHeight: 300}}}
                        onChange={(event) => setColor(event.target.value as string)}
                        label="Исключающий цвет"
                    >
                        <MenuItem value="">
                            <em>Отсутствует</em>
                        </MenuItem>
                        {colors.map((item, index) =>
                            <MenuItem key={index} value={item.color}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <FillIcon color={item.color}/>
                                    <div style={{marginLeft: 8}}>
                                        {item.color}
                                    </div>
                                </div>
                            </MenuItem>
                        )}
                    </Select>
                    <FormHelperText>Для выбора нужно сначало выбрать схему</FormHelperText>
                </FormControl>

            </DialogContent>

            <DialogActions sx={{display: 'flex'}}>
                <Button
                    onClick={handleClose}
                >
                    Отмена
                </Button>

                <Button
                    disabled={schemeFile.text.length === 0}
                    onClick={handleImport}
                >
                    Импорт
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default CrochetSchemeImport;