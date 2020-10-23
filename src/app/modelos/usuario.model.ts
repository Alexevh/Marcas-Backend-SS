/* Modelo para trabajar usuarios */

export class Usuario{


    constructor(
    
        public nombre: string,
        public uid: string,
        public password: string,
        public rol: string,
        public mision: string,
        public _id: string,
        public token: string,
        public foto: string,
        public email: string

    ){}
    
}