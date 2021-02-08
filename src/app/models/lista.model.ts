import { ListaItem } from './lista-item.model';


export class Lista{

    id: number;
    titulo: string;
    creadaEn: Date;
    terminadoEn: Date;
    terminado: boolean;
    items: ListaItem[];
    
    constructor( titulo: string ){

        this.titulo = titulo;
        this.creadaEn = new Date();
        this.terminado = false;
        this.items = [];
        this.id = new Date().getTime();

    }

}