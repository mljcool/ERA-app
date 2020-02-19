
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface Product {
  id: string;
  key?: string;
  name: string;
  category?: number;
  price: number;
  quantity?: number;
  active?: boolean;
  description?: string;
  uid?: string;
  categoryByname?: string;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    { id: 'dasd12', name: 'Pizza Salami', price: 8.99, amount: 0 },
    { id: 'dasddasd12', name: 'Pizza Classic', price: 5.49, amount: 0 },
    { id: 'asdw1', name: 'Sliced Bread', price: 4.99, amount: 0 },
    { id: '1234', name: 'Salad', price: 6.99, amount: 0 }
  ];

  private dbPath = '/items';
  private cartItemCount = new BehaviorSubject(0);
  private cart = [];

  shopsRef: AngularFirestoreCollection<Product> = null;

  constructor(private afs: AngularFirestore) {
    this.shopsRef = afs.collection(this.dbPath);
  }

  getProducts(id: string): Observable<Product[]> {
    return this.afs
      .collection<Product>('items', ref => {
        const query: firebase.firestore.Query = ref;

        return query.where(
          'uid',
          '==',
          id
        );
      })
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({
            key: c.payload.doc.id,
            ...c.payload.doc.data()
          }))
        )
      );
  }

  clearCart(): void {
    this.cart = [];
    this.cartItemCount.next(0);
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    for (const p of this.cart) {
      if (p.key === product.key) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount === 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cart.splice(index, 1);
        this.cartItemCount.next(this.cart.length);
      }
    }
  }
}
