import {request} from "./request";
//根据iid获取商品详细信息
export function getDetail(iid) {
  return request({
    url: '/detail',
    params:{
      iid
    }
  })
}

export function getRecommends(){
  return request({
    url: '/recommend'
  })
}

//用类保存商品详细信息
export class GoodsInfo {
  constructor(itemInfo, columns ,services){
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}


//用类保存商家详细信息
export class ShopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sell = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}


//用类保存商品参数信息
export class GoodsParams{
  //某些商品可能有image值，有些没有
  constructor(info, rule){
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.size = rule.tables;
  }
}
