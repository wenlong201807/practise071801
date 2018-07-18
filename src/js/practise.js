require.config({
  shim: {
    jqmap: ['jquery'],
    // jqmap: ['kk'],
    pp: ['jquery']
    // kk: ['jquery'],
  },
  paths: {
    jquery: '/lib/jquery.min',
    jqmap: '/lib/jquery.baiduMap.min',
    // kk: 'http://www.jq22.com/jquery/jquery-1.10.2',
    pp: 'http://api.map.baidu.com/api?v=2.0&ak=A1LU7iHS0avqQwPLAxbhKn0UYSQCuRVH'
    // <script src="http://www.jq22.com/jquery/jquery-1.10.2.js"></script>
    // <script src="http://api.map.baidu.com/api?v=2.0&ak=A1LU7iHS0avqQwPLAxbhKn0UYSQCuRVH"></script>
    // <script src="js/jquery.baiduMap.min.js"></script>
  }
});
require(['jquery'], function($) {
  //* ************** */
  // // 地图专用
  // var points = [
  //   {
  //     id: 1,
  //     lng: 116.315156,
  //     lat: 40.159265,
  //     title: '谦太祥和',
  //     content: [
  //       '地址：北京市昌平区王庄工业园合福顺酒楼三楼',
  //       '电话：XXXXXXXXXXXX'
  //     ]
  //   }
  // ];
  // var map = new jqmap.BaiduMap({
  //   id: 'container3',
  //   level: 18, //  选填--地图级别--(默认15)
  //   zoom: true, // 选填--是否启用鼠标滚轮缩放功能--(默认false)
  //   type: ['地图', '卫星', '三维'], // 选填--显示地图类型--(默认不显示)
  //   width: 320, // 选填--信息窗口width--(默认自动调整)
  //   height: 70, // 选填--信息窗口height--(默认自动调整)
  //   titleClass: 'title',
  //   contentClass: 'content',
  //   showPanorama: true, // 是否显示全景控件(默认false)
  //   showMarkPanorama: true, // 是否显示标注点全景图(默认false)
  //   showLabel: false, // 是否显示文本标注(默认false)
  //   mapStyle: 'normal', // 默认normal,可选dark,light
  //   centerPoint: {
  //     // 中心点经纬度
  //     lng: 116.31464,
  //     lat: 40.159115
  //   },
  //   index: 1, // 开启对应的信息窗口，默认-1不开启
  //   animate: true, // 是否开启坠落动画，默认false
  //   points: points // 标注点--id(唯一标识)
  // });
  // console.log(map);
  // ******************
  // 固定定位标签显示
  var wh = $(window).height();
  console.log(wh);
  $(window).scroll(function() {
    var s = wh - $(window).scrollTop();
    var kk = $(window).scrollTop();
    console.log(kk);
    if (s < 450) {
      $('#fix_pic').css('display', 'block');
    } else {
      $('#fix_pic').css('display', 'none');
    }
  });
  // 点击固定定位标签，页面回到顶部
  $('#fix_pic').on('click', function() {
    $(window).scrollTop(0);
  });

  $(function() {
    // 登入按钮
    $('#login').on('click', function() {
      alert('请先登入');
    });

    // 注册按钮
    $('#enter').on('click', function() {
      alert('请先注册');
    });

    // 广播按钮
    $('#broad').on('click', function() {
      alert('想广播点啥？');
    });

    // 搜索按钮
    $('#import_search').on('click', function() {
      var key = $('#import').val();
      if (key === '') {
        alert('请先输入您需要查询的关键字');
      } else {
        alert('为您查询关键字为 ' + key + '的字段内容 ');
      }
    });

    // 点击加入我们
    $('#join').on('click', function() {
      alert('想要加入我们码？');
    });

    // 显示和隐藏
    $('.item_show').on('click', function() {
      $(this)
        .siblings()
        .toggle(500);
    });

    // 点击轮播图左侧按钮
    $('#btn_left').on('click', function() {
      // $('.lunbo').animate({ left: '+= -50px', fontSize: '3em' }, 'slow');
      $('.lunbo').css('left', '-250px');
    });

    // 点击轮播图右侧按钮
    $('#btn_right').on('click', function() {
      $('.lunbo').css('left', '0px');
    });
  });
});
