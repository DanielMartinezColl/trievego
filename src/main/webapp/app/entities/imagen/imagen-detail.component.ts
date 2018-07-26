import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Imagen } from './imagen.model';
import { ImagenService } from './imagen.service';

@Component({
    selector: 'jhi-imagen-detail',
    templateUrl: './imagen-detail.component.html'
})
export class ImagenDetailComponent implements OnInit, OnDestroy {

    imagen: Imagen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private imagenService: ImagenService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInImagens();
    }

    load(id) {
        this.imagenService.find(id)
            .subscribe((imagenResponse: HttpResponse<Imagen>) => {
                this.imagen = imagenResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInImagens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'imagenListModification',
            (response) => this.load(this.imagen.id)
        );
    }
}
