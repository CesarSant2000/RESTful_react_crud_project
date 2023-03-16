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
    Checkbox, FormControlLabel, Select, MenuItem, Typography,
} from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { CityInterface } from '@/interfaces/city'
import { CountryInterface } from '@/interfaces/country'
import axios from 'axios'
import { useRouter } from 'next/router'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import AddIcon from '@mui/icons-material/Add'
import Head from 'next/head'

const URL = 'http://localhost:2708/city'
type Inputs = {
    id: number;
    name: string;
    isSafeCity: boolean;
    lastVisitDate: Date;
    qtyVisits: number;
    placesToVisit: string;
    country?: number;
};

export default function HelloPage() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<Inputs>()
    const [openCreateInstanceDialog, setOpenCreateInstanceDialog] = useState(false)
    const [cities, setCities] = useState([] as CityInterface[])
    const [countries, setCountries] = useState([] as CountryInterface[])
    const [city, setCity] = useState({} as CityInterface)
    const router = useRouter()
    const { countryId } = router.query

    useEffect(
        () => {
            const getCities = async () => {
                const response = await fetch(URL)
                const cities = await response.json()
                const filteredCities = cities.filter((city: CityInterface) => {
                    if (countryId && typeof countryId == 'string' && city.country) {
                        if (typeof city.country != 'number') {
                            return city.country.id == parseInt(countryId)
                        }
                    }
                    return [] as CityInterface[]
                })
                setCities(filteredCities)
            }
            const getCountries = async () => {
                const response = await fetch('http://localhost:2708/country')
                const animes = await response.json()
                setCountries(animes)
            }
            getCities().then().catch()
            getCountries().then().catch()
        },
        [countryId],
    )

    function CityCards(): JSX.Element[] {
        const returnCards: JSX.Element[] = []
        cities.forEach((city: CityInterface) => {
            let cityCountry = {} as CountryInterface
            if (city.country && typeof city.country != 'number') {
                cityCountry = city.country
            }
            returnCards.push(
                <Grid item
                      xs={12}
                      key={'cityKey_' + city.id}
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
                                <h2>{city.name}</h2>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <p style={{ color: '#6F6F6F' }}><strong>Es una ciudad
                                    segura: </strong>{city.isSafeCity ? 'Si' : 'No'}</p>
                                <p style={{ color: '#6F6F6F' }}><strong>Ultima vez que la
                                    visito: </strong>{city.lastVisitDate.toString()}</p>
                                <p style={{ color: '#6F6F6F' }}><strong>Veces que la ha
                                    visitado: </strong>{city.qtyVisits}
                                </p>
                                <p style={{ color: '#6F6F6F' }}><strong>Lugares que ha
                                    visitado: </strong>{city.placesToVisit}</p>
                                <p style={{ color: '#6F6F6F' }}>
                                    <strong>País: </strong>
                                    {cityCountry.name}
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
                                            onClick={() => handleEditInstance(city)}
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
                                            onClick={() => handleDeleteInstance(city.id)}
                                    >
                                        Eliminar
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


    const handleDeleteInstance = (cityId: number) => {
        axios.delete(`${URL}/${cityId}`).then(() => {
            const newCities = cities.filter((city: CityInterface) => city.id !== cityId)
            setCities(newCities)
        }).catch(e => {
            console.log(e)
        })

    }
    const handleCancelCreateInstanceDialog = () => {
        setCity({} as CityInterface)
        setOpenCreateInstanceDialog(false)
    }
    const handleAcceptCreateInstanceDialog: SubmitHandler<Inputs> = data => {

        const newCity: CityInterface = {
            id: data.id,
            name: data.name,
            isSafeCity: data.isSafeCity,
            lastVisitDate: data.lastVisitDate,
            qtyVisits: data.qtyVisits,
            placesToVisit: data.placesToVisit,
            country: data.country,
        }
        axios.post(URL, newCity).then(() => {
            newCity.country = countries.find((country: CountryInterface) => country.id === newCity.country)
            const newCities = cities.concat(newCity)
            setCities(newCities)
            setOpenCreateInstanceDialog(false)
        }).catch(e => {
            console.log(e)
        })

    }
    const handleUpdateCreateInstanceDialog: SubmitHandler<Inputs> = data => {
        console.log(data)
        const newCity: CityInterface = {
            id: city.id,
            name: data.name,
            isSafeCity: data.isSafeCity,
            lastVisitDate: data.lastVisitDate,
            qtyVisits: data.qtyVisits,
            placesToVisit: data.placesToVisit,
            country: data.country,
        }
        axios.put(`${URL}/${city.id}`, newCity).then(() => {
            newCity.country = countries.find((country: CountryInterface) => country.id === newCity.country)
            const newCities = cities.map((city: CityInterface) => {
                if (city.id === newCity.id) {
                    return newCity
                }
                return city
            })
            setCities(newCities)
            setCity({} as CityInterface)
            setOpenCreateInstanceDialog(false)
        }).catch(e => {
            console.log(e)
        })
    }
    const handleCreateInstance = () => {
        console.log('Create instance')
        setOpenCreateInstanceDialog(true)
    }
    const handleEditInstance = (c: CityInterface) => {
        setCity(c)
        setOpenCreateInstanceDialog(true)
    }

    const openDataDialog = (city: CityInterface) => {
        return (
            <Dialog open={openCreateInstanceDialog} key={'dialog_city_' + city?.id}>
                <DialogTitle>Agregar ciudades visitadas</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingrese los siguientes datos para agregar su cuidad visitada
                    </DialogContentText>
                    <TextField
                        margin='dense'
                        id='name'
                        label='Nombre'
                        defaultValue={city?.name}
                        type='text'
                        fullWidth
                        variant='outlined'
                        {...register('name', { required: 'Este campo es requerido' })}
                    />
                    {errors.name && <><span>Este campo es requerido</span><br /></>}
                    <FormControlLabel
                        id={'isSafeCity'}
                        checked={city?.isSafeCity}
                        control={<Checkbox />}
                        label='Es una ciudad segura?'
                        {...register('isSafeCity')}
                    />
                    <TextField
                        margin='dense'
                        id='lastVisitDate'
                        defaultValue={city?.lastVisitDate}
                        type='date'
                        fullWidth
                        variant='outlined'
                        {...register('lastVisitDate', { required: 'Este campo es requerido' })}
                    />
                    {errors.lastVisitDate && <><span>Este campo es requerido</span><br /></>}
                    <TextField
                        margin='dense'
                        id='qtyVisits'
                        label='Cantidad de visitas'
                        defaultValue={city?.qtyVisits}
                        type='number'
                        fullWidth
                        variant='outlined'
                        InputProps={{
                            inputProps: {
                                min: 0,
                                max: 100000000,
                            },
                        }}
                        {...register('qtyVisits', { required: 'Este campo es requerido' })}
                    />
                    {errors.qtyVisits && <span>Este campo es requerido</span>}
                    <TextField
                        margin='dense'
                        id='placesToVisit'
                        label='Lugares que ha visitado'
                        defaultValue={city?.placesToVisit}
                        type='text'
                        fullWidth
                        variant='outlined'
                        InputProps={{
                            inputProps: {
                                min: 0,
                                max: 100000000,
                            },
                        }}
                        {...register('placesToVisit', { required: 'Este campo es requerido' })}
                    />
                    <Select
                        margin='dense'
                        labelId='Country'
                        id='country'
                        label='Pais'
                        defaultValue={() => {
                            if (city.country) {
                                const country: CountryInterface | number = city?.country
                                if (typeof country != 'number') {
                                    return country.id
                                }
                                return ''
                            }
                            return ''
                        }
                        }
                        fullWidth
                        variant='outlined'
                        {...register('country', { required: 'Este campo es requerido' })}>
                        {countries.map((country: CountryInterface) => {
                            return <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                        })}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelCreateInstanceDialog}>Cancelar</Button>
                    {city.id ? <Button onClick={handleSubmit(handleUpdateCreateInstanceDialog)}
                                       disabled={!isValid}>Actualizar</Button> :
                        <Button onClick={handleSubmit(handleAcceptCreateInstanceDialog)}
                                disabled={!isValid}>Crear</Button>}
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <>
            <Head>
                <title>ONU - Ciudades Visitadas</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout>
                <>
                    <Grid container>
                        <Grid item xs={12} bgcolor={'#435d7d'} color={'white'} padding={'1rem'} sx={{
                            borderTopLeftRadius: '1rem',
                            borderTopRightRadius: '1rem',
                        }}>
                            <Grid container alignContent={'center'}>
                                <Grid item md={2} sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}>
                                    <Button variant={'contained'}
                                            onClick={router.back}
                                            sx={{
                                                marginLeft: '1rem',
                                                backgroundColor: '#6679a2',
                                            }}
                                    >
                                        <ArrowBackIosNewIcon />
                                        <Typography variant={'button'}
                                                    marginLeft={'10px'}
                                                    alignContent={'center'}
                                                    display={'flex'}
                                        >
                                            Regresar
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item md={8} textAlign={'center'}>
                                    <h1>ONU - Ciudades visitadas</h1>
                                </Grid>
                                <Grid item md={2} sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}>
                                    <Button variant={'contained'}
                                            onClick={handleCreateInstance}
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
                                {CityCards()}
                            </Grid>
                        </Grid>
                    </Grid>
                    {openDataDialog(city)}
                </>
            </Layout>
        </>
    )
}