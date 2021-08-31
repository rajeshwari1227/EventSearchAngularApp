import { Component, OnInit } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { HttpService } from '../http.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatFormField} from '@angular/material/form-field'
import {MatTabsModule} from '@angular/material/tabs';
import {ViewEncapsulation} from '@angular/core';
import {Directive, Input,} from '@angular/core';
import { flatten } from '@angular/compiler';
import { not } from '@angular/compiler/src/output/output_ast';
import { FormGroup } from '@angular/forms';
import { trigger, transition, animate, style,state } from '@angular/animations'
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';

import {MatTooltipModule} from '@angular/material/tooltip';




// import { AgmCoreModule } from '@agm/core';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  animations:[
   trigger('flyIn', [
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(1000)
    ]),
    transition('* => void', [
      animate(1000, style({transform: 'translateX(100%)'}))
    ])
  ]),
  trigger('flyOut', [
    transition('* => void', [
      style({transform: 'translateX(-100%)'}),
      animate(1000)
    ]),
    transition('* => void', [
      animate(1000, style({transform: 'translateX(100%)'}))
    ])
  ])
],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit , AfterViewInit{

  //  flyIn = trigger('flyIn', [
  //   //enterTransition,
  //   state("in", style({ transform: "translateY(0)" })),
  //   transition(':enter', [
  //     style({ transform: "translateY(100%)" }),
  //     animate(1000)
  //   ]), 
  //   transition(":enter", [
  //     animate(100, style({ transform: "translateX(100%)" }))
  //   ])
  // ]);



  details_disabled = true
  set_anim = true
  set_anim_detail = false
  map: any
  cat_init:string=''
  unit_init:string=''
  event = 'lakers'
  buttondisabled = true
  locdisabled : boolean = true
  loc : any
  data_ip : any
  params :any
  geoloc:any
  spotify = [] as any
  loc_type = 'here'
  choice = 'here'
  choice_ng = 'here'
  location : any
  event_list :any
  event_lis_flag =false
  event_details : any
  progress = false
  search_bbtndis = true
  loc_bbtndis = true
  eventFetched = false
  data_arr =[] as any
  seat_map : any
  venue_details : any
  venue_flag = false
  no_rec =false
  event_req = false
  keys_artist:any
  twitter_url = ''
  fav_type = 'star_border'
  results_tab = true
  fav_tab = false
  favorites : any
  favorites_array = [] as any
  event_class_list : any
  event_fav :any
  result_tab = true
  isspotify=false
  error_flag = false
  
  lat = 0.0
  lng = 0.0;
  lis  = false



  // @ViewChild('this') name!: ElementRef;


  ngAfterViewInit(){
    // console.log("view child",this.name?.nativeElement)
    
  }

  change_class_result(e:any){
    console.log(this.favorites_array)
    e.preventDefault();

    if(document.getElementById("favorites")?.classList.contains("btn-primary")){
      document.getElementById("result")?.classList.add("btn-primary")
      document.getElementById("result")?.classList.remove("btn-link")
      document.getElementById("favorites")?.classList.add("btn-link")
      document.getElementById("favorites")?.classList.remove("btn-primary")

      this.result_tab = true
      this.fav_tab = false

    


    }

  }

  toggleDiv(){
    this.event_lis_flag = this.event_lis_flag? false : true
    this.eventFetched = this.eventFetched? false : true
  }


  change_class_fav(e:any){
    e.preventDefault();

    if(document.getElementById("result")?.classList.contains("btn-primary")){
      document.getElementById("result")?.classList.remove("btn-primary")
      document.getElementById("result")?.classList.add("btn-link")
      document.getElementById("favorites")?.classList.remove("btn-link")
      document.getElementById("favorites")?.classList.add("btn-primary")
      this.result_tab = false
      this.fav_tab = true


    


    }

  }
  


  getDummy(){
    console.log(this.search_bbtndis && this.loc_bbtndis && this.buttondisabled)
    return (!this.search_bbtndis && !this.buttondisabled &&(!this.loc_bbtndis || this.loc_type=='here'))
  }


  active = 0;

  onTabChange(e:any) {
    console.log(e)
  }

  getspotify(event:any){
    this.service.getSpotifyDetails(event).subscribe((response)=>{
      // this.result_key = response
      this.isspotify = true
      this.spotify.push(response)
      console.log('this is result from spotify : ',response)
    }, (error)=>{
        console.log('error is spotify' , error)
        

    });

  }


  result_key : any
  categories= ['All','Music','Sports','Arts & Theatre','Film','Miscellaneous']
  constructor(private http : HttpClient, private service:HttpService)  { 

    this.cat_init = this.categories[0]
    this.unit_init = 'miles'
    this.buttondisabled = false
    this.loc = 'here'
    // this.initMap()
  }
  apiUrl = "https://ipinfo.io/?token=9757a1b00ae013";
  GeoapiUrl = "https://ipinfo.io/?token=9757a1b00ae013";


  auto_key :any

getfavoselecetd(eve:any) {        
  var res :any
  for (var i=0;i<this.favorites_array.length;i++){

    if (this.favorites_array[i][4] == eve){
      res = true
      break;
    }
    console.log("resssssssss",res)

  }
  return res


  }

  getlocationval(item:any){
    if (item.target.value!=''){
    this.loc_bbtndis = false;
    }else{
      this.loc_bbtndis = true;

    }

    

  }



  getAll(){
    console.log("hello")
    console.log(this.http.get(this.apiUrl))
    this.http.get(this.apiUrl).subscribe((res)=>{
      this.data_ip = res
      console.log(this.data_ip['loc'])
      // this.buttondisabled = false
    })
  }

  del_storage(event:any){

    localStorage.removeItem(event.target.id)
    var stored_items = JSON.parse (localStorage.getItem('storedEvents')||'')
    stored_items.forEach((element:any,index:any)=>{
      if(element==event.target.id) stored_items.splice(index,1);
   });
   localStorage.removeItem('storedEvents')
   localStorage.setItem('storedEvents',JSON.stringify(stored_items))
   for(var i =0;i<this.favorites_array.length;i++){
     if( event.target.id == this.favorites_array[i][4]){
      this.favorites_array.splice(i,1);
     }
   }
  }
  

  set_local_storage(event:any){
    this.favorites_array =[]
    console.log('event target id',event.target.classList)
    var class_list = event.target.classList
    if(document.getElementById(event.target.id)?.classList.contains('star')){
      console.log("star",event.target.id)
      console.log(this.event_list[event.target.id])
      this.fav_type = "grade"
      document.getElementById(event.target.id)?.classList.remove("star")
      document.getElementById(event.target.id)?.classList.add("grade")
      console.log(localStorage.getItem('storedEvents'))
      if(localStorage.getItem('storedEvents')==null && localStorage.getItem('storedEvents')==null){
        localStorage.setItem('storedEvents',JSON.stringify([this.event_list[event.target.id][4]]))
        localStorage.setItem(this.event_list[event.target.id][4], JSON.stringify(this.event_list[event.target.id]))


      }else{
        
        var stored_events = JSON.parse(localStorage.getItem('storedEvents') || '')
        console.log(stored_events)
        if(this.event_list[event.target.id][4] in stored_events){
        
        }else{
          stored_events.push(this.event_list[event.target.id][4])
          localStorage.setItem(this.event_list[event.target.id][4], JSON.stringify(this.event_list[event.target.id]))

        }
        localStorage.removeItem('storedEvents')
        localStorage.setItem('storedEvents',JSON.stringify(stored_events))

        console.log('after added',stored_events)

        
      }
      //     // localStorage.setItem(this.event_list[event.target.id][4], JSON.stringify(this.event_list[event.target.id]))



    }else{
      this.fav_type = "star_border"
      console.log(this.event_list[event.target.id][4])
      localStorage.removeItem(this.event_list[event.target.id][4])
      var stored_items = JSON.parse (localStorage.getItem('storedEvents')||'')
      stored_items.forEach((element:any,index:any)=>{
        if(element==this.event_list[event.target.id][4]) stored_items.splice(index,1);
     });
     localStorage.removeItem('storedEvents')
     localStorage.setItem('storedEvents',JSON.stringify(stored_items))
     console.log('after removed',stored_items)



      document.getElementById(event.target.id)?.classList.remove("grade")
      document.getElementById(event.target.id)?.classList.add("star")
      console.log(localStorage.getItem(this.event_list[event.target.id][4]))

      // document.getElementById(event.target.id)?.style.background='transparent'


    }

    this.favorites = JSON.parse(localStorage.getItem('storedEvents')||'')
    this.favorites.forEach((element:any,index:any)=>{
      this.favorites_array.push(JSON.parse(localStorage.getItem(element) || ''))
   });
   console.log(this.favorites_array)
    // localStorage.setItem("lastname", "Smith");



  }


  getObjectlen(){
    return Object.keys(this.favorites_array).length == 0
  }
    getresultstab(){

    console.log("list")
    this.eventFetched = false
    this.event_lis_flag = true
  }



  get_params_status(i:any){
    var key = this.spotify
    return(key[i].name !=''||key[i].popularity!=''||key[i].followers!=''||key[i].check!='')
  }
  getval(item:any){
    if (item.target.value!=''){
    this.search_bbtndis = false;
    }else{
      this.search_bbtndis = true;

    }
    this.auto_key = item.target.value;
    this.getDataFromApi(this.auto_key)
    console.log(this.result_key)
    

  }

  getseatMap(seatmap:any){
    this.seat_map = seatmap.target.id
    console.log(seatmap.target.id)

  }
  getEventDetails(event:any){
    console.log("event_id: ",event.target.id)

    
    var id  = event.target.id
    this.set_anim=false
    this.eventFetched = true
    this.data_arr =[] 


    this.spotify=[]
    
    this.service.geteventdeatils(id).subscribe((response)=>{
      this.details_disabled = false

      this.event_details = response
      this.event_lis_flag = false

      this.eventFetched = true
      this.event_req = true
      this.data_arr.push(this.event_details)

      console.log("data_array" ,this.data_arr)


      // for (const [key, value] of response.entries()) {
        console.log(response);
      // }
       this.event_class_list = document.getElementById(event.target.id)?.classList
       console.log("event details:",event.target.class)

      // for
      this.event_fav = this.event_class_list[this.event_class_list.length -2]
      console.log("event favorites",this.event_fav)
      
      
      this.getVenueDetails(this.event_details['venue_id'])
      this.keys_artist = (this.event_details.artist)
      this.twitter_url = "https://twitter.com/intent/tweet?text= Check out "+this.event_details['name']+" located at "+this.event_details['venue']+". &hashtags=CSCI571EventSearch"

      // console.log(keys.split(","))
      for (var i = 0;i< this.keys_artist.length;i++){
        this.getspotify(this.keys_artist[i])
      }


      
      console.log('this is result from next  : ',this.spotify)
    }, (error)=>{
        console.log('error is' , error)
        this.event_req = false
        

    });
    console.log("print venue deatisl :",event.target.classList)


    
  }
  clearForm(){
    // return (!this.search_bbtndis && !this.buttondisabled &&(!this.loc_bbtndis || this.loc_type=='here'))
    this.search_bbtndis = true
    this.loc_bbtndis=true
    this.locdisabled=true
    this.event_lis_flag = false
    this.eventFetched = false
    this.error_flag=false
    this.no_rec = false
    if(document.getElementById("favorites")?.classList.contains("btn-primary")){
      document.getElementById("result")?.classList.add("btn-primary")
      document.getElementById("result")?.classList.remove("btn-link")
      document.getElementById("favorites")?.classList.add("btn-link")
      document.getElementById("favorites")?.classList.remove("btn-primary")

      this.result_tab = true
      this.fav_tab = false

    


    }
    

  }

  

  getEventlist(formval:any){
    // if(localStorage.getItem('storedEvents')!= null){
    // this.favorites_array = JSON.parse(localStorage.getItem('storedEvents') || '')
    // }




    this.progress = true
    this.result_tab = true
    this.fav_tab = false
    this.eventFetched = false
    this.error_flag = false
    document.getElementById("result")?.classList.add("btn-primary")
    document.getElementById("result")?.classList.remove("btn-link")
    document.getElementById("favorites")?.classList.add("btn-link")
    document.getElementById("favorites")?.classList.remove("btn-primary")

    console.log(formval)

    formval['loctype'] = this.loc_type
    formval['here'] = this.data_ip['loc']
    this.event_lis_flag =false

    console.log("loctype",this.loc_type)
    console.log("this is formval" ,formval)
    if(formval.keyword!='' &&((this.loc_type == 'location' && this.locdisabled==false) || this.loc_type =='here')){
    this.service.geteventlist(formval).subscribe((response)=>{
      this.progress = false
      console.log('in onsisde',response)
      if(response == false){
        this.event_lis_flag =false
        this.no_rec = true

        console.log(response)
      }else{
        console.log(' no error')
      this.event_list = response
      this.no_rec=false
      
      this.event_lis_flag =true
      
      }
      

      
      console.log('this is result from next  : ',this.event_list)
    
    }, (error)=>{
      this.progress = false
      this.no_rec = false
      this.error_flag = true

        console.log('error is' , error)
        

    });
  }

  }

  getDataFromApi(req:any){
    console.log("api call")
    this.service.sendGetRequest(req).subscribe((response)=>{
      this.result_key = response
      console.log('this is result : ',this.result_key)
    }, (error)=>{
        console.log('error is' , error)
        

    });
      
  }




  changeloc(comp:any){
    this.loc_type = comp.target.value;

    if(this.loc_type == 'here'){

      this.locdisabled =true
    }
    else{
      // this.location = (<HTMLInputElement>document.getElementById('location')).value
      this.locdisabled =false

      
    }


    console.log(this.location)



  }

 



  getVenueDetails(venue:any){
    this.service.venueDetails(venue).subscribe((response)=>{
      this.venue_details = response

      // for (const [key, value] of response.entries()) {
        console.log("venue" ,this.venue_details);
        this.lng = parseFloat(this.venue_details[0]['lng'])
        this.lat = parseFloat(this.venue_details[0]['lat'])
        console.log("lat long ",this.lat,this.lng)

      // }
      // console.log("event details:",this.event_details)

      
      console.log('this is result from next  : ',this.venue_details)
    }, (error)=>{
        console.log('error is' , error)
        

    });



  }


  
  
  ngOnInit(): void {
    this.getAll()
    if(localStorage.removeItem('storedEvents')!=null){
    localStorage.removeItem('storedEvents')
    }
    

    
  console.log('its in')
  }




  // https://eng-empire-315722.wl.r.appspot.com/eventlists?here=%2234.0030,-118.2863%22&category=%22All%22&distance=%2210%22&keyword=%22la%22&loctype=%22here%22&units=%22miles%22&location=%22%22
}
