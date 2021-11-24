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
      'Authorization': 'Bearer BQBjpwIn2gBHhFJqsqinAHEOrqxO0UWokLrx0fklMV7PKnVVfYb0Gk2Zg9ez8YTpiP0vNFRwYz20zOQSy5YNosdcxBHcUxLChA3oPnDwI-6RJ-tuEX0C70hwy19ldHF-wtcE4Sg6BF7JJ5ggD33qEyolJjJSMXQ'
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
