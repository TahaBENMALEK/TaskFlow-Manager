import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component - application entry point.
 * Contains only router outlet for navigation.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent {
  title = 'TaskFlow';
}
