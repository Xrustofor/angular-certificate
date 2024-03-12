import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-certificate',
  standalone: true,
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.scss',
  imports: [CommonModule],
})
export class CertificateComponent {
  name: string = ''

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement
    if(!target.files) return;
    this.name = target.files[0].name;
  }
}
