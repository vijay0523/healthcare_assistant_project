import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PATIENT_EXPLAINER_1, PATIENT_EXPLAINER_2 } from 'src/app/shared/constants';

@Component({
  selector: 'app-explainer-dashboard',
  templateUrl: './explainer-dashboard.component.html',
  styleUrls: ['./explainer-dashboard.component.css']
})
export class ExplainerDashboardComponent implements OnInit, AfterViewInit {

  PATIENT_EXPLAINER_1 = PATIENT_EXPLAINER_1;
  PATIENT_EXPLAINER_2 = PATIENT_EXPLAINER_2;

  show_explainer_1 = true;
  show_explainer_2 = false;

  constructor() { }

  ngOnInit(): void {
    // var cssLink = document.createElement("link");
    // cssLink.href = "iframe.css"; 
    // cssLink.rel = "stylesheet"; 
    // cssLink.type = "text/css"; 
    // window.frames['iframe1' as any].document.head.appendChild(cssLink);
    // var iframe = document.getElementById('the-iframe') as any;
    //   var style = document.createElement('style');
    //   style.textContent = '.dash-error-menu{'+
    //     'display: none !important;' +
    //   '}';
    //   iframe.contentDocument.head.appendChild(style);
    //   console.log(iframe.contentDocument);
    //   // console.log(iframe.contentDocument.head);
    
  }

  ngAfterViewInit(): void {
    // setInterval(() => {
    //   var iframe = document.getElementById('the-iframe') as HTMLIFrameElement;
    //   var style = document.createElement('style');
    //   style.textContent = '.dash-error-menu{'+
    //     'display: none !important;' +
    //   '}';
    //   // iframe.contentDocument.appendChild(document.createElement('head'))
    //   // iframe.contentDocument.head.appendChild(style);
    //   console.log(iframe);
    //   console.log(iframe.contentDocument);
    //   // console.log(iframe.contentDocument.head);
    // }, 10000);
  }

  switchExplainer(num: number) {
    if(num == 0){
      this.show_explainer_1 = true;
      this.show_explainer_2 = false;
    }
    else if(num == 1){
      this.show_explainer_1 = false;
      this.show_explainer_2 = true;
    }
  }

}
