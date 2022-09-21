import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { ReturnStatement } from '@angular/compiler';
import { BreakPointService } from '@core/services/break-point/break-point.service';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule,RouterModule,MaterialModule],
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {
  breakpoints=Breakpoints
  constructor(private router:Router,public breakpointService:BreakPointService) {
    console.warn(router.url)
  }

  isSelected(index:number):boolean{
   switch(this.router.url){
      case '/home/twit-feed': 
        return 1 == index;
      case '/home/search': 
        return 2 == index;
      case '/home/notification': 
        return 3 == index;
      case '/home/profile': 
        return 4 == index;
      case '/home/network': 
        return 5 == index;
      default:
        return 1 == index;
    }
  }

  ngOnInit(): void {
  }

}
