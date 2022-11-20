import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import ContentBox from 'components/common/ContentBox';
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
    Edit,
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
    SchemeColor, SchemeData
} from "types/crochet-types";
import {
    resize
} from "utils/utils"
import './CrochetCirclePage.css';


const CrochetCirclePage = () => {
    const [isDebug, setDebug] = useState(false)

    const [canvasZoom, setCanvasZoom] = useState(2);
    const [zoomAnchorEl, setZoomAnchorEl] = useState<null | HTMLElement>(null);
    const showZoomList = Boolean(zoomAnchorEl);

    const [canvasSize, setCanvasSize] = useState(1000)
    const canvasRef = useRef(null);

    const changeZoom = (delta: number) => {
        let newZoom = canvasZoom + delta;
        if (newZoom < 0.25) newZoom = 0.25
        if (newZoom > 10.0) newZoom = 10.0
        setCanvasZoom(newZoom)
    };

    const [schemeSettings, setSchemeSettings] = useState<SchemeSettings>({parts: 7, radius: 10});
    const [showSettingDialog, setShowSettingDialog] = useState(false);

    const [showImport, setShowImport] = useState(false)

    const [scheme, setScheme] = useState({'beats': Array<number>()});

    const [colorAnchorEl, setColorAnchorEl] = useState<null | HTMLElement>(null);
    const showColors = Boolean(colorAnchorEl);

    const [colorPickerData, setColorPickerData] = useState<null | ColorPickerRequest>(null);
    const showColorPicker = Boolean(colorPickerData);

    const [colors, setColors] = useState(Array<SchemeColor>({color: '#FFFFFF'}));
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const selectedColor = colors[selectedColorIndex];

    useEffect(() => {
        setCanvasSize(schemeSettings.radius * 2 * 20)
    }, [schemeSettings])

    useEffect(() => {
        let w = canvasSize * canvasZoom;
        let h = canvasSize * canvasZoom;

        const canvas = canvasRef.current
        // @ts-ignore
        const context: CanvasRenderingContext2D = canvas.getContext('2d')

        let cw = w / 2;
        let ch = h / 2;

        context.clearRect(0, 0, w, h);

        context.fillStyle = '#000000';
        context.fillRect(cw - 5, ch - 5, 10, 10);

        context.fillStyle = '#FFA500';

        const scale = canvasZoom

        const {parts, radius} = schemeSettings;

        let startClins = parts;
        let beatSize = 10
        let size = beatSize * scale;
        let spacing = beatSize * 1.5 * scale;
        let angleOffset = -90;

        let prevParts = 0
        for (let r = 0; r < radius; r++) {
            let clins = startClins * (r + 1);

            // фоновые окружности
            let rr = r * spacing + size + size / 2
            // console.log(rr)


            context.beginPath();
            context.fillStyle = "#000000"
            context.ellipse(
                cw,
                ch,
                rr,
                rr,
                0,
                0,
                2 * Math.PI,
                false
            );
            context.stroke();

            for (let i = 0; i < clins; i++) {
                let angle = (360 / clins) * i + angleOffset;

                let colorId = scheme.beats.at(i + prevParts) ?? 0;

                /*
                if (i % (r + 1) === 0) {
                    context.fillStyle = '#FFA500';
                } else {
                    context.fillStyle = '#FFFFFF';
                }
                 */

                context.fillStyle = colors[colorId].color

                angle = angle * Math.PI / 180;


                let x = cw + Math.cos(angle) * spacing * (r + 1) - size / 2;
                let y = ch + Math.sin(angle) * spacing * (r + 1) - size / 2;

                context.beginPath();
                context.ellipse(
                    x + size / 2,
                    y + size / 2,
                    size / 1.5,
                    size / 2,
                    angle,
                    0,
                    2 * Math.PI,
                    false);
                context.fill();
                context.stroke();

                /*
                context.beginPath();
                context.fillStyle = "#000000"
                context.ellipse(
                    x + size / 2,
                    y + size / 2,
                    1,
                    1,
                    0,
                    0,
                    2 * Math.PI,
                    false
                );
                context.fill();
                context.stroke();
                 */

                if (isDebug) {
                    context.fillStyle = "#000000"
                    // context.fillText(Math.round(angle * 180 / Math.PI + 90).toString(), x + size / 3, y + size / 2);
                    context.fillText((i + prevParts).toString(), x + size / 3, y + size / 2);
                }

                // context.fillRect(x, y, size, size)
            }

            prevParts += clins
        }

    }, [canvasSize, colors, canvasZoom, scheme, schemeSettings, isDebug]);

    const handleCanvasClick = (x: number, y: number) => {

        console.log(scheme)

        const center = (canvasSize * canvasZoom) / 2;
        const r = Math.sqrt(Math.pow(x - center, 2) + Math.pow(y - center, 2))

        console.log(`Size: ${canvasSize * canvasZoom}; Center: ${center}; Radius: ${r}`)


        let scale = canvasZoom
        let beatSize = 10
        let size = beatSize * scale;
        let spacing = beatSize * 1.5 * scale;

        console.log(`Scale: ${scale}; Size: ${size}; Spacing: ${spacing}`)

        let level = -1
        let dist = schemeSettings.radius * spacing

        for (let i = 0; i < schemeSettings.radius; i++) {
            const currentDist = Math.abs((i + 1) * spacing - r)
            if (currentDist < dist && currentDist < size / 1.5) {
                dist = currentDist
                level = i
            }
        }

        if (level === -1) return

        let smallBeat = 360 / ((level + 1) * schemeSettings.parts)

        console.log(`Level: ${level}; Level angle: ${smallBeat}`)

        /*
        let clins = level * schemeSettings.parts
        for (let i = 0; i < clins; i++) {
            let angle = (360 / clins) * i;
            console.log(angle)
        }
         */

        let angle = Math.atan((y - center) / (x - center)) * 180 / Math.PI + 90
        if (x - center < 0) angle += 180

        let order = Math.round(angle / smallBeat)
        if (order === (level + 1) * schemeSettings.parts) {
            order = 0
        }

        let index = (schemeSettings.parts + level * schemeSettings.parts) / 2 * level + order
        console.log(`Angle: ${angle}; Order: ${order}; Index: ${index}`)

        scheme.beats[index] = selectedColorIndex
        setScheme({beats: scheme.beats})

    };

    const handleColorPick = (result: ColorPickerResult) => {
        switch (result.type) {
            case ColorPickerState.COLOR_DELETE: {
                // удаление
                if (colors.length === 1) return

                setColors(colors.filter((item, index) => index !== result.id))

                if (selectedColorIndex === result.id) {
                    setSelectedColorIndex(0)
                }

                break
            }
            case ColorPickerState.COLOR_PICKED: {
                if (result.id === -1) {
                    // Новое
                    setColors([...colors, {color: result.color}])
                } else {
                    // Изменение
                    setColors(
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

        setColors([{color: "#ffffff"}, ...newScheme.scheme.colors])
        setScheme({"beats": newScheme.scheme.data})
        setSchemeSettings(newScheme.settings)
    }

    return (
        <div>
            <Paper className="crochet-sticky-header" elevation={1}>
                <Typography variant="h4" sx={{marginRight: 8, flexGrow: '1'}}>
                    Crochet circle
                </Typography>

                <Stack className="crochet-header-panel" direction="row" spacing={1}>

                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<UploadFile/>}
                        onClick={() => setShowImport(true)}
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
                            <BugReport/>
                        </ToggleButton>
                    </ToggleButtonGroup>

                </Stack>
            </Paper>


            <ContentBox>
                <div>
                    <div className="crochet-canvas-container">
                        <canvas
                            ref={canvasRef}
                            width={canvasSize * canvasZoom}
                            height={canvasSize * canvasZoom}
                            onClick={(event) => {
                                const canvas = event.target as HTMLCanvasElement

                                handleCanvasClick(
                                    event.pageX - canvas.offsetLeft,
                                    event.pageY - canvas.offsetTop
                                );
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
                    config={schemeSettings}
                    onClose={result => {
                        if (result != null) {
                            const {parts, radius} = schemeSettings
                            setSchemeSettings(result)

                            const size = (parts + parts * radius) / 2 * radius
                            setScheme({'beats': resize(scheme.beats, size, 0)})
                        }
                        setShowSettingDialog(false)
                    }}
                />

                <CrochetSchemeImport
                    open={showImport}
                    onClose={(data) => {
                        if (data != null) {
                            handleSchemeImport(data)
                        }
                        setShowImport(false)
                    }}
                />

            </ContentBox>
        </div>
    )
}

export default CrochetCirclePage;