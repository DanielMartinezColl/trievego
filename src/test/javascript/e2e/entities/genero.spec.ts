import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Genero e2e test', () => {

    let navBarPage: NavBarPage;
    let generoDialogPage: GeneroDialogPage;
    let generoComponentsPage: GeneroComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Generos', () => {
        navBarPage.goToEntity('genero');
        generoComponentsPage = new GeneroComponentsPage();
        expect(generoComponentsPage.getTitle())
            .toMatch(/trievegoApp.genero.home.title/);

    });

    it('should load create Genero dialog', () => {
        generoComponentsPage.clickOnCreateButton();
        generoDialogPage = new GeneroDialogPage();
        expect(generoDialogPage.getModalTitle())
            .toMatch(/trievegoApp.genero.home.createOrEditLabel/);
        generoDialogPage.close();
    });

    it('should create and save Generos', () => {
        generoComponentsPage.clickOnCreateButton();
        generoDialogPage.setNombreInput('nombre');
        expect(generoDialogPage.getNombreInput()).toMatch('nombre');
        generoDialogPage.save();
        expect(generoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class GeneroComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-genero div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GeneroDialogPage {
    modalTitle = element(by.css('h4#myGeneroLabel'));
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
