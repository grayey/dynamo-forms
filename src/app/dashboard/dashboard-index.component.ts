import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from '../../services/lazy-load-scripts.service';

declare const $:any;

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css']
})
export default class DashboardIndexComponent implements OnInit, AfterViewInit {

  constructor(private lazy:LazyLoadScriptService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit():void {
    const DASHBOARD_SCRIPTS:string[] = [
      "metisMenu.js",
      "simplebar.js",
      "waves.js",
      "morris.js",
      "raphael.js",
      "dashboardInit.js",
      "appMain.js"
    ];

    $(document).ready(()=>{
        this.lazy.loadScripts('app-dashboard-index',DASHBOARD_SCRIPTS, true).then((loaded)=>{
          console.log({loaded})
        }).catch((failed)=>{
          console.log({ failed })
        })
    })
  }


}
