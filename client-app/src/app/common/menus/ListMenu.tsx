import * as React from 'react';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Props {
    children?: React.ReactNode;
    dots?: boolean;
    label?: string;
}

export default function ListMenu({ children, dots, label }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                {dots && <MoreVertIcon />}
                {label}
            </Button>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {children}
            </Menu>
        </div>
    );
}