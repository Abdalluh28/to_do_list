import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function TooltipButton({ children, title, onClick = () => { } }) {
    return (
        <Tooltip
            title={title}
            placement='top'
            slotProps={{
                popper: {
                    sx: {
                        [`& .${tooltipClasses.tooltip}`]: {
                            fontSize: '0.9rem',
                            padding: '6px 10px',
                        },
                        [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
                            marginTop: '0px',
                        },
                        [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
                            marginBottom: '0px',
                        },
                        [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
                            marginLeft: '0px',
                        },
                        [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
                            marginRight: '0px',
                        },
                    },
                },
            }}
        >
            <IconButton onClick={() => onClick?.()}>{children}</IconButton>
        </Tooltip>
    );
}
