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
}
export interface consejero {
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
