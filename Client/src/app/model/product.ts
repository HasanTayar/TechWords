export class Product{
  serialNumber: string
  title : string
  imgUrl : string
  price: number

  constructor(serialNumber: string, title : string, imgUrl : string, price: number ){
    this.serialNumber = serialNumber
    this.title = title
    this.imgUrl = imgUrl
    this.price = price
   
  }
}