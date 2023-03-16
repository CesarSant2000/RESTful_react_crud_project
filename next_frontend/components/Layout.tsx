

'use client';
import {ReactNode} from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

/**
 * This is the layout component that contains the common elements of the pages.
 * @function
 */
export default function Layout({children}: { children: ReactNode }) {
    return (
        <main>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{
                    height: '100%',
                    minHeight: '100vh',
                    maxHeight: '?',
                }}>
                    <CssBaseline/>
                    <Grid
                        item
                        xs={false}
                        sm={1}
                        md={2}
                        sx={{
                            backgroundColor: 'transparent',
                        }}
                    >
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={10}
                        md={8}
                        sx={{
                            backgroundColor: 'white',
                            padding: '1rem',
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '1rem',
                        }}
                    >
                        {children}
                    </Grid>
                    <Grid
                        item
                        xs={false}
                        sm={1}
                        md={2}
                        sx={{
                            backgroundColor: 'transparent',
                        }}
                    >
                    </Grid>
                </Grid>
            </ThemeProvider>
        </main>
    )
}
