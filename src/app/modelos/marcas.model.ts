import { Usuario } from './usuario.model';

/* Modelo para trabajar marcas
*/

export class Marca{


    constructor(
    
        public fichero: string,
        public nombre: string,       
        public usuario: Usuario,
        public created: Date,
        public estado: string,
        public tipo: string,
        public _id?: string,

    ){}
    
}