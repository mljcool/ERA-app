import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssistanceService } from 'src/app/modals/assistance/assistance.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.page.html',
    styleUrls: ['./preview.page.scss']
})
export class PreviewPage implements OnInit, OnDestroy {
    private unsubscribeAll: Subject<any>;
    mapSetup = {
        latitude: 7.0540778,
        longitude: 125.5731837,
        message: `I'm Here`,
        iconUrl: {
            url: `assets/images/commons/blue-moving-car.gif`,
            scaledSize: { height: 80, width: 110 }
        }
    };

    constructor(private assistanceService: AssistanceService) {
        this.unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this.assistanceService.onRoadSideAssistanceData
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(response => {
                console.log(response);
            });
    }

    clickedMarker(m: any): void {}

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
    getCurrentPosition(): void {}
}
