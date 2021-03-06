import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Usuario e2e test', () => {

    let navBarPage: NavBarPage;
    let usuarioDialogPage: UsuarioDialogPage;
    let usuarioComponentsPage: UsuarioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Usuarios', () => {
        navBarPage.goToEntity('usuario');
        usuarioComponentsPage = new UsuarioComponentsPage();
        expect(usuarioComponentsPage.getTitle())
            .toMatch(/trievegoApp.usuario.home.title/);

    });

    it('should load create Usuario dialog', () => {
        usuarioComponentsPage.clickOnCreateButton();
        usuarioDialogPage = new UsuarioDialogPage();
        expect(usuarioDialogPage.getModalTitle())
            .toMatch(/trievegoApp.usuario.home.createOrEditLabel/);
        usuarioDialogPage.close();
    });

    it('should create and save Usuarios', () => {
        usuarioComponentsPage.clickOnCreateButton();
        usuarioDialogPage.setFechaNacimientoInput('2000-12-31');
        expect(usuarioDialogPage.getFechaNacimientoInput()).toMatch('2000-12-31');
        usuarioDialogPage.getGeneroInput().isSelected().then((selected) => {
            if (selected) {
                usuarioDialogPage.getGeneroInput().click();
                expect(usuarioDialogPage.getGeneroInput().isSelected()).toBeFalsy();
            } else {
                usuarioDialogPage.getGeneroInput().click();
                expect(usuarioDialogPage.getGeneroInput().isSelected()).toBeTruthy();
            }
        });
        usuarioDialogPage.userSelectLastOption();
        // usuarioDialogPage.favoritoSelectLastOption();
        // usuarioDialogPage.participaSelectLastOption();
        usuarioDialogPage.save();
        expect(usuarioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UsuarioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-usuario div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UsuarioDialogPage {
    modalTitle = element(by.css('h4#myUsuarioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaNacimientoInput = element(by.css('input#field_fechaNacimiento'));
    generoInput = element(by.css('input#field_genero'));
    userSelect = element(by.css('select#field_user'));
    favoritoSelect = element(by.css('select#field_favorito'));
    participaSelect = element(by.css('select#field_participa'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFechaNacimientoInput = function(fechaNacimiento) {
        this.fechaNacimientoInput.sendKeys(fechaNacimiento);
    };

    getFechaNacimientoInput = function() {
        return this.fechaNacimientoInput.getAttribute('value');
    };

    getGeneroInput = function() {
        return this.generoInput;
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

    favoritoSelectLastOption = function() {
        this.favoritoSelect.all(by.tagName('option')).last().click();
    };

    favoritoSelectOption = function(option) {
        this.favoritoSelect.sendKeys(option);
    };

    getFavoritoSelect = function() {
        return this.favoritoSelect;
    };

    getFavoritoSelectedOption = function() {
        return this.favoritoSelect.element(by.css('option:checked')).getText();
    };

    participaSelectLastOption = function() {
        this.participaSelect.all(by.tagName('option')).last().click();
    };

    participaSelectOption = function(option) {
        this.participaSelect.sendKeys(option);
    };

    getParticipaSelect = function() {
        return this.participaSelect;
    };

    getParticipaSelectedOption = function() {
        return this.participaSelect.element(by.css('option:checked')).getText();
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
