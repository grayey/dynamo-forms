import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LazyLoadScriptService } from '../../../../../services/lazy-load-scripts.service';

declare const $:any;

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit, AfterViewInit {

  constructor(private lazy:LazyLoadScriptService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit():void {
    const DATATABLE_SCRIPTS:string[] = [
      "jQueryDataTable.js",
      "bootstrapDataTable.js",
      "dataTableButtons.js",
      "dataTableBootstrapButtons.js",
      "jZip.js",
      "pdfMake.js",
      "pdfMakeVfs.js",
      "html5Buttons.js",
      "printButtons.js",
      "colVis.js",
      "dataTableResponsive.js",
      "boostrap4Responsive.js",
      "dataTableInit.js", // remove this
    ];

    $(document).ready(()=>{
        this.lazy.loadScripts('app-dashboard-sidebar',DATATABLE_SCRIPTS, true).then((loaded)=>{
          console.log({loaded})
        }).catch((failed)=>{
          console.log({ failed })
        })
    })
  }

}
