import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ciudad } from './ciudad.model';
import { CiudadService } from './ciudad.service';

@Component({
    selector: 'jhi-ciudad-detail',
    templateUrl: './ciudad-detail.component.html'
})
export class CiudadDetailComponent implements OnInit, OnDestroy {

    ciudad: Ciudad;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ciudadService: CiudadService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCiudads();
    }

    load(id) {
        this.ciudadService.find(id)
            .subscribe((ciudadResponse: HttpResponse<Ciudad>) => {
                this.ciudad = ciudadResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCiudads() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ciudadListModification',
            (response) => this.load(this.ciudad.id)
        );
    }
}
