import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

    /**
   *
   * @param path
   * this method reroutes.
   * Serves the purpose of routerLink
   */
  public reRoute = (path:string):void =>{
    this.router.navigateByUrl(path);
  }


}
