import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  loading$: Observable<boolean>;
  private subscription: Subscription;

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {
    this.loading$ = this.dataService.loadingSubject$.asObservable();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.subscription = this.loading$.subscribe({
      next: (show) => {
        if (!show) {
          this.spinner.hide();
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
