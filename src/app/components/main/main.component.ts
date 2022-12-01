import { Component } from '@angular/core';
import { NewPostComponent } from '../new-post/new-post.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  modalRef: MdbModalRef<NewPostComponent> | null = null;
  constructor(private modalService: MdbModalService) {}

  openModal() {
    this.modalRef = this.modalService.open(NewPostComponent);
  }
}
