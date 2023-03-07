import Layout from "@/components/Layout";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    DialogContentText,
    Checkbox, FormControlLabel
} from "@mui/material";
import {useForm, SubmitHandler} from "react-hook-form";
import {useState} from "react";

type Inputs = {
    name: string;
    continent: string;
    officialCoin: string;
    isCountryVisitedMultipleTimes: boolean;
    qtyCitiesToVisit: number;
    visitedCities: string;
};

export interface CountryInterface {
    name: string;
    continent: string;
    officialCoin: string;
    isCountryVisitedMultipleTimes: boolean;
    qtyCitiesToVisit: number;
    visitedCities: string[];
}

export default function AdminPanelPage() {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [openCreateInstanceDialog, setOpenCreateInstanceDialog] = useState(false);
    const argentina: CountryInterface = {
        name: "Argentina",
        continent: "America",
        officialCoin: "Peso",
        isCountryVisitedMultipleTimes: true,
        qtyCitiesToVisit: 3,
        visitedCities: ["Buenos Aires", "Cordoba", "Rosario"],
    }
    const ecuador: CountryInterface = {
        name: "Ecuador",
        continent: "America",
        officialCoin: "Dolar",
        isCountryVisitedMultipleTimes: false,
        qtyCitiesToVisit: 1,
        visitedCities: ["Quito"],
    }
    const [countries, setCountries] = useState([argentina, ecuador] as CountryInterface[]);

    function CountriesCards(): JSX.Element[]  {
        const returnCards: JSX.Element[] = [];
        countries.forEach((country: CountryInterface) => {
            returnCards.push(
                <Grid item xs={12} bgcolor={"#f5f5f5"} padding={"1rem"} sx={{
                    borderRadius: "1rem",
                    marginBottom: "1rem",
                }}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <h2>{country.name}</h2>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}>
                            <Button variant={"contained"} color={"secondary"} sx={{
                                marginLeft: "1rem",
                            }}>
                                Editar
                            </Button>
                            <Button variant={"contained"} color={"secondary"} sx={{
                                marginLeft: "1rem",
                            }}>
                                Eliminar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <p>Continente: {country.continent}</p>
                            <p>Moneda oficial: {country.officialCoin}</p>
                            <p>Cantidad de ciudades a visitar: {country.qtyCitiesToVisit}</p>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <p>¿Visitas múltiples?: {country.isCountryVisitedMultipleTimes ? "Si" : "No"}</p>
                            <p>Ciudades visitadas: {country.visitedCities.join(", ")}</p>
                        </Grid>
                    </Grid>
                </Grid>
            )
        })
        return returnCards;
    }


    const handleCancelCreateInstanceDialog = () => {
        setOpenCreateInstanceDialog(false);
    };
    const handleAcceptCreateInstanceDialog: SubmitHandler<Inputs> = data => {
        console.log(data);
        setOpenCreateInstanceDialog(false);
    };
    const handleCreateInstance = () => {
        console.log("Create instance")
        setOpenCreateInstanceDialog(true);
    }

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} bgcolor={"#435d7d"} color={"white"} padding={"1rem"} sx={{
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                }}>
                    <Grid container alignContent={"center"}>
                        <Grid item md={8}>
                            <h1>Manejar XXXXXX</h1>
                        </Grid>
                        <Grid item md={4} sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}>
                            <Button variant={"contained"} color={"secondary"} onClick={handleCreateInstance} sx={{
                                marginLeft: "1rem",
                            }}>
                                Agregar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} bgcolor={"#f5f5f5"} padding={"1rem"}>
                    <Grid container>
                        {CountriesCards()}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={openCreateInstanceDialog}>
                <DialogTitle>Crear una nueva instancia</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Complete los siguientes datos para poder crear una instancia.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre del pais"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register("name", {required: "Este campo es requerido"})}
                    />
                    {errors.name && <span>Este campo es requerido</span>}
                    <TextField
                        margin="dense"
                        id="continent"
                        label="Continente"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register("continent", {required: "Este campo es requerido"})}
                    />
                    {errors.continent && <span>Este campo es requerido</span>}
                    <TextField
                        margin="dense"
                        id="officialCoin"
                        label="Moneda oficial"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register("officialCoin", {required: "Este campo es requerido"})}
                    />
                    {errors.officialCoin && <><span>Este campo es requerido</span><br/></>}
                    <FormControlLabel
                        id={"isCountryVisitedMultipleTimes"}
                        control={<Checkbox defaultChecked/>}
                        label="Ha visitado este pais?"
                        {...register("isCountryVisitedMultipleTimes")}
                    />
                    <TextField
                        margin="dense"
                        id="qtyCitiesToVisit"
                        label="Ciudades que desea visitar"
                        type="number"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            inputProps: {
                                min: 0,
                                max: 100,
                            }
                        }}
                        {...register("qtyCitiesToVisit", {required: "Este campo es requerido"})}
                    />
                    {errors.qtyCitiesToVisit && <span>Este campo es requerido</span>}
                    <DialogContentText>
                        Ha continuacion coloque las ciudades que ha visitado separadas por comas.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="visitedCities"
                        label="Ciudades visitadas"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register("visitedCities",)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelCreateInstanceDialog}>Cancel</Button>
                    <Button onClick={handleSubmit(handleAcceptCreateInstanceDialog)}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    )
}