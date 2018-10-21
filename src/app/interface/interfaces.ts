export interface estudiante {
    nombre: string;
    apellido: string;
    carrera: string;
    semestre: number;
    check?: boolean;
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
    estudiante: estudiante[];
    remitente: string;
    criticidad: string;
    incidencias: number;
    periodo?: string;
    fecha?: string;
}
export interface usuario {
    id?: string;
    acceso: boolean;
    tipo: string;
    nombreUsuario: string;
    contrasenia: string;
    load: boolean;
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
