import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:9191/Product'; // Adjust the API URL based on your server

  constructor(private http: HttpClient) {}

  addProduct(
    image: File,
    nomProduit: string,
    description: string,
    qte: number,
    prix: number
  ): Observable<Product> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    formData.append('nomProduit', nomProduit);
    formData.append('description', description);
    formData.append('qte', qte.toString());
    formData.append('prix', prix.toString());

    return this.http.post<Product>(`${this.apiUrl}/addProduct`, formData);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/getAllProduct`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/getProduct/${id}`);
  }

  updateProduct(
    id: number,
    image: File,
    nomProduit: string,
    description: string,
    qte: number,
    prix: number
  ): Observable<Product> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    formData.append('nomProduit', nomProduit);
    formData.append('description', description);
    formData.append('qte', qte.toString());
    formData.append('prix', prix.toString());

    return this.http.put<Product>(`${this.apiUrl}/updateProd/${id}`, formData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteProd/${id}`);
  }
}
