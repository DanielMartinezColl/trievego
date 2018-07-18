import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Genero } from './genero.model';
import { GeneroPopupService } from './genero-popup.service';
import { GeneroService } from './genero.service';

@Component({
    selector: 'jhi-genero-dialog',
    templateUrl: './genero-dialog.component.html'
})
export class GeneroDialogComponent implements OnInit {

    genero: Genero;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private generoService: GeneroService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.genero.id !== undefined) {
            this.subscribeToSaveResponse(
                this.generoService.update(this.genero));
        } else {
            this.subscribeToSaveResponse(
                this.generoService.create(this.genero));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Genero>>) {
        result.subscribe((res: HttpResponse<Genero>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Genero) {
        this.eventManager.broadcast({ name: 'generoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-genero-popup',
    template: ''
})
export class GeneroPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private generoPopupService: GeneroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.generoPopupService
                    .open(GeneroDialogComponent as Component, params['id']);
            } else {
                this.generoPopupService
                    .open(GeneroDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
