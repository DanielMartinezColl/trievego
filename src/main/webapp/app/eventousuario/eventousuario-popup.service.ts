import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Evento } from './eventousuario.model';
import { EventousuarioService } from './eventousuario.service';

@Injectable()
export class EventousuarioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private eventousuarioService: EventousuarioService

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
                this.eventousuarioService.find(id)
                    .subscribe((eventousuarioResponse: HttpResponse<Evento>) => {
                        const eventousuario: Evento = eventousuarioResponse.body;
                        eventousuario.fechaHora = this.datePipe
                            .transform(eventousuario.fechaHora, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.eventousuarioModalRef(component, eventousuario);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.eventousuarioModalRef(component, new Evento());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    eventousuarioModalRef(component: Component, eventousuario: Evento): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.evento = eventousuario;
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
