import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tag } from './tags.model';
import { TagsPopupService } from './tags-popup.service';
import { TagsService } from './tags.service';
import { Usuario, UsuarioService } from '../entities/usuario';
import { Evento, EventoService } from '../entities/evento';

@Component({
    selector: 'jhi-tags-dialog',
    templateUrl: './tags-dialog.component.html'
})
export class TagsDialogComponent implements OnInit {

    tags: Tag;
    isSaving: boolean;

    usuarios: Usuario[];

    eventos: Evento[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tagsService: TagsService,
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
        if (this.tags.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tagsService.update(this.tags));
        } else {
            this.subscribeToSaveResponse(
                this.tagsService.create(this.tags));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Tag>>) {
        result.subscribe((res: HttpResponse<Tag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Tag) {
        this.eventManager.broadcast({ name: 'tagsListModification', content: 'OK'});
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
    selector: 'jhi-tags-popup',
    template: ''
})
export class TagsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagsPopupService: TagsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tagsPopupService
                    .open(TagsDialogComponent as Component, params['id']);
            } else {
                this.tagsPopupService
                    .open(TagsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
