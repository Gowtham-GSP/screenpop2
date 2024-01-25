import { Component } from '@angular/core';
declare global {  interface Window { config: any; }}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ScreenPopCC';
}
