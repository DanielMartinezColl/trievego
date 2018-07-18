/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrievegoTestModule } from '../../../test.module';
import { GeneroDetailComponent } from '../../../../../../main/webapp/app/entities/genero/genero-detail.component';
import { GeneroService } from '../../../../../../main/webapp/app/entities/genero/genero.service';
import { Genero } from '../../../../../../main/webapp/app/entities/genero/genero.model';

describe('Component Tests', () => {

    describe('Genero Management Detail Component', () => {
        let comp: GeneroDetailComponent;
        let fixture: ComponentFixture<GeneroDetailComponent>;
        let service: GeneroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrievegoTestModule],
                declarations: [GeneroDetailComponent],
                providers: [
                    GeneroService
                ]
            })
            .overrideTemplate(GeneroDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GeneroDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GeneroService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Genero(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.genero).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
