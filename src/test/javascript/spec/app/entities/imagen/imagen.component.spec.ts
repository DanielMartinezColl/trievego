/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrievegoTestModule } from '../../../test.module';
import { ImagenComponent } from '../../../../../../main/webapp/app/entities/imagen/imagen.component';
import { ImagenService } from '../../../../../../main/webapp/app/entities/imagen/imagen.service';
import { Imagen } from '../../../../../../main/webapp/app/entities/imagen/imagen.model';

describe('Component Tests', () => {

    describe('Imagen Management Component', () => {
        let comp: ImagenComponent;
        let fixture: ComponentFixture<ImagenComponent>;
        let service: ImagenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrievegoTestModule],
                declarations: [ImagenComponent],
                providers: [
                    ImagenService
                ]
            })
            .overrideTemplate(ImagenComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImagenComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImagenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Imagen(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.imagens[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
