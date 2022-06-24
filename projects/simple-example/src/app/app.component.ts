import { Component } from '@angular/core';
import { NgxPlumbService } from 'projects/ngx-plumb/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-example';

  constructor(private ngxPlumbService: NgxPlumbService){}

  ngOnInit() : void {
  }
}
