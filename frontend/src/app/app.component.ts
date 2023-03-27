import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'imageupload';
  
  form:any;
  datas:any;
  id = 0;
  constructor(public api : ApiService){}
  
  ngOnInit(): void {
    this.load();

  }

  load(){

    this.api.get("image/").subscribe((result:any)=>{
      // console.log(result);
      if(result.status == "success")
      this.datas = result.data
      
    })

    this.form = new FormGroup({
      name : new FormControl("", Validators.required),
      image : new FormControl(""),
    })
  }

  reset(){
    this.load();
  }

  // write function to convert image into base64 string format
  imageChanged(event:any){
    // console.log(event.target);
    let file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = ()=>{
      if(reader.result != null){
        // console.log(reader.result.toString())
        
        this.form.patchValue({
          image : reader.result.toString().split(",").pop() 
          })
      }
    } 
  }

  edit(id:any){
    // console.log(id);
    this.id = id;
    this.api.get("image/"+ id).subscribe((result:any)=>{
      // console.log(result.data);
      this.form.patchValue({
        name : result.data.name,
        image : result.data.picpath
      })
      
    })
    
  }

  save(data:any){
   if(this.id == 0){
    if(data.image == ""){
      alert("Please select image");
      return;
    }
    this.api.post("image", data).subscribe((result:any)=>{     
      if(result.status == "success"){
        this.load();
      }
      else{
        alert("Something went wrong")
      } 
    })
   }
   else{
    this.api.put("image/"+ this.id, data).subscribe((result:any)=>{
      // console.log(result);          
      if(result.status == "success"){
        this.load();
      } 
      else{
        alert("Something went wrong")
      } 
    })
   }
    
  }

  delete(id:any){
    // console.log(id);
    if(confirm()){
      this.api.delete("image/" + id).subscribe((result:any)=>{
        // console.log(result);          
        if(result.status == "success"){
          this.load();
        } 
        else{
          alert("Something went wrong")
        } 
      })
      
    }
    
  }
}
