import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Imagen } from './imagen.model';
import { ImagenPopupService } from './imagen-popup.service';
import { ImagenService } from './imagen.service';

@Component({
    selector: 'jhi-imagen-delete-dialog',
    templateUrl: './imagen-delete-dialog.component.html'
})
export class ImagenDeleteDialogComponent {

    imagen: Imagen;

    constructor(
        private imagenService: ImagenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.imagenService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'imagenListModification',
                content: 'Deleted an imagen'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-imagen-delete-popup',
    template: ''
})
export class ImagenDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private imagenPopupService: ImagenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.imagenPopupService
                .open(ImagenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
