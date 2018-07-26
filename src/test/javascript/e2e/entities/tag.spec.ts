import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Tag e2e test', () => {

    let navBarPage: NavBarPage;
    let tagDialogPage: TagDialogPage;
    let tagComponentsPage: TagComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tags', () => {
        navBarPage.goToEntity('tag');
        tagComponentsPage = new TagComponentsPage();
        expect(tagComponentsPage.getTitle())
            .toMatch(/trievegoApp.tag.home.title/);

    });

    it('should load create Tag dialog', () => {
        tagComponentsPage.clickOnCreateButton();
        tagDialogPage = new TagDialogPage();
        expect(tagDialogPage.getModalTitle())
            .toMatch(/trievegoApp.tag.home.createOrEditLabel/);
        tagDialogPage.close();
    });

    it('should create and save Tags', () => {
        tagComponentsPage.clickOnCreateButton();
        tagDialogPage.setNombreInput('nombre');
        expect(tagDialogPage.getNombreInput()).toMatch('nombre');
        tagDialogPage.getEstadoInput().isSelected().then((selected) => {
            if (selected) {
                tagDialogPage.getEstadoInput().click();
                expect(tagDialogPage.getEstadoInput().isSelected()).toBeFalsy();
            } else {
                tagDialogPage.getEstadoInput().click();
                expect(tagDialogPage.getEstadoInput().isSelected()).toBeTruthy();
            }
        });
        // tagDialogPage.usuariosSelectLastOption();
        tagDialogPage.save();
        expect(tagDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TagComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TagDialogPage {
    modalTitle = element(by.css('h4#myTagLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    estadoInput = element(by.css('input#field_estado'));
    usuariosSelect = element(by.css('select#field_usuarios'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    getEstadoInput = function() {
        return this.estadoInput;
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
