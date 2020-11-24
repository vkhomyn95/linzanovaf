import {Component, Input, OnInit} from '@angular/core';
import {CabinetService} from '../../services/cabinet.service';

@Component({
  selector: 'app-tracking-modal',
  templateUrl: './tracking-modal.component.html',
  styleUrls: ['./tracking-modal.component.scss']
})
export class TrackingModalComponent implements OnInit {
  @Input() trackingNumber;
  showModal = false;
  trackingData;

  constructor(private cabinetService: CabinetService) { }

  ngOnInit(): void {
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  trackParcel(): void {
    console.log(this.trackingNumber);
    this.showModal = !this.showModal;
    this.cabinetService.getUserTrackId(this.trackingNumber).subscribe(value => {
      value.data.items.map(data => {
        this.trackingData = data.origin_info.trackinfo;
      });
      console.log(value);
    });
  }
}
