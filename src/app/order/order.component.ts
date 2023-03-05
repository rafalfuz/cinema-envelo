import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-order',
  template: `
    <section class="order"><router-outlet></router-outlet></section>
    <style>
      .order {
        width: 80%;
        margin: 30px auto;
        padding: 20px;
        min-height: 80vh;
      }
    </style>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
})
export class OrderComponent {}
