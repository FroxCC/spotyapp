// import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { withLatestFrom } from 'rxjs/operators';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent{

  // paises: any[] = [];

  // constructor( private  http: HttpClient ) { 

  //   console.log("constructor home hecho.")
  //   this.http.get('https://restcountries.com/v3.1/lang/spa').subscribe( (resp:any) =>{
  //     this.paises = resp
  //     console.log(resp);
  //   })

  // }

    nuevasCanciones: any[]=[];
    loading: boolean;
    error: boolean;
    mensajeError: string | undefined;


    constructor(private spotify: SpotifyService) { 

      this.error = false;

      this.loading = true;

      this.spotify.getNewReleases().subscribe( (data:any) => {
        this.nuevasCanciones = data;
        this.loading = false;
      }, (errorServicio)=>{
        this.loading = false;
        this.error = true;
        console.log(errorServicio);
        this.mensajeError = errorServicio.error.error.message;
        
      });
  }
}
