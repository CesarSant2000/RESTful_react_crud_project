import Layout from '@/components/Layout'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    DialogContentText,
    Checkbox, FormControlLabel, Typography,
} from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { CountryInterface } from '@/interfaces/country'
import axios from 'axios'
import { useRouter } from 'next/router'
import AddIcon from '@mui/icons-material/Add'
import Image from 'next/image'
import Head from 'next/head'

const URL = 'http://localhost:2708/country'

type Inputs = {
    name: string;
    continent: string;
    officialCoin: string;
    isCountryVisitedMultipleTimes: boolean;
    qtyCitiesToVisit: number;
};


export default function AdminPanelPage() {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<Inputs>()
    const [openCreateInstanceDialog, setOpenCreateInstanceDialog] = useState(false)
    const [country, setCountry] = useState({} as CountryInterface)
    const [countries, setCountries] = useState([] as CountryInterface[])
    const router = useRouter()

    useEffect(
        () => {
            const getCountries = async () => {
                const response = await fetch(URL)
                const countries = await response.json()
                setCountries(countries)
            }
            getCountries().then().catch()
        }, [],
    )


    function handleDeleteCountry(countryId: number) {
        axios.delete(`${URL}/${countryId}`).then(() => {
            const newCountries = countries.filter((country: CountryInterface) => country.id !== countryId)
            setCountries(newCountries)
        }).catch(e => {
            console.log(e)
        })
    }

    function handleUpdateCountry(country: CountryInterface) {
        console.log('param', country)
        setCountry(country)
        console.log('state', country)
        setOpenCreateInstanceDialog(true)
        reset({
            name: country?.name,
            continent: country?.continent,
            officialCoin: country?.officialCoin,
            isCountryVisitedMultipleTimes: country?.isCountryVisitedMultipleTimes,
            qtyCitiesToVisit: country?.qtyCitiesToVisit,
        })
    }

    const handleCancelCreateCountry = () => {
        reset({
            name: '',
            continent: '',
            officialCoin: '',
            isCountryVisitedMultipleTimes: false,
            qtyCitiesToVisit: 0,
        })
        setCountry({} as CountryInterface)
        setOpenCreateInstanceDialog(false)
    }

    const handleAcceptCreateCountry: SubmitHandler<Inputs> = data => {
        const newCountry: CountryInterface = {
            id: countries.length + 1,
            name: data.name,
            continent: data.continent,
            officialCoin: data.officialCoin,
            isCountryVisitedMultipleTimes: data.isCountryVisitedMultipleTimes,
            qtyCitiesToVisit: data.qtyCitiesToVisit,
        }
        axios.post(URL, newCountry).then(r => {
            const newCountries = [...countries, r.data]
            setCountries(newCountries)
            setOpenCreateInstanceDialog(false)
            console.log('newCountries', newCountries)
        }).catch(e => {
            console.log(e)
        })
    }

    const handleAcceptUpdateCountry: SubmitHandler<Inputs> = data => {
        const newCountry: CountryInterface = {
            id: country.id,
            name: data.name,
            continent: data.continent,
            officialCoin: data.officialCoin,
            isCountryVisitedMultipleTimes: data.isCountryVisitedMultipleTimes,
            qtyCitiesToVisit: data.qtyCitiesToVisit,
        }
        axios.put(`${URL}/${country.id}`, newCountry).then(r => {
            const newCountries = countries.map((country: CountryInterface) => {
                if (country.id === r.data.id) {
                    return r.data
                }
                return country
            })
            setCountries(newCountries)
            setOpenCreateInstanceDialog(false)
        }).catch(e => {
            console.log(e)
        })
    }

    const handleCreateCountry = () => {
        setOpenCreateInstanceDialog(true)
    }

    function CountriesCards(): JSX.Element[] {
        const returnCards: JSX.Element[] = []
        countries.forEach((country: CountryInterface) => {
            returnCards.push(
                <Grid item
                      xs={12}
                      key={'Grid_item_country_' + country.id}
                      bgcolor={'#e8e8e8'}
                      padding={'1rem'}
                      sx={{
                          borderRadius: '1rem',
                          marginBottom: '1rem',
                      }}
                >
                    <Grid container>
                        <Grid item xs={12} md={9}>
                            <Grid item xs={12} md={12}>
                                <h2>{country.name}</h2>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <p style={{ color: '#6F6F6F' }}>
                                    <strong>Continente: </strong>{country.continent}
                                </p>
                                <p style={{ color: '#6F6F6F' }}>
                                    <strong>Moneda oficial: </strong>{country.officialCoin}
                                </p>
                                <p style={{ color: '#6F6F6F' }}>
                                    <strong>Cantidad de ciudades a visitar: </strong>{country.qtyCitiesToVisit}
                                </p>
                                <p style={{ color: '#6F6F6F' }}>
                                    <strong>¿Visitas
                                        múltiples?: </strong>{country.isCountryVisitedMultipleTimes ? 'Si' : 'No'}
                                </p>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Grid container spacing={'10px'} paddingRight={'1rem'}>
                                <Grid item xs={12} md={12}>
                                    <Button variant={'contained'}
                                            fullWidth
                                            sx={{
                                                marginLeft: '1rem',
                                                backgroundColor: 'rgba(238,208,109,0.79)',
                                            }}
                                            onClick={() => handleUpdateCountry(country)}
                                    >
                                        Editar
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button variant={'contained'}
                                            fullWidth
                                            sx={{
                                                marginLeft: '1rem',
                                                backgroundColor: 'rgba(244,67,54,0.78)',
                                            }}
                                            onClick={() => handleDeleteCountry(country.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button variant={'contained'}
                                            fullWidth
                                            sx={{
                                                marginLeft: '1rem',
                                                backgroundColor: 'rgba(76,175,80,0.73)',
                                            }}
                                            onClick={() => {
                                                router.push({
                                                    pathname: 'admin/cities',
                                                    query: { countryId: country.id },
                                                }).then().catch()
                                            }
                                            }
                                    >
                                        Ciudades visitadas
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>,
            )
        })
        return returnCards
    }

    const renderedDataDialog = () => {
        return (
            <Dialog open={openCreateInstanceDialog}>
                <DialogTitle>Crear una nueva instancia</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Complete los siguientes datos para poder crear una instancia.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Nombre del pais'
                        defaultValue={country?.name}
                        type='text'
                        fullWidth
                        variant='outlined'
                        {...register('name', { required: 'Este campo es requerido' })}
                    />
                    {errors.name && <span>Este campo es requerido</span>}
                    <TextField
                        margin='dense'
                        id='continent'
                        label='Continente'
                        defaultValue={country?.continent}
                        type='text'
                        fullWidth
                        variant='outlined'
                        {...register('continent', { required: 'Este campo es requerido' })}
                    />
                    {errors.continent && <span>Este campo es requerido</span>}
                    <TextField
                        margin='dense'
                        id='officialCoin'
                        label='Moneda oficial'
                        defaultValue={country?.officialCoin}
                        type='text'
                        fullWidth
                        variant='outlined'
                        {...register('officialCoin', { required: 'Este campo es requerido' })}
                    />
                    {errors.officialCoin && <><span>Este campo es requerido</span><br /></>}
                    <FormControlLabel
                        id={'isCountryVisitedMultipleTimes'}
                        control={<Checkbox defaultChecked />}
                        defaultChecked={country?.isCountryVisitedMultipleTimes}
                        label='Ha visitado este pais?'
                        {...register('isCountryVisitedMultipleTimes')}
                    />
                    <TextField
                        margin='dense'
                        id='qtyCitiesToVisit'
                        label='Ciudades que desea visitar'
                        defaultValue={country?.qtyCitiesToVisit}
                        type='number'
                        fullWidth
                        variant='outlined'
                        InputProps={{
                            inputProps: {
                                min: 0,
                                max: 100,
                            },
                        }}
                        {...register('qtyCitiesToVisit', { required: 'Este campo es requerido' })}
                    />
                    {errors.qtyCitiesToVisit && <span>Este campo es requerido</span>}
                </DialogContent>
                <DialogActions>
                    <Button type={'reset'} onClick={() => handleCancelCreateCountry()}>Cancel</Button>
                    {country?.name ?
                        <Button onClick={handleSubmit(handleAcceptUpdateCountry)}
                                disabled={!isValid}>Actualizar</Button>
                        : <Button onClick={handleSubmit(handleAcceptCreateCountry)} disabled={!isValid}>Crear</Button>
                    }
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <>
            <Head>
                <title>ONU - Registro del viajero</title>
                <meta name='description' content='Registro del viajero con NextJS'/>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <Layout>
                <>
                    <Grid container>
                        <Grid item xs={12} bgcolor={'#435d7d'} color={'white'} padding={'1rem'} sx={{
                            borderTopLeftRadius: '1rem',
                            borderTopRightRadius: '1rem',
                        }}>
                            <Grid container alignContent={'center'}>
                                <Grid item md={2} textAlign={'center'} alignContent={'center'} alignItems={'center'}>
                                    <Image src={'https://img.icons8.com/color/512/united-nations.png'}
                                           alt={'ONU'}
                                           width={40}
                                           height={40}
                                           style={{
                                               filter: 'brightness(10)',
                                           }}
                                    />
                                </Grid>
                                <Grid item md={8} textAlign={'center'}>
                                    <h1>ONU - Registro del viajero</h1>
                                </Grid>
                                <Grid item md={2} sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}>
                                    <Button variant={'contained'}
                                            onClick={handleCreateCountry}
                                            sx={{
                                                marginLeft: '1rem',
                                                backgroundColor: '#669ca2',
                                            }}
                                    >
                                        <Typography variant={'button'}
                                                    marginRight={'10px'}
                                                    alignContent={'center'}
                                                    display={'flex'}
                                        >
                                            Agregar
                                        </Typography>
                                        <AddIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} bgcolor={'#f5f5f5'} padding={'1rem'}>
                            <Grid container>
                                {CountriesCards()}
                            </Grid>
                        </Grid>
                    </Grid>
                    {renderedDataDialog()}
                </>
            </Layout>
        </>
    )
}