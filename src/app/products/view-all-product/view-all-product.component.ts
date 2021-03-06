import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { WatchListService } from 'src/app/Services/watch-list.service';
import { ICategory } from 'src/app/ViewModels/icategory';
import { IProduct } from 'src/app/ViewModels/iproduct';
import { IResponse } from 'src/app/ViewModels/iresponse';


@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.scss']
})
export class ViewAllProductComponent implements OnInit {

totalLength:any;
page:number=1;
  public productList: any[] = [];

  catList: any[] = [];
  constructor(private productService: ProductService, private route: Router,
    private cartService:CartService,
    private watchService:WatchListService) {


  }
  

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (Response: IResponse) => {
        this.productList = Response.data;
        this.totalLength=this.productList.length;
        this.productList.forEach((product,index)=>{
          this.productService.getProductImgByID(product.productId).subscribe({
            next: (Response: IResponse) => {
              product["img"]=Response.data[0];
              //this.prdImgsList[index] = Response.data[0];
            }
          })

          this.productService.getProductRateByID(product.productId).subscribe({
            next: (Response: IResponse) => {
              console.log(Response);
              product["rate"]=Response.data;

              //this.prdImgsList[index] = Response.data[0];
            }
          })

          this.productService.getProductOfferByID(product.productId).subscribe({
            next: (Response: IResponse) => {
              console.log(Response);
              product["offer"]=Response.data[0];

              //this.prdImgsList[index] = Response.data[0];
            }
          })
          
        })
      }
    });
  }

  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
  addtowatct(item: any){
    this.watchService.addtowatch(item);
  }
}
