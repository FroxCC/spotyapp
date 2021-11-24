import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) { }

  getQuery( query:string ){
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBy9yWkL5l3lG72WJT2EEMXP4cjZZub6boYhq68k47XNb4yawdgL1rnYa3gWPskepsXkyR_NpwpcUwVYAn2eEZ9a-bn6cVoidpEO3GAo5W_7Rvm5kHWI0FhwTg3_LzkzgCH3uYHwj41xpczGMSG5fFu3wDJBD8'
    })

    return this.http.get(url, {headers})
  }

  getNewReleases(){

    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map( (data:any) => data.albums.items));
  }


  getArtistas( termino:string){

    return this.getQuery(`search?q=${ termino }&type=artist&limit=20`)
      .pipe(map((data:any) => data.artists.items));
  }

  getArtista( id:string){

    return this.getQuery(`artists/${id}`);
      //.pipe(map((data:any) => data.artists.items));
  }

  getTopTracks( id:string){

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map((data:any) => data['tracks']));
  }

}
