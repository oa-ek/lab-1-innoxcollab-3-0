import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import { useStore } from '../../stores/store';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Search from './Search';


export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <MenuItem component={NavLink} to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                ml: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            InnoXCollab
                        </Typography>
                    </MenuItem>

                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        <Button component={NavLink} to="/events"
                            sx={{ my: 2, color: 'white' }}
                        >
                            Events
                        </Button>
                        {
                            user && (
                                <Stack direction="row" >
                                    <Button component={Link} to="/createEvent"
                                        sx={{ ml: 2, my: 2, color: 'white' }}
                                    >
                                        Create Event
                                    </Button>
                                    <Button component={NavLink} to="/admin/manageProfiles"
                                        sx={{ ml: 2, my: 2, color: 'white' }}
                                    >
                                        Manage Users
                                    </Button>
                                    <Button component={NavLink} to="/admin/manageTags"
                                        sx={{ ml: 2, my: 2, color: 'white' }}
                                    >
                                        Manage Tags
                                    </Button>
                                </Stack>
                            )
                        }
                    </Box>
                    <Stack direction="row" spacing={3}>
                        <Search />
                        {
                            user ?
                                (
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip title="Open settings">
                                            <Box
                                                onClick={handleOpenUserMenu}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    cursor: "pointer"
                                                }}>
                                                <IconButton sx={{ p: 0 }}>
                                                    <Avatar alt="Remy Sharp" src={user?.image} />
                                                </IconButton>
                                                <Typography>{user?.displayName}</Typography>
                                            </Box>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            <MenuItem component={Link} to={`/profile/${user?.userName}`} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">My Account</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={logout}>
                                                <Typography textAlign="center">Logout</Typography>

                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                ) : (
                                    <Stack direction="row" spacing={1}>
                                        <Button color="inherit" component={Link} to="/login">Login</Button>
                                        <Button color="inherit" component={Link} to="/register">Register</Button>
                                    </Stack>
                                )
                        }
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
})