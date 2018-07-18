import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Evento } from './evento.model';
import { EventoPopupService } from './evento-popup.service';
import { EventoService } from './evento.service';
import { Ciudad, CiudadService } from '../ciudad';
import { Categoria, CategoriaService } from '../categoria';
import { Estado, EstadoService } from '../estado';
import { User, UserService } from '../../shared';
import { Tag, TagService } from '../tag';

@Component({
    selector: 'jhi-evento-dialog',
    templateUrl: './evento-dialog.component.html'
})
export class EventoDialogComponent implements OnInit {

    evento: Evento;
    isSaving: boolean;

    ciudads: Ciudad[];

    categorias: Categoria[];

    estados: Estado[];

    users: User[];

    tags: Tag[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private eventoService: EventoService,
        private ciudadService: CiudadService,
        private categoriaService: CategoriaService,
        private estadoService: EstadoService,
        private userService: UserService,
        private tagService: TagService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ciudadService.query()
            .subscribe((res: HttpResponse<Ciudad[]>) => { this.ciudads = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.categoriaService.query()
            .subscribe((res: HttpResponse<Categoria[]>) => { this.categorias = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.estadoService.query()
            .subscribe((res: HttpResponse<Estado[]>) => { this.estados = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tagService.query()
            .subscribe((res: HttpResponse<Tag[]>) => { this.tags = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.evento, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.evento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventoService.update(this.evento));
        } else {
            this.subscribeToSaveResponse(
                this.eventoService.create(this.evento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Evento>>) {
        result.subscribe((res: HttpResponse<Evento>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Evento) {
        this.eventManager.broadcast({ name: 'eventoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCiudadById(index: number, item: Ciudad) {
        return item.id;
    }

    trackCategoriaById(index: number, item: Categoria) {
        return item.id;
    }

    trackEstadoById(index: number, item: Estado) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackTagById(index: number, item: Tag) {
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
    selector: 'jhi-evento-popup',
    template: ''
})
export class EventoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventoPopupService: EventoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventoPopupService
                    .open(EventoDialogComponent as Component, params['id']);
            } else {
                this.eventoPopupService
                    .open(EventoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
