'use strict';
function bestCharge(selectedItems) {
  let a= grouping_count(selectedItems);
  let result = "============= 订餐明细 =============\n"
    + print_goodlist(a) +"\n"
    + print_promotions(a) +"\n"
    + "===================================";
  console.log(result);
  return result;
}
module.exports =  bestCharge;
// let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
// //let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
// //let inputs = ["ITEM0013 x 4"];
// let a= grouping_count(inputs);
// let result = "============= 订餐明细 =============\n"
//            + print_goodlist(a) +"\n"
//            + print_promotions(a) +"\n"
//            + "===================================";
// console.log(result);

//商品信息
function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}

//优惠商品
function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}

// 统计商品的信息
function grouping_count(arr) {
  let result= [];
  arr.forEach(function(item, index, array) {
    let barcode = item.slice(0, 8);
    let count = item[item.length - 1];
    count = Number(count);
    for (let i = 0; i < loadAllItems().length; i++) {
      if (barcode === loadAllItems()[i].id) {
        result.push({
          id: loadAllItems()[i].id,
          name: loadAllItems()[i].name,
          price: loadAllItems()[i].price,
          count: count,
          total: count*loadAllItems()[i].price
        });
      }
    }
  });
  return result;
}

// 打印商品清单
function print_goodlist(arr){
  var print_goodlist = arr.map(function (item, index, array) {
    var goodlist = item.name + " x " + item.count + " = " + item.total + "元";
    //console.log(goodlist + '\n');
    return goodlist;
  });
  return print_goodlist.join('\n');
}

// 打印优惠信息及付款金额
function print_promotions(arr){
  let discount=loadPromotions()[1].items;
  let sum=0;
  let sum_discount =0;
  let discount_good=[];
  let result=arr.map(function(item, index, array){
    sum += item.total;
    for(let i =0;i < discount.length;i++){
      if(item.id===discount[i]){
        sum_discount += (item.price/2)*item.count;
        discount_good.push(item.name);
      }
    }
  });
  //console.log(sum_discount);
  if(sum >=30 && sum_discount <6){
    let total = sum-6;
    let result = "-----------------------------------\n"
               + "使用优惠:\n" + loadPromotions()[0].type +"，省6元\n"
               +  "-----------------------------------\n"
               + "总计：" + total +"元";
    return result;
  }else if(sum >=30 && sum_discount > 6){
    let total = sum-sum_discount;
    if(discount_good.length >1){
      let result = "-----------------------------------\n"
        + "使用优惠:\n" + loadPromotions()[1].type +"("
        + discount_good[0] +"，"+ discount_good[1] +")" + "，省" + sum_discount +"元\n"
        +  "-----------------------------------\n"
        + "总计：" + total +"元";
      return result;
    }else{
      let result = "-----------------------------------\n"
        + "使用优惠:\n" + loadPromotions()[1].type +"("
        + discount_good +")" + "，省" + sum_discount +"元\n"
        +  "-----------------------------------\n"
        + "总计：" + total +"元";
      return result;
    }


  }else if(sum >=30 && sum_discount == 6){
    let result = "使用优惠:\n" + loadPromotions()[0].type +"，省6元";
  }else {
    let result = "-----------------------------------\n"
               + "总计：" + sum +"元";
    return result;
  }
  console.log(result);
}



