/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrievegoTestModule } from '../../../test.module';
import { EstadoDetailComponent } from '../../../../../../main/webapp/app/entities/estado/estado-detail.component';
import { EstadoService } from '../../../../../../main/webapp/app/entities/estado/estado.service';
import { Estado } from '../../../../../../main/webapp/app/entities/estado/estado.model';

describe('Component Tests', () => {

    describe('Estado Management Detail Component', () => {
        let comp: EstadoDetailComponent;
        let fixture: ComponentFixture<EstadoDetailComponent>;
        let service: EstadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrievegoTestModule],
                declarations: [EstadoDetailComponent],
                providers: [
                    EstadoService
                ]
            })
            .overrideTemplate(EstadoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstadoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Estado(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.estado).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
