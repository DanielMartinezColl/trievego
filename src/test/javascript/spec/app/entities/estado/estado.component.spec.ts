/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrievegoTestModule } from '../../../test.module';
import { EstadoComponent } from '../../../../../../main/webapp/app/entities/estado/estado.component';
import { EstadoService } from '../../../../../../main/webapp/app/entities/estado/estado.service';
import { Estado } from '../../../../../../main/webapp/app/entities/estado/estado.model';

describe('Component Tests', () => {

    describe('Estado Management Component', () => {
        let comp: EstadoComponent;
        let fixture: ComponentFixture<EstadoComponent>;
        let service: EstadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrievegoTestModule],
                declarations: [EstadoComponent],
                providers: [
                    EstadoService
                ]
            })
            .overrideTemplate(EstadoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstadoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Estado(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.estados[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
