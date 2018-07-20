/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrievegoTestModule } from '../../../test.module';
import { EventoComponent } from '../../../../../../main/webapp/app/entities/evento/evento.component';
import { EventoService } from '../../../../../../main/webapp/app/entities/evento/evento.service';
import { Evento } from '../../../../../../main/webapp/app/entities/evento/evento.model';

describe('Component Tests', () => {

    describe('Evento Management Component', () => {
        let comp: EventoComponent;
        let fixture: ComponentFixture<EventoComponent>;
        let service: EventoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrievegoTestModule],
                declarations: [EventoComponent],
                providers: [
                    EventoService
                ]
            })
            .overrideTemplate(EventoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Evento(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.eventos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
