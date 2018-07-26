import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Provincia e2e test', () => {

    let navBarPage: NavBarPage;
    let provinciaDialogPage: ProvinciaDialogPage;
    let provinciaComponentsPage: ProvinciaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Provincias', () => {
        navBarPage.goToEntity('provincia');
        provinciaComponentsPage = new ProvinciaComponentsPage();
        expect(provinciaComponentsPage.getTitle())
            .toMatch(/trievegoApp.provincia.home.title/);

    });

    it('should load create Provincia dialog', () => {
        provinciaComponentsPage.clickOnCreateButton();
        provinciaDialogPage = new ProvinciaDialogPage();
        expect(provinciaDialogPage.getModalTitle())
            .toMatch(/trievegoApp.provincia.home.createOrEditLabel/);
        provinciaDialogPage.close();
    });

    it('should create and save Provincias', () => {
        provinciaComponentsPage.clickOnCreateButton();
        provinciaDialogPage.setNombreInput('nombre');
        expect(provinciaDialogPage.getNombreInput()).toMatch('nombre');
        provinciaDialogPage.save();
        expect(provinciaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProvinciaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-provincia div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProvinciaDialogPage {
    modalTitle = element(by.css('h4#myProvinciaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
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
