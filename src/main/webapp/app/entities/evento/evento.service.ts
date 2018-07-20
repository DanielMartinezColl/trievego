import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Evento } from './evento.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Evento>;

@Injectable()
export class EventoService {

    private resourceUrl =  SERVER_API_URL + 'api/eventos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(evento: Evento): Observable<EntityResponseType> {
        const copy = this.convert(evento);
        return this.http.post<Evento>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(evento: Evento): Observable<EntityResponseType> {
        const copy = this.convert(evento);
        return this.http.put<Evento>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Evento>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Evento[]>> {
        const options = createRequestOption(req);
        return this.http.get<Evento[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Evento[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Evento = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Evento[]>): HttpResponse<Evento[]> {
        const jsonResponse: Evento[] = res.body;
        const body: Evento[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Evento.
     */
    private convertItemFromServer(evento: Evento): Evento {
        const copy: Evento = Object.assign({}, evento);
        copy.fechaHora = this.dateUtils
            .convertDateTimeFromServer(evento.fechaHora);
        return copy;
    }

    /**
     * Convert a Evento to a JSON which can be sent to the server.
     */
    private convert(evento: Evento): Evento {
        const copy: Evento = Object.assign({}, evento);

        copy.fechaHora = this.dateUtils.toDate(evento.fechaHora);
        return copy;
    }
}
