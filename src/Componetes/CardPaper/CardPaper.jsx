import React from 'react';
import { EstilosCard } from './EstilosCard';
import { Grid, Paper, Typography, Button, IconButton, CircularProgress, setRef } from "@material-ui/core"
import "moment/locale/es"
import moment from 'moment'
import Chip from '@material-ui/core/Chip';
import Basurero from '@material-ui/icons/Delete';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CorazonLleno from "../../imagen/iconos/arbolLleno.png"
import Corazon from "../../imagen/iconos/arbolVacio.png"
import BotonMenu from "../Tarjeta/BotonMenu"


const CardPaper = ({ valor, usuario, buscarChips, megustaSinValidarUsuario, funcionCorazon, setlistapaper, borrar }) => {
    const clases = EstilosCard();
    return (
        <Paper key={valor.id} className={clases.caja} elevation={3}>
            <Grid container className={clases.contenedor}>
                <Grid xs={12} sm={12} md={9}>
                    <Grid container>
                        <Grid xs={12} sm={12} md={4}>
                            <div>
                                {valor.imagen == null ? (
                                    <div className={clases.divFoto}>
                                        <AddAPhotoIcon className={clases.imgFoto} />
                                    </div>
                                ) : (
                                    <div
                                        className={clases.divImagen}
                                        style={{
                                            backgroundImage: `url(${valor.imagen})`,
                                        }}
                                    />
                                )}
                            </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={8}>
                            <div className={clases.divTexto}>
                                <Typography variant="h5" className={clases.titulo}>
                                    {valor.info == true ? (
                                        <a style={{ textDecoration: "none" }} href={`/information/${valor.id}`}>
                                            {valor.titulo}
                                        </a>
                                    ) : (
                                        valor.titulo
                                    )}
                                </Typography>
                                <Typography className={clases.fecha} variant="subtitle2">
                                    {moment(new Date(valor.subida.seconds * 1000)).format("D MMM YYYY")}
                                </Typography>
                                <Typography variant="body2" className={clases.resumen}>
                                    {valor.resumen}
                                </Typography>
                            </div>
                            <Typography variant="subtitle1">
                                {valor.etiquetas.map((valor) => (
                                    <Chip
                                        variant="outlined"
                                        className={clases.margenChip}
                                        onClick={() => buscarChips(valor)}
                                        color="primary"
                                        size="small"
                                        label={valor.descripcion}
                                    />
                                ))}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} sm={12} md={2}>
                 <div className={clases.divBotones}>
                    <div className={clases.cajaMeGusta}>
                        <Typography  className={clases.centrarComponente} variant="subtitle1">
                            <Button
                                onClick={() => megustaSinValidarUsuario(valor)}
                                className={clases.botonLikes}
                                startIcon={
                                    funcionCorazon(valor) ? (
                                        <>
                                            <img height="25" src={CorazonLleno} alt="Corazon lleno" />
                                        </>
                                    ) : (
                                        <>
                                            <img height="25" src={Corazon} alt="Corazon vacío" />
                                        </>
                                    )
                                }
                            >
                                {valor.likes}
                            </Button>
                            <Typography  align='start' className={clases.textUpVote} variant="subtitle2">
                                es util
                            </Typography>
                        </Typography>
                    </div>
                    <div className={clases.botonPdf}>
                        <Typography className={clases.centrarComponente} variant="subtitle1">
                            <a
                                href={valor.pdf == null ? valor.link : valor.pdf}
                                style={{ textDecoration: "none" }}
                                target="_blank"
                            >
                                <Button className="botoneditar" variant="contained">
                                    Acceder
                                </Button>
                            </a>
                        </Typography>
                    </div>
                    </div>
                    {usuario == null ? (
                        <div></div>
                    ) : (
                        usuario.administrador ? (
                            <div className={clases.diveditarborrar}>
                                <Grid container>
                                    <Grid xs={6}>
                                        <Typography variant="subtitle1" align="center">
                                            <BotonMenu setlistapaper={setlistapaper} id={valor.id}></BotonMenu>
                                        </Typography>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Typography variant="subtitle1" align="center">
                                            <IconButton variant="contained" color="primary" onClick={() => borrar(valor)}>
                                                <Basurero></Basurero>
                                            </IconButton>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        ) : (
                            <div></div>
                        )
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CardPaper;
