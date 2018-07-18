import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Estado e2e test', () => {

    let navBarPage: NavBarPage;
    let estadoDialogPage: EstadoDialogPage;
    let estadoComponentsPage: EstadoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Estados', () => {
        navBarPage.goToEntity('estado');
        estadoComponentsPage = new EstadoComponentsPage();
        expect(estadoComponentsPage.getTitle())
            .toMatch(/trievegoApp.estado.home.title/);

    });

    it('should load create Estado dialog', () => {
        estadoComponentsPage.clickOnCreateButton();
        estadoDialogPage = new EstadoDialogPage();
        expect(estadoDialogPage.getModalTitle())
            .toMatch(/trievegoApp.estado.home.createOrEditLabel/);
        estadoDialogPage.close();
    });

    it('should create and save Estados', () => {
        estadoComponentsPage.clickOnCreateButton();
        estadoDialogPage.setNombreInput('nombre');
        expect(estadoDialogPage.getNombreInput()).toMatch('nombre');
        estadoDialogPage.save();
        expect(estadoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EstadoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-estado div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EstadoDialogPage {
    modalTitle = element(by.css('h4#myEstadoLabel'));
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
