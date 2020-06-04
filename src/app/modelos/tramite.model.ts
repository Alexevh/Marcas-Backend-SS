import { Persona } from './persona.model';
import { Documento } from './documento.model';
/* Modelo para trabajar tramites
*/

export class Tramite{


    constructor(
    
        public tipoTramite: string,
        public estado: string,
        public fecha_inicio?: Date,
        public agenda?: string,
        public _id?: string,
        public persona?: Persona,
        public foto?: string,
        public email?: string,
        public documentos?: Documento[]

    ){}
    
}