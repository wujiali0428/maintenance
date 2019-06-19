
export default function () {
  const advertising = window.localStorage.getItem('advertising') || '';
  console.log(advertising);
  // let advertisingClone = ['cmbapp','cmbchange',"baidu_car"]
  const advertisingClone = ['cmbapp', 'cmbchange','baidu_car'];
  // cmblife 招商  alipay  支付宝   wechat  微信   baiduapp  百度  common  综合  cmbapp 招商银行app
  // cnmapp为改变按钮颜色和去掉广告部分加上页面变成查询和我的，cmbchange为改变按钮颜色和去掉广告部分加上页面变成缴罚和我的
  if (advertisingClone.indexOf(advertising) !== -1) {
    if (advertising == 'cmbapp') {
      return { backgroundImage: 'linear-gradient(135deg, #54B8F4, #5C78EB)' };
    }else if(advertising == "cmbchange"){
          return 'cmbchange'
    }else{
      return true;
    }
  }
  return false;
}
