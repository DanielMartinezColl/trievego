import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Estado } from './estado.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Estado>;

@Injectable()
export class EstadoService {

    private resourceUrl =  SERVER_API_URL + 'api/estados';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/estados';

    constructor(private http: HttpClient) { }

    create(estado: Estado): Observable<EntityResponseType> {
        const copy = this.convert(estado);
        return this.http.post<Estado>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(estado: Estado): Observable<EntityResponseType> {
        const copy = this.convert(estado);
        return this.http.put<Estado>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Estado>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Estado[]>> {
        const options = createRequestOption(req);
        return this.http.get<Estado[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Estado[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Estado[]>> {
        const options = createRequestOption(req);
        return this.http.get<Estado[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Estado[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Estado = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Estado[]>): HttpResponse<Estado[]> {
        const jsonResponse: Estado[] = res.body;
        const body: Estado[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Estado.
     */
    private convertItemFromServer(estado: Estado): Estado {
        const copy: Estado = Object.assign({}, estado);
        return copy;
    }

    /**
     * Convert a Estado to a JSON which can be sent to the server.
     */
    private convert(estado: Estado): Estado {
        const copy: Estado = Object.assign({}, estado);
        return copy;
    }
}
