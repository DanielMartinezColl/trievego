import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Ciudad e2e test', () => {

    let navBarPage: NavBarPage;
    let ciudadDialogPage: CiudadDialogPage;
    let ciudadComponentsPage: CiudadComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Ciudads', () => {
        navBarPage.goToEntity('ciudad');
        ciudadComponentsPage = new CiudadComponentsPage();
        expect(ciudadComponentsPage.getTitle())
            .toMatch(/trievegoApp.ciudad.home.title/);

    });

    it('should load create Ciudad dialog', () => {
        ciudadComponentsPage.clickOnCreateButton();
        ciudadDialogPage = new CiudadDialogPage();
        expect(ciudadDialogPage.getModalTitle())
            .toMatch(/trievegoApp.ciudad.home.createOrEditLabel/);
        ciudadDialogPage.close();
    });

    it('should create and save Ciudads', () => {
        ciudadComponentsPage.clickOnCreateButton();
        ciudadDialogPage.setNombreInput('nombre');
        expect(ciudadDialogPage.getNombreInput()).toMatch('nombre');
        ciudadDialogPage.provinciasSelectLastOption();
        ciudadDialogPage.save();
        expect(ciudadDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CiudadComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-ciudad div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CiudadDialogPage {
    modalTitle = element(by.css('h4#myCiudadLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    provinciasSelect = element(by.css('select#field_provincias'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    provinciasSelectLastOption = function() {
        this.provinciasSelect.all(by.tagName('option')).last().click();
    };

    provinciasSelectOption = function(option) {
        this.provinciasSelect.sendKeys(option);
    };

    getProvinciasSelect = function() {
        return this.provinciasSelect;
    };

    getProvinciasSelectedOption = function() {
        return this.provinciasSelect.element(by.css('option:checked')).getText();
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
