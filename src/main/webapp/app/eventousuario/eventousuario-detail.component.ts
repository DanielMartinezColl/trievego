import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Evento } from './eventousuario.model';
import { EventousuarioService } from './eventousuario.service';

@Component({
    selector: 'jhi-eventousuario-detail',
    templateUrl: './eventousuario-detail.component.html'
})
export class EventousuarioDetailComponent implements OnInit, OnDestroy {

    evento: Evento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eventousuarioService: EventousuarioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEventos();
    }

    load(id) {
        this.eventousuarioService.find(id)
            .subscribe((eventousuarioResponse: HttpResponse<Evento>) => {
                this.evento = eventousuarioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEventos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eventousuarioListModification',
            (response) => this.load(this.evento.id)
        );
    }
}
