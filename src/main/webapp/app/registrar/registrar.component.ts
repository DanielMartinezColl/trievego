import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService, JhiDateUtils } from 'ng-jhipster';

import { Registrar } from './registrar.service';
import { LoginModalService, EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '../shared';
import { UsuarioDTO } from './usuarioDTO.model';

@Component({
    selector: 'jhi-register',
    templateUrl: './registrar.component.html'
})
export class RegistrarComponent implements OnInit, AfterViewInit {

    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;
    usuarioDTO: UsuarioDTO;

    constructor(
        private languageService: JhiLanguageService,
        private loginModalService: LoginModalService,
        private registrarService: Registrar,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private dateUtils: JhiDateUtils
    ) {
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.usuarioDTO = new UsuarioDTO(this.registerAccount.login,
            this.registerAccount.firstName,
            this.registerAccount.lastName,
            this.dateUtils.convertLocalDateToServer(this.registerAccount.fechaNacimiento),
            this.registerAccount.genero,
            this.registerAccount.email,
            this.registerAccount.password),
            this.registrarService.save(this.usuarioDTO).subscribe(
                (res) => {
                   this.success = true;
                }
            );
        }
    }
    openLogin() {
        this.modalRef = this.loginModalService.open();
    }
    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
