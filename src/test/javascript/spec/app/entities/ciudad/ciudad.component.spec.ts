/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrievegoTestModule } from '../../../test.module';
import { CiudadComponent } from '../../../../../../main/webapp/app/entities/ciudad/ciudad.component';
import { CiudadService } from '../../../../../../main/webapp/app/entities/ciudad/ciudad.service';
import { Ciudad } from '../../../../../../main/webapp/app/entities/ciudad/ciudad.model';

describe('Component Tests', () => {

    describe('Ciudad Management Component', () => {
        let comp: CiudadComponent;
        let fixture: ComponentFixture<CiudadComponent>;
        let service: CiudadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrievegoTestModule],
                declarations: [CiudadComponent],
                providers: [
                    CiudadService
                ]
            })
            .overrideTemplate(CiudadComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CiudadComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CiudadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Ciudad(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ciudads[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
