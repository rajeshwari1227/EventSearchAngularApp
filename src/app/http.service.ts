import { Injectable } from '@angular/core';
import { HttpParams,HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://ipinfo.io/?token=9757a1b00ae013";
  constructor(private http: HttpClient) { }

  sendGetRequest(req:any) {

    let params = new HttpParams();
    params = params.append('var1', req);
    // return this.http.get('/api/people/');

    console.log(req)


    return this.http.get('https://eng-empire-315722.wl.r.appspot.com/autocomplete/', {params:params})

  }


  venueDetails(req:any) {

    let params = new HttpParams();
    console.log("venue req",req)
    params = params.append('venue', req);
    // return this.http.get('/api/people/');

    console.log(req)


    return this.http.get('https://eng-empire-315722.wl.r.appspot.com//venueDetails/', {params:params})

  }

  geteventlist(req:any) {

    console.log("hello print me",req)
    let params = new HttpParams();
    params = req
    console.log("evenlist params",req)


    return this.http.get('https://eng-empire-315722.wl.r.appspot.com//eventlists/', {params:params})

  }

  geteventdeatils(req:any) {

    // console.log("hello print me",req)
    let params = new HttpParams();
    params = params.append('event',req)



    return this.http.get('https://eng-empire-315722.wl.r.appspot.com//eventDetails/', {params:params})

  }

  getSpotifyDetails(key:any){

    let params = new HttpParams();
    params = params.append('key',key)



    return this.http.get('https://eng-empire-315722.wl.r.appspot.com//spotify/', {params:params})

  }

}
