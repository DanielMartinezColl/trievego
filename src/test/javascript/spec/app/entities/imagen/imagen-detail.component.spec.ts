/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrievegoTestModule } from '../../../test.module';
import { ImagenDetailComponent } from '../../../../../../main/webapp/app/entities/imagen/imagen-detail.component';
import { ImagenService } from '../../../../../../main/webapp/app/entities/imagen/imagen.service';
import { Imagen } from '../../../../../../main/webapp/app/entities/imagen/imagen.model';

describe('Component Tests', () => {

    describe('Imagen Management Detail Component', () => {
        let comp: ImagenDetailComponent;
        let fixture: ComponentFixture<ImagenDetailComponent>;
        let service: ImagenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrievegoTestModule],
                declarations: [ImagenDetailComponent],
                providers: [
                    ImagenService
                ]
            })
            .overrideTemplate(ImagenDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImagenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImagenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Imagen(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.imagen).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
