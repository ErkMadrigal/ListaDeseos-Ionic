import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true; 

  constructor( public deseosService: DeseosService,
                private router: Router, 
                private aletCtrl: AlertController) { }

  ngOnInit() {}

  
  listaSelecionada( lista: Lista ){

    if( this.terminada ){
      this.router.navigateByUrl( `/tabs/tab2/agregar/${ lista.id }` );
    }else{
      this.router.navigateByUrl( `/tabs/tab1/agregar/${ lista.id }` );
    }

  }

  borraLista( lista: Lista ){
    this.deseosService.borarLista(lista);
  }

 
  async editarLista( lista: Lista ){
    const alert = await this.aletCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar Lista',
      inputs: [{
        name:'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'calcel',
        handler: () =>{
          console.log('cancelar');
        }
      },
      {
        text: 'Modificar',
        handler: ( data ) =>{
          console.log(data)
          if( data.titulo.length === 0){
            return;
          }
          lista.titulo = data.titulo
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();

        }
      }]
    });

    await alert.present();
  
}

}
