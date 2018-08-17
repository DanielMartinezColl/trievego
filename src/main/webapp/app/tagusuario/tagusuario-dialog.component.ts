import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tag } from './tagusuario.model';
import { TagusuarioPopupService } from './tagusuario-popup.service';
import { TagusuarioService } from './tagusuario.service';
import { Usuario, UsuarioService } from '../entities/usuario';
import { Evento, EventoService } from '../entities/evento';

@Component({
    selector: 'jhi-tagusuario-dialog',
    templateUrl: './tagusuario-dialog.component.html'
})
export class TagusuarioDialogComponent implements OnInit {

    tagusuario: Tag;
    isSaving: boolean;

    usuarios: Usuario[];

    eventos: Evento[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tagusuarioService: TagusuarioService,
        private usuarioService: UsuarioService,
        private eventoService: EventoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.query()
            .subscribe((res: HttpResponse<Usuario[]>) => { this.usuarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.eventoService.query()
            .subscribe((res: HttpResponse<Evento[]>) => { this.eventos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tagusuario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tagusuarioService.update(this.tagusuario));
        } else {
            this.subscribeToSaveResponse(
                this.tagusuarioService.create(this.tagusuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Tag>>) {
        result.subscribe((res: HttpResponse<Tag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Tag) {
        this.eventManager.broadcast({ name: 'tagusuarioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUsuarioById(index: number, item: Usuario) {
        return item.id;
    }

    trackEventoById(index: number, item: Evento) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-tagusuario-popup',
    template: ''
})
export class TagusuarioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagusuarioPopupService: TagusuarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tagusuarioPopupService
                    .open(TagusuarioDialogComponent as Component, params['id']);
            } else {
                this.tagusuarioPopupService
                    .open(TagusuarioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
