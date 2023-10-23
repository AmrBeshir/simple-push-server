import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/user';
import { InputAdornment } from '@mui/material';
import { sendNotification } from '../api/notification';

export default function Home() {

    const navigate = useNavigate()

    React.useEffect(() => {
        if (!localStorage.getItem("id"))
            navigate("/", { replace: true })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title');
        const body = data.get('body');
        const actionUrl = data.get('action_url');
        if (!title || !body) {
            alert('Please Input Title and Body')
            // return;
        }
        sendNotification(title, body, actionUrl)
    };

    return (
        <Container component='main' maxWidth="100%">
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    width: '100%'
                }}
            >
                <Button
                    variant='outlined'
                    size='large'
                    onClick={logout}
                >
                    Logout
                </Button>
            </Box>
            <Container component="sub" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Send a Notification
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="title"
                            label="Notification Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="body"
                            label="Notification Body"
                            name="body"
                            autoComplete="body"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="action_url"
                            label="Navigation Url"
                            name="action_url"
                            autoComplete="action_url"
                            autoFocus
                            InputProps={{
                                startAdornment: <InputAdornment position='start' >https://www.</InputAdornment>
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color='secondary'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Container>
    )
}