/* Modelo para trabajar personas
*/

export class Persona{


    constructor(
    
        public nombre: string,
        public tipoDocumento: string,
        public documentoNumero: string,
        public nacionalidad: string,
        public fechaNacimiento?: string,
        public _id?: string,
        public huellas?: string,
        public foto?: string,
        public email?: string

    ){}
    
}