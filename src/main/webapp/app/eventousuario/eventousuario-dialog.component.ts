import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Evento } from './eventousuario.model';
import { EventousuarioPopupService } from './eventousuario-popup.service';
import { EventousuarioService } from './eventousuario.service';
import { Ciudad, CiudadService } from '../entities/ciudad';
import { Categoria, CategoriaService } from '../entities/categoria';
import { Usuario, UsuarioService } from '../entities/usuario';
import { Tag, TagService } from '../entities/tag';

@Component({
    selector: 'jhi-eventousuario-dialog',
    templateUrl: './eventousuario-dialog.component.html'
})
export class EventousuarioDialogComponent implements OnInit {

    eventousuario: Evento;
    isSaving: boolean;

    ciudads: Ciudad[];

    categorias: Categoria[];

    usuarios: Usuario[];

    tags: Tag[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventousuarioService: EventousuarioService,
        private ciudadService: CiudadService,
        private categoriaService: CategoriaService,
        private usuarioService: UsuarioService,
        private tagService: TagService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ciudadService.query()
            .subscribe((res: HttpResponse<Ciudad[]>) => { this.ciudads = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.categoriaService.query()
            .subscribe((res: HttpResponse<Categoria[]>) => { this.categorias = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.usuarioService.query()
            .subscribe((res: HttpResponse<Usuario[]>) => { this.usuarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tagService.query()
            .subscribe((res: HttpResponse<Tag[]>) => { this.tags = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.eventousuario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventousuarioService.update(this.eventousuario));
        } else {
            this.subscribeToSaveResponse(
                this.eventousuarioService.create(this.eventousuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Evento>>) {
        result.subscribe((res: HttpResponse<Evento>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Evento) {
        this.eventManager.broadcast({ name: 'eventousuarioListModification', content: 'OK'});
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

    trackUsuarioById(index: number, item: Usuario) {
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
    selector: 'jhi-eventousuario-popup',
    template: ''
})
export class EventousuarioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventousuarioPopupService: EventousuarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventousuarioPopupService
                    .open(EventousuarioDialogComponent as Component, params['id']);
            } else {
                this.eventousuarioPopupService
                    .open(EventousuarioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
