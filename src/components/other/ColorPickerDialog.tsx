import React, {FC, useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {HexColorInput, HexColorPicker} from "react-colorful";

export interface ColorPickerRequest {
    id: number;
    color: string;
}

export enum ColorPickerState {
    COLOR_PICKED = "color_picked",
    COLOR_DELETE = "color_delete",
}

export interface ColorPickerResultSuccess {
    type: ColorPickerState.COLOR_PICKED
    id: number;
    color: string;
}

export interface ColorPickerResultDelete {
    type: ColorPickerState.COLOR_DELETE
    id: number;
}

export type ColorPickerResult =  ColorPickerResultSuccess | ColorPickerResultDelete

export interface ColorPickerDialogProps {
    open: boolean;
    selectedValue: ColorPickerRequest | null;
    onClose: (value: ColorPickerResult | null) => void;
}


export const ColorPickerDialog: FC<ColorPickerDialogProps> = ({open, selectedValue, onClose}) => {

    const [currentColor, setColor] = useState("#FFFFFF")

    useEffect(() => {
        let color = selectedValue?.color
        if (color != null) {
            setColor(color)
        }
    }, [selectedValue])

    const handleClose = () => onClose(null);

    return (
        <Dialog onClose={handleClose} open={open}>

            <DialogTitle>Выбор цвета</DialogTitle>

            <DialogContent>

                <HexColorPicker
                    color={currentColor}
                    style={{width: '300px', marginBottom: 8}}
                    onChange={setColor}/>

                <HexColorInput
                    prefixed={true}
                    color={currentColor}
                    onChange={setColor}/>

            </DialogContent>

            <DialogActions sx={{display: 'flex'}}>

                <div style={{flexGrow: 1}}>
                    <Button
                        color="error"
                        onClick={() => {
                            onClose({
                                id: selectedValue?.id ?? -1,
                                type: ColorPickerState.COLOR_DELETE
                            })
                        }}
                    >
                        Удалить
                    </Button>
                </div>

                <Button
                    onClick={handleClose}
                >
                    Отмена
                </Button>

                <Button
                    onClick={() => {
                        onClose({
                            id: selectedValue?.id ?? -1,
                            color: currentColor,
                            type: ColorPickerState.COLOR_PICKED
                        })
                    }}
                >
                    Выбрать
                </Button>

            </DialogActions>

        </Dialog>
    )
}