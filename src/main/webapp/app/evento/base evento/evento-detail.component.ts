import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Evento } from './evento.model';
import { EventoService } from './evento.service';

@Component({
    selector: 'jhi-evento-detail',
    templateUrl: './evento-detail.component.html'
})
export class EventoDetailComponent implements OnInit, OnDestroy {

    evento: Evento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eventoService: EventoService,
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
        this.eventoService.find(id)
            .subscribe((eventoResponse: HttpResponse<Evento>) => {
                this.evento = eventoResponse.body;
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
            'eventoListModification',
            (response) => this.load(this.evento.id)
        );
    }
}
