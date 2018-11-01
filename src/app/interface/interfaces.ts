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
    src_imagen?: string;
}
export interface datoBusqueda {
    nombreAsignatura: string,
    parametro: string,
    menor: number,
    mayor: number,
    id: string,
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
    tipo?: string;

}
export interface usuario {
    acceso: boolean;
    tipo: string;
    nombreUsuario: string;
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

export interface rol {
    check: boolean,
    rolNombre: string,
}

export interface historialUsr {
    nombreEstudiante: string,
    idEstudiante: string,
    nombreAlerta: string,
    origen: string,
    estado: string,
    fecha: string,
}

export interface datosDemograficos {
    id: string;
    genero: string;
    nacimiento: string;
    estado_civil: string;
    pais: string;
    ciudad: string;
    grupo_etnico: string;
    descripcion_etnica: string;
    pricipal: string;
    tipo_discapacidad: string;
    descripcion_discapacidad: string;
}

export interface asignatura {
    id: string;
    nombre: string;
}

export interface alertasIA {

    nombreAlerta: string;
    criticidad: string;
    Estudiante: estudianteIA[];
}

export interface estudianteIA {
    id: string;
    nombreEstudiante: string;
    edad: number;
    apellido: string;
    genero: string;
    Puntaje_Lectura_Critica: number;
    Puntaje_Matematica: number;
    promedio_ponderado: number;
    Calif_Global: number;
}
