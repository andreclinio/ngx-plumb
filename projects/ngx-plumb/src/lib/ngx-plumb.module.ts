import { NgModule } from '@angular/core';
import { NgxPlumbService } from '../public-api';
import { NgxPlumbNodeComponent } from './components/node/ngx-plumb-node.component';
import { NgxPlumbScreenComponent } from './components/screen/ngx-plumb-screen.component';



@NgModule({
  declarations: [
    NgxPlumbNodeComponent,
    NgxPlumbScreenComponent
  ],
  imports: [
  ],
  exports: [
    NgxPlumbNodeComponent,
    NgxPlumbScreenComponent
  ],
  providers: [
    NgxPlumbService
  ]
})
export class NgxPlumbModule { }
