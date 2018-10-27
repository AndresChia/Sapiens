export interface estudiante {
    id: string;
    nombre: string;
    apellido: string;
    carrera: string;
    semestre: number;
    check?: boolean;
    facultad: string;
}
export interface clase {
    nombre: string;
    numeroEstudiantes: string;
    numero: string;
    check?: boolean;
}
export interface consejero {
    id?: string;
    nombre: string;
    cargo: string;
    areasInteres: string;
    correo: string;
    horario: string[];
}
export interface datoBusqueda {
    nombreAsignatura: string,
    parametro: string,
    menor: number,
    mayor: number
}
export interface alerta {
    nombreAlerta: string;
    criticidad: string;
    id: string;
    remitente?: string;
    incidencias?: number;
    periodo?: string;
    fecha?: string;
    descripcion?: string;
    temporalidad?: string;
    estudiante?: estudiante[];

}
export interface usuario {
    acceso: boolean;
    tipo: string;
    nombreUsuario: string;
    contrasenia: string;
    load: boolean;
    check?: boolean;
}
export interface persona {

    id: number;
    nombre: string;
    apellido: string;
    identificacion: string;
    tipoIdentificacion: string;
    genero: string;
    direccion: string;
    correo: string;
    telefono: string;
    rol: string;
    check?: boolean;

}
export interface anotacion {
    responsable: string;
    anotacion: string;
    alerta: string;
    fecha: string;

}

export interface datosAcademicos {
    semestre: string;
    creditosAprobados: string;
    creditosRetirados: string;
    promedio: string;

}

export interface alertaSemestre {
    fecha: string;
    semestre: string;
    alerta: string;
    creador: string;
}

export interface director {
    id: string;
    facultad: string;
}
