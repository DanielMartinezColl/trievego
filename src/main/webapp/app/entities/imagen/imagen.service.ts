import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Imagen } from './imagen.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Imagen>;

@Injectable()
export class ImagenService {

    private resourceUrl =  SERVER_API_URL + 'api/imagens';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(imagen: Imagen): Observable<EntityResponseType> {
        const copy = this.convert(imagen);
        return this.http.post<Imagen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(imagen: Imagen): Observable<EntityResponseType> {
        const copy = this.convert(imagen);
        return this.http.put<Imagen>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Imagen>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Imagen[]>> {
        const options = createRequestOption(req);
        return this.http.get<Imagen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Imagen[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Imagen = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Imagen[]>): HttpResponse<Imagen[]> {
        const jsonResponse: Imagen[] = res.body;
        const body: Imagen[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Imagen.
     */
    private convertItemFromServer(imagen: Imagen): Imagen {
        const copy: Imagen = Object.assign({}, imagen);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(imagen.fecha);
        return copy;
    }

    /**
     * Convert a Imagen to a JSON which can be sent to the server.
     */
    private convert(imagen: Imagen): Imagen {
        const copy: Imagen = Object.assign({}, imagen);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(imagen.fecha);
        return copy;
    }
}
