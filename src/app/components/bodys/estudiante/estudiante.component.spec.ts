import { EstudianteComponent } from "./estudiante.component";


describe('Pruebas Estudiante', () => {
    it('Se debe poder agendar una cita', () => {
        let _EstudianteComponent: EstudianteComponent;
        const resp = _EstudianteComponent.agendar();
        expect(typeof resp).toBe('boolean');
    });
});
