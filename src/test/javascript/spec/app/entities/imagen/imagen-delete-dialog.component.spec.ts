/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrievegoTestModule } from '../../../test.module';
import { ImagenDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/imagen/imagen-delete-dialog.component';
import { ImagenService } from '../../../../../../main/webapp/app/entities/imagen/imagen.service';

describe('Component Tests', () => {

    describe('Imagen Management Delete Component', () => {
        let comp: ImagenDeleteDialogComponent;
        let fixture: ComponentFixture<ImagenDeleteDialogComponent>;
        let service: ImagenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrievegoTestModule],
                declarations: [ImagenDeleteDialogComponent],
                providers: [
                    ImagenService
                ]
            })
            .overrideTemplate(ImagenDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImagenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImagenService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
