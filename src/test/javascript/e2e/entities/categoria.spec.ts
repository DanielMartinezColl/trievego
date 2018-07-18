import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Categoria e2e test', () => {

    let navBarPage: NavBarPage;
    let categoriaDialogPage: CategoriaDialogPage;
    let categoriaComponentsPage: CategoriaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Categorias', () => {
        navBarPage.goToEntity('categoria');
        categoriaComponentsPage = new CategoriaComponentsPage();
        expect(categoriaComponentsPage.getTitle())
            .toMatch(/trievegoApp.categoria.home.title/);

    });

    it('should load create Categoria dialog', () => {
        categoriaComponentsPage.clickOnCreateButton();
        categoriaDialogPage = new CategoriaDialogPage();
        expect(categoriaDialogPage.getModalTitle())
            .toMatch(/trievegoApp.categoria.home.createOrEditLabel/);
        categoriaDialogPage.close();
    });

    it('should create and save Categorias', () => {
        categoriaComponentsPage.clickOnCreateButton();
        categoriaDialogPage.setNombreInput('nombre');
        expect(categoriaDialogPage.getNombreInput()).toMatch('nombre');
        categoriaDialogPage.estadoSelectLastOption();
        categoriaDialogPage.save();
        expect(categoriaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CategoriaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-categoria div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CategoriaDialogPage {
    modalTitle = element(by.css('h4#myCategoriaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    estadoSelect = element(by.css('select#field_estado'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
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
