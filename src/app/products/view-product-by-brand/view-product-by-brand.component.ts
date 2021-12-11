import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { WatchListService } from 'src/app/Services/watch-list.service';
import { IResponse } from 'src/app/ViewModels/iresponse';

@Component({
  selector: 'app-view-product-by-brand',
  templateUrl: './view-product-by-brand.component.html',
  styleUrls: ['./view-product-by-brand.component.scss']
})
export class ViewProductByBrandComponent implements OnInit {

  BrandID:number=1;
  show:boolean=true;
  productList:any=[];
  public prdImgsList: any[] = [];
  constructor(private productService:ProductService,
    private activatedRouter:ActivatedRoute,
    private cartService:CartService,
    private watchService:WatchListService) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params)=>{
      this.BrandID=Number(params.get("id"));
      this.fillProductList(this.BrandID)
    });
    this.fillProductList(this.BrandID);
  
  }
  fillProductList(BrandID:number){
    this.productService.getProductsByBrandID(BrandID).subscribe({
      next: (Response: IResponse) => {

      this.productList = Response["data"];

      this.productList.forEach((product:any,index:any)=>{
        this.productService.getProductImgByID(product.productId).subscribe({
          next: (Response: IResponse) => {
            
            this.prdImgsList[index] = Response.data[0];
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
