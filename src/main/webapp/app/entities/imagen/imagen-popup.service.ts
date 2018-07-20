import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Imagen } from './imagen.model';
import { ImagenService } from './imagen.service';

@Injectable()
export class ImagenPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private imagenService: ImagenService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.imagenService.find(id)
                    .subscribe((imagenResponse: HttpResponse<Imagen>) => {
                        const imagen: Imagen = imagenResponse.body;
                        if (imagen.fecha) {
                            imagen.fecha = {
                                year: imagen.fecha.getFullYear(),
                                month: imagen.fecha.getMonth() + 1,
                                day: imagen.fecha.getDate()
                            };
                        }
                        this.ngbModalRef = this.imagenModalRef(component, imagen);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.imagenModalRef(component, new Imagen());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    imagenModalRef(component: Component, imagen: Imagen): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.imagen = imagen;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
