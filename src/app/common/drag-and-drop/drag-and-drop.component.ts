import { Target } from '@angular/compiler';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrl: './drag-and-drop.component.scss'
})
export class  DragAndDropComponent {

  @Output() onDrop = new EventEmitter<Blob>()

  onFileChange(event: Event): void{
    const target = event.target as HTMLInputElement;
    if(!target.files) return;
    const file = target.files[0] as Blob;
    this.setDrop(file)
  }

  dropHandler(event: DragEvent): void {
    if(!event.dataTransfer) return;
    const file = event.dataTransfer.files[0];
    this.setDrop(file)
    event.preventDefault();
  }

  setDrop(file: Blob){
    this.onDrop.emit(file)
  }

  dragoverHandler(event: DragEvent): void{
    event.preventDefault();
  }
}
