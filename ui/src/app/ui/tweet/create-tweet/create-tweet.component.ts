import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-tweet',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss']
})
export class CreateTweetComponent implements OnInit , AfterViewInit{
  constructor(private renderer:Renderer2) { }
  observer:Observable<any>
  @ViewChild('text') text : ElementRef
  @ViewChild('divtext') divtext : ElementRef
  ngOnInit(): void {
  }
  ngAfterViewInit(){
   console.warn(this.text.nativeElement.value)
  }
  sabit=""

  change(){
    let txt:string = this.text.nativeElement.value
    let htm=""
    let hash=false;
    for(let i =0;i<txt.length;i++){
      let c=txt[i];
       if(c == '#'){
        if(i==txt.length-1)
        htm+=`<p class="tag">${c}</p>`
        else
        htm+=`<p class="tag">${c}`
        hash = true;
      }
      else if(hash && c == ' '){
        htm+=`</p>${c}`
        hash=false
      }
      else{
        htm+=c;
      }
      this.sabit=htm
    }
  }

}
