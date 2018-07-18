import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Evento e2e test', () => {

    let navBarPage: NavBarPage;
    let eventoDialogPage: EventoDialogPage;
    let eventoComponentsPage: EventoComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Eventos', () => {
        navBarPage.goToEntity('evento');
        eventoComponentsPage = new EventoComponentsPage();
        expect(eventoComponentsPage.getTitle())
            .toMatch(/trievegoApp.evento.home.title/);

    });

    it('should load create Evento dialog', () => {
        eventoComponentsPage.clickOnCreateButton();
        eventoDialogPage = new EventoDialogPage();
        expect(eventoDialogPage.getModalTitle())
            .toMatch(/trievegoApp.evento.home.createOrEditLabel/);
        eventoDialogPage.close();
    });

    it('should create and save Eventos', () => {
        eventoComponentsPage.clickOnCreateButton();
        eventoDialogPage.setNombreInput('nombre');
        expect(eventoDialogPage.getNombreInput()).toMatch('nombre');
        eventoDialogPage.setResumenInput('resumen');
        expect(eventoDialogPage.getResumenInput()).toMatch('resumen');
        eventoDialogPage.setDescripcionInput('descripcion');
        expect(eventoDialogPage.getDescripcionInput()).toMatch('descripcion');
        eventoDialogPage.setPrecioInput('5');
        expect(eventoDialogPage.getPrecioInput()).toMatch('5');
        eventoDialogPage.setFechaHoraInput(12310020012301);
        expect(eventoDialogPage.getFechaHoraInput()).toMatch('2001-12-31T02:30');
        eventoDialogPage.setDireccionInput('direccion');
        expect(eventoDialogPage.getDireccionInput()).toMatch('direccion');
        eventoDialogPage.setImagenInput(absolutePath);
        eventoDialogPage.ciudadSelectLastOption();
        eventoDialogPage.categoriaSelectLastOption();
        eventoDialogPage.estadoSelectLastOption();
        eventoDialogPage.userSelectLastOption();
        // eventoDialogPage.tagSelectLastOption();
        eventoDialogPage.save();
        expect(eventoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EventoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-evento div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EventoDialogPage {
    modalTitle = element(by.css('h4#myEventoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    resumenInput = element(by.css('input#field_resumen'));
    descripcionInput = element(by.css('input#field_descripcion'));
    precioInput = element(by.css('input#field_precio'));
    fechaHoraInput = element(by.css('input#field_fechaHora'));
    direccionInput = element(by.css('input#field_direccion'));
    imagenInput = element(by.css('input#file_imagen'));
    ciudadSelect = element(by.css('select#field_ciudad'));
    categoriaSelect = element(by.css('select#field_categoria'));
    estadoSelect = element(by.css('select#field_estado'));
    userSelect = element(by.css('select#field_user'));
    tagSelect = element(by.css('select#field_tag'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    setResumenInput = function(resumen) {
        this.resumenInput.sendKeys(resumen);
    };

    getResumenInput = function() {
        return this.resumenInput.getAttribute('value');
    };

    setDescripcionInput = function(descripcion) {
        this.descripcionInput.sendKeys(descripcion);
    };

    getDescripcionInput = function() {
        return this.descripcionInput.getAttribute('value');
    };

    setPrecioInput = function(precio) {
        this.precioInput.sendKeys(precio);
    };

    getPrecioInput = function() {
        return this.precioInput.getAttribute('value');
    };

    setFechaHoraInput = function(fechaHora) {
        this.fechaHoraInput.sendKeys(fechaHora);
    };

    getFechaHoraInput = function() {
        return this.fechaHoraInput.getAttribute('value');
    };

    setDireccionInput = function(direccion) {
        this.direccionInput.sendKeys(direccion);
    };

    getDireccionInput = function() {
        return this.direccionInput.getAttribute('value');
    };

    setImagenInput = function(imagen) {
        this.imagenInput.sendKeys(imagen);
    };

    getImagenInput = function() {
        return this.imagenInput.getAttribute('value');
    };

    ciudadSelectLastOption = function() {
        this.ciudadSelect.all(by.tagName('option')).last().click();
    };

    ciudadSelectOption = function(option) {
        this.ciudadSelect.sendKeys(option);
    };

    getCiudadSelect = function() {
        return this.ciudadSelect;
    };

    getCiudadSelectedOption = function() {
        return this.ciudadSelect.element(by.css('option:checked')).getText();
    };

    categoriaSelectLastOption = function() {
        this.categoriaSelect.all(by.tagName('option')).last().click();
    };

    categoriaSelectOption = function(option) {
        this.categoriaSelect.sendKeys(option);
    };

    getCategoriaSelect = function() {
        return this.categoriaSelect;
    };

    getCategoriaSelectedOption = function() {
        return this.categoriaSelect.element(by.css('option:checked')).getText();
    };

    estadoSelectLastOption = function() {
        this.estadoSelect.all(by.tagName('option')).last().click();
    };

    estadoSelectOption = function(option) {
        this.estadoSelect.sendKeys(option);
    };

    getEstadoSelect = function() {
        return this.estadoSelect;
    };

    getEstadoSelectedOption = function() {
        return this.estadoSelect.element(by.css('option:checked')).getText();
    };

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    tagSelectLastOption = function() {
        this.tagSelect.all(by.tagName('option')).last().click();
    };

    tagSelectOption = function(option) {
        this.tagSelect.sendKeys(option);
    };

    getTagSelect = function() {
        return this.tagSelect;
    };

    getTagSelectedOption = function() {
        return this.tagSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
