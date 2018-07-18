/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrievegoTestModule } from '../../../test.module';
import { GeneroComponent } from '../../../../../../main/webapp/app/entities/genero/genero.component';
import { GeneroService } from '../../../../../../main/webapp/app/entities/genero/genero.service';
import { Genero } from '../../../../../../main/webapp/app/entities/genero/genero.model';

describe('Component Tests', () => {

    describe('Genero Management Component', () => {
        let comp: GeneroComponent;
        let fixture: ComponentFixture<GeneroComponent>;
        let service: GeneroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrievegoTestModule],
                declarations: [GeneroComponent],
                providers: [
                    GeneroService
                ]
            })
            .overrideTemplate(GeneroComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GeneroComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GeneroService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Genero(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.generos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
