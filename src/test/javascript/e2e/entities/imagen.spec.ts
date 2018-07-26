import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Imagen e2e test', () => {

    let navBarPage: NavBarPage;
    let imagenDialogPage: ImagenDialogPage;
    let imagenComponentsPage: ImagenComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Imagens', () => {
        navBarPage.goToEntity('imagen');
        imagenComponentsPage = new ImagenComponentsPage();
        expect(imagenComponentsPage.getTitle())
            .toMatch(/trievegoApp.imagen.home.title/);

    });

    it('should load create Imagen dialog', () => {
        imagenComponentsPage.clickOnCreateButton();
        imagenDialogPage = new ImagenDialogPage();
        expect(imagenDialogPage.getModalTitle())
            .toMatch(/trievegoApp.imagen.home.createOrEditLabel/);
        imagenDialogPage.close();
    });

    it('should create and save Imagens', () => {
        imagenComponentsPage.clickOnCreateButton();
        imagenDialogPage.setNombreInput('nombre');
        expect(imagenDialogPage.getNombreInput()).toMatch('nombre');
        imagenDialogPage.setImagenInput(absolutePath);
        imagenDialogPage.setFechaInput('2000-12-31');
        expect(imagenDialogPage.getFechaInput()).toMatch('2000-12-31');
        imagenDialogPage.eventosSelectLastOption();
        imagenDialogPage.save();
        expect(imagenDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ImagenComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-imagen div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ImagenDialogPage {
    modalTitle = element(by.css('h4#myImagenLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    imagenInput = element(by.css('input#file_imagen'));
    fechaInput = element(by.css('input#field_fecha'));
    eventosSelect = element(by.css('select#field_eventos'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    setImagenInput = function(imagen) {
        this.imagenInput.sendKeys(imagen);
    };

    getImagenInput = function() {
        return this.imagenInput.getAttribute('value');
    };

    setFechaInput = function(fecha) {
        this.fechaInput.sendKeys(fecha);
    };

    getFechaInput = function() {
        return this.fechaInput.getAttribute('value');
    };

    eventosSelectLastOption = function() {
        this.eventosSelect.all(by.tagName('option')).last().click();
    };

    eventosSelectOption = function(option) {
        this.eventosSelect.sendKeys(option);
    };

    getEventosSelect = function() {
        return this.eventosSelect;
    };

    getEventosSelectedOption = function() {
        return this.eventosSelect.element(by.css('option:checked')).getText();
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
