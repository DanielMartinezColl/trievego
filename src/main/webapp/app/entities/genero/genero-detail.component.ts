import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Genero } from './genero.model';
import { GeneroService } from './genero.service';

@Component({
    selector: 'jhi-genero-detail',
    templateUrl: './genero-detail.component.html'
})
export class GeneroDetailComponent implements OnInit, OnDestroy {

    genero: Genero;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private generoService: GeneroService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGeneros();
    }

    load(id) {
        this.generoService.find(id)
            .subscribe((generoResponse: HttpResponse<Genero>) => {
                this.genero = generoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGeneros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'generoListModification',
            (response) => this.load(this.genero.id)
        );
    }
}
