import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';

import {
    Button,
    ButtonGroup,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    Stack,
    Tooltip,
    Paper,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import {
    Add,
    BugReport,
    Edit, FileDownload,
    Settings,
    UploadFile,
    ZoomIn,
    ZoomOut
} from "@mui/icons-material";
import {
    ColorPickerRequest,
    ColorPickerDialog,
    ColorPickerResult,
    ColorPickerState
} from "./ColorPickerDialog";
import FillIcon from "./FillIcon";
import CrochetCircleSettingsDialog from "./CrochetCircleSettingsDialog";
import CrochetSchemeImport, {CrochetSchemeImportResult} from './CrochetSchemeImport';
import {
    SchemeSettings,
    SchemeColor,
    CircleScheme
} from "types/crochet-types";
import {
    resize
} from "utils/utils"
import './CrochetCirclePage.css';
import {useElementSize} from "usehooks-ts";
import {computeSchemeCoords, drawScheme} from "./circle-scheme-draw";
import {createJBBScheme} from "../../store/action-creators/crochet-circle-action";
import CrochetSchemeExport from "./CrochetSchemeExport";


const CrochetCirclePage = () => {
    const [isDebug, setDebug] = useState(false)

    const [canvasZoom, setCanvasZoom] = useState(2);
    const [zoomAnchorEl, setZoomAnchorEl] = useState<null | HTMLElement>(null);
    const showZoomList = Boolean(zoomAnchorEl);

    const [containerRef, containerSize] = useElementSize()
    const [canvasSize, setCanvasSize] = useState(1000)
    const canvasRef = useRef(null);

    const changeZoom = (delta: number) => {
        let newZoom = canvasZoom + delta;
        if (newZoom < 0.25) newZoom = 0.25
        if (newZoom > 10.0) newZoom = 10.0
        setCanvasZoom(newZoom)
    };

    const [showSettingDialog, setShowSettingDialog] = useState(false);
    const [showImportDialog, setShowImportDialog] = useState(false);
    const [showExportDialog, setShowExportDialog] = useState(false);

    const [scheme, setScheme] = useState<CircleScheme>({
        beads: Array<number>((7 + 7 * 10) / 2 * 10).fill(1),
        settings: {
            parts: 7,
            radius: 10
        }
    });

    const [colorAnchorEl, setColorAnchorEl] = useState<null | HTMLElement>(null);
    const showColors = Boolean(colorAnchorEl);

    const [colorPickerData, setColorPickerData] = useState<null | ColorPickerRequest>(null);
    const showColorPicker = Boolean(colorPickerData);

    const [colors, setColors] = useState(Array<SchemeColor>({color: '#ffffff'}));
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const selectedColor = colors[selectedColorIndex];

    useEffect(() => {
        setCanvasSize(scheme.settings.radius * 2 * 20)
    }, [scheme])

    useEffect(() => {
        // @ts-ignore
        const canvas: CanvasRenderingContext2D = canvasRef.current.getContext('2d')
        drawScheme(canvas, canvasSize, canvasZoom, scheme, colors, isDebug)
    }, [canvasSize, colors, canvasZoom, scheme, isDebug]);

    const handleUpdateColors = (newColors: Array<SchemeColor>) => {
        if (newColors.length === 0) {
            setColors([{color: '#ffffff'}])
        } else {
            setColors(newColors)
        }
    }

    const handleCanvasClick = (x: number, y: number) => {
        const index = computeSchemeCoords(x, y, canvasSize, canvasZoom, scheme.settings)
        if (index === -1) return

        scheme.beads[index] = selectedColorIndex + 1
        setScheme({...scheme})
    };

    const handleColorPick = (result: ColorPickerResult) => {
        switch (result.type) {
            case ColorPickerState.COLOR_DELETE: {
                // удаление
                handleUpdateColors(colors.filter((item, index) => index !== result.id))
                if (selectedColorIndex === result.id) {
                    setSelectedColorIndex(0)
                }

                break
            }
            case ColorPickerState.COLOR_PICKED: {
                if (result.id === -1) {
                    // Новое
                    handleUpdateColors([...colors, {color: result.color}])
                    setSelectedColorIndex(colors.length - 1)
                } else {
                    // Изменение
                    handleUpdateColors(
                        colors.map((item, index) =>
                            index === result.id ? {color: result.color} : item
                        )
                    )
                }

                break
            }
        }
    }

    const handleSchemeImport = (newScheme: CrochetSchemeImportResult) => {
        console.log(newScheme)

        handleUpdateColors([...newScheme.scheme.colors])
        setScheme({
            beads: newScheme.scheme.data,
            settings: newScheme.settings
        })
    }

    return (
        <div>
            <Paper className="crochet-sticky-header" variant="outlined" elevation={0}>

                <Typography variant="h4" sx={{marginRight: 8, flexGrow: '1'}} component="h2">
                    Crochet circle
                </Typography>

                <Stack
                    className="crochet-header-panel"
                    direction="row"
                    spacing={1}
                    component="div"
                >

                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<FileDownload/>}
                        onClick={() => setShowExportDialog(true)}
                    >
                        Экспорт
                    </Button>

                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<UploadFile/>}
                        onClick={() => setShowImportDialog(true)}
                    >
                        Импорт
                    </Button>

                    <div>
                        <Button
                            id="show-color-menu"
                            variant="outlined"
                            endIcon={<FillIcon color={selectedColor.color}/>}
                            disableElevation
                            aria-haspopup="true"
                            aria-controls={showColors ? 'color-menu' : undefined}
                            aria-expanded={showColors ? 'true' : undefined}
                            onClick={event => setColorAnchorEl(event.currentTarget)}
                        >
                            Цвет
                        </Button>

                        <Menu
                            id="color-menu"
                            anchorEl={colorAnchorEl}
                            open={showColors}
                            onClose={() => setColorAnchorEl(null)}
                        >
                            {colors.map((item, index) =>
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        setSelectedColorIndex(index)
                                        setColorAnchorEl(null)
                                    }}
                                >
                                    <ListItemIcon>
                                        <FillIcon color={item.color}/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        {item.color}
                                    </ListItemText>
                                    <Tooltip title="Изменить">
                                        <IconButton
                                            onClick={() => setColorPickerData({id: index, color: item.color})}
                                            sx={{marginLeft: 8}}
                                        >
                                            <Edit/>
                                        </IconButton>
                                    </Tooltip>
                                </MenuItem>
                            )}
                            <Divider sx={{my: 0.5}}/>
                            <MenuItem onClick={() => setColorPickerData({id: -1, color: '#FFFFFF'})}>
                                <ListItemIcon>
                                    <Add/>
                                </ListItemIcon>
                                <ListItemText>
                                    Добавить цвет
                                </ListItemText>
                            </MenuItem>
                        </Menu>
                    </div>

                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button variant="outlined" onClick={() => changeZoom(0.25)}>
                            <ZoomIn/>
                        </Button>
                        <Button
                            id="zoom-select-button"
                            variant="outlined"
                            aria-controls={showZoomList ? 'zoom-select-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={showZoomList ? 'true' : undefined}
                            onClick={event => setZoomAnchorEl(event.currentTarget)}
                        >
                            {Number(canvasZoom * 100)}%
                        </Button>
                        <Button variant="outlined" onClick={() => changeZoom(-0.25)}>
                            <ZoomOut/>
                        </Button>

                        <Menu
                            id="zoom-select-menu"
                            anchorEl={zoomAnchorEl}
                            open={showZoomList}
                            onClose={() => setZoomAnchorEl(null)}
                            MenuListProps={{'aria-labelledby': 'zoom-select-button',}}
                        >
                            {[1, 1.5, 2, 2.5, 3].map((zoom, index) =>
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        setCanvasZoom(zoom)
                                        setZoomAnchorEl(null)
                                    }}
                                >
                                    {zoom * 100}%
                                </MenuItem>
                            )}
                        </Menu>

                    </ButtonGroup>

                    <Button
                        variant="outlined"
                        startIcon={<Settings/>}
                        onClick={() => setShowSettingDialog(true)}
                    >
                        Свойства
                    </Button>

                    <ToggleButtonGroup
                        value={isDebug}
                        exclusive
                        onChange={() => setDebug(!isDebug)}
                        size="small"
                        sx={{height: 36.5}}
                    >
                        <ToggleButton value={true} color="primary">
                            <Tooltip title="Отладка">
                                <BugReport/>
                            </Tooltip>
                        </ToggleButton>
                    </ToggleButtonGroup>

                </Stack>
            </Paper>


            <div ref={containerRef} style={{display: "block", width: "100%", height: "100%"}}>
                <div
                    className="crochet-canvas-container"
                    style={{
                        maxWidth: containerSize.width,
                        maxHeight: containerSize.height === 0 ? "100%" : containerSize.height
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        width={canvasSize * canvasZoom}
                        height={canvasSize * canvasZoom}
                        onClick={(event) => {
                            const canvas = event.target as HTMLElement

                            const {clientX, clientY} = event;
                            const {left, top} = canvas.getBoundingClientRect();

                            const x = clientX - left;
                            const y = clientY - top;

                            handleCanvasClick(x, y);
                        }}
                    />
                </div>
            </div>

            <ColorPickerDialog
                open={showColorPicker}
                selectedValue={colorPickerData}
                onClose={(result) => {
                    if (result != null) handleColorPick(result)
                    setColorPickerData(null)
                }}
            />

            <CrochetCircleSettingsDialog
                open={showSettingDialog}
                config={scheme.settings}
                onClose={result => {
                    if (result != null) {
                        const {parts, radius} = result
                        const size = (parts + parts * radius) / 2 * radius

                        setScheme({
                            beads: resize(scheme.beads, size, 1),
                            settings: result
                        })
                    }
                    setShowSettingDialog(false)
                }}
            />

            <CrochetSchemeImport
                open={showImportDialog}
                onClose={(data) => {
                    if (data != null) {
                        handleSchemeImport(data)
                    }
                    setShowImportDialog(false)
                }}
            />

            <CrochetSchemeExport
                open={showExportDialog}
                colors={colors}
                scheme={scheme}
                onClose={() => setShowExportDialog(false)}
            />

        </div>
    )
}

export default CrochetCirclePage;