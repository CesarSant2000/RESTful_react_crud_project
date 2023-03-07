import Head from 'next/head'
import {Box, Button, Grid} from "@mui/material";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    const handleClick = () => {
        router.push('/admin_panel')
    }
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Grid container
                      justifyContent={"center"}
                      alignItems={"center"}
                        paddingY={"10rem"}
                >
                    <Box
                        m={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button variant="contained" color="primary" sx={{height: 40}} onClick={handleClick}>
                            Ingresar al sistema
                        </Button>
                    </Box>
                </Grid>
            </main>
        </>
    )
}
