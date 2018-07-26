import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Evento e2e test', () => {

    let navBarPage: NavBarPage;
    let eventoDialogPage: EventoDialogPage;
    let eventoComponentsPage: EventoComponentsPage;

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
        eventoDialogPage.getEstadoInput().isSelected().then((selected) => {
            if (selected) {
                eventoDialogPage.getEstadoInput().click();
                expect(eventoDialogPage.getEstadoInput().isSelected()).toBeFalsy();
            } else {
                eventoDialogPage.getEstadoInput().click();
                expect(eventoDialogPage.getEstadoInput().isSelected()).toBeTruthy();
            }
        });
        eventoDialogPage.ciudadesSelectLastOption();
        eventoDialogPage.categoriasSelectLastOption();
        eventoDialogPage.usuariosSelectLastOption();
        // eventoDialogPage.tagsSelectLastOption();
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
    estadoInput = element(by.css('input#field_estado'));
    ciudadesSelect = element(by.css('select#field_ciudades'));
    categoriasSelect = element(by.css('select#field_categorias'));
    usuariosSelect = element(by.css('select#field_usuarios'));
    tagsSelect = element(by.css('select#field_tags'));

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

    getEstadoInput = function() {
        return this.estadoInput;
    };
    ciudadesSelectLastOption = function() {
        this.ciudadesSelect.all(by.tagName('option')).last().click();
    };

    ciudadesSelectOption = function(option) {
        this.ciudadesSelect.sendKeys(option);
    };

    getCiudadesSelect = function() {
        return this.ciudadesSelect;
    };

    getCiudadesSelectedOption = function() {
        return this.ciudadesSelect.element(by.css('option:checked')).getText();
    };

    categoriasSelectLastOption = function() {
        this.categoriasSelect.all(by.tagName('option')).last().click();
    };

    categoriasSelectOption = function(option) {
        this.categoriasSelect.sendKeys(option);
    };

    getCategoriasSelect = function() {
        return this.categoriasSelect;
    };

    getCategoriasSelectedOption = function() {
        return this.categoriasSelect.element(by.css('option:checked')).getText();
    };

    usuariosSelectLastOption = function() {
        this.usuariosSelect.all(by.tagName('option')).last().click();
    };

    usuariosSelectOption = function(option) {
        this.usuariosSelect.sendKeys(option);
    };

    getUsuariosSelect = function() {
        return this.usuariosSelect;
    };

    getUsuariosSelectedOption = function() {
        return this.usuariosSelect.element(by.css('option:checked')).getText();
    };

    tagsSelectLastOption = function() {
        this.tagsSelect.all(by.tagName('option')).last().click();
    };

    tagsSelectOption = function(option) {
        this.tagsSelect.sendKeys(option);
    };

    getTagsSelect = function() {
        return this.tagsSelect;
    };

    getTagsSelectedOption = function() {
        return this.tagsSelect.element(by.css('option:checked')).getText();
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
