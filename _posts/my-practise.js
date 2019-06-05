class myPromse {
  constructor ( executor ) {
    let state = "pending",
      value,
      reason;

    let resolve = val => {
      if ( this.state === "pending" ) {
        this.state = "fulfilled";
        this.value = val;
      }
    };
    let reject = reason => {
      if ( this.state === "pending" ) {
        this.state = "rejected";
        this.reason = reason;
      }
    };
    try {
      executor( resolve, reject );
    } catch ( err ) {
      reject( err );
    }
  }
}

var person1 = {
  toLocaleString: function () {
    return "Nikolaos";
  },

  toString: function () {
    return "Nicholas";
  }
};

var person2 = {
  // toLocaleString: function () {
  //   return "Grigorios";
  // },
  // toString: function () {
  //   return "Greg";
  // }
};

var people = [ person1, person2 ];
console.log( people ); // Nicholas,Greg
console.log( people.toString() ); // Nicholas,Greg
console.log( people.toLocaleString() ); // Nikolaos,Grigorios

var sum = arr.reduce( ( p, c ) => p + ( Array.isArray( c ) ? sum( c ) : c ), 0 );
var flatArr = arr.reduce(
  ( p, c ) => p.concat( Array.isArray( c ) ? flatArr( c ) : c ),
  []
);

router.beforeEach( ( to, from, next ) => {
  // ...
} );

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get( "/user/12345", {
    cancelToken: source.token
  } )
  .catch( function ( thrown ) {
    if ( axios.isCancel( thrown ) ) {
      console.log( "Request canceled", thrown.message );
    } else {
      // handle error
    }
  } );

axios.post(
  "/user/12345",
  {
    name: "new name"
  },
  {
    cancelToken: source.token
  }
);

// cancel the request (the message parameter is optional)
source.cancel( "Operation canceled by the user." );

// 单例模式
var getInstance = function ( fn ) {
  let result;
  return result || ( result = fn.call( this, arguments ) );
}

// 防抖和节流都用闭包
function debounce ( fn, interval = 300 ) {
  let timeout = null;
  return function ( ...args ) {
    clearTimeout( timeout );
    setTimeout( () => {
      fn.apply( this, args );
    }, interval );
  };
}

function throttle ( fn, interval ) {
  let canRun = true;
  return function ( ...args ) {
    if ( !canRun ) return;
    canRun = false;
    setTimeout( () => {
      fn.apply( this, args );
      canRun = true;
    }, interval )
  }
}

var count = 0;
var fibonacci = function ( n ) {
  count++;
  return n < 2 ? n : fibonacci( n - 1 ) + fibonacci( n - 2 );
};
for ( var i = 0; i <= 10; i++ ) {
  fibonacci( i );
}
console.log( count ); // 453


// 下拉刷新
( function ( window ) {
  var _element = document.getElementById( 'refreshContainer' ),
    _refreshText = document.querySelector( '.refreshText' ),
    _startPos = 0,
    _transitionHeight = 0;

  _element.addEventListener( 'touchstart', function ( e ) {
    console.log( '初始位置：', e.touches[ 0 ].pageY );
    _startPos = e.touches[ 0 ].pageY;
    _element.style.position = 'relative';
    _element.style.transition = 'transform 0s';
  }, false );

  _element.addEventListener( 'touchmove', function ( e ) {
    console.log( '当前位置：', e.touches[ 0 ].pageY );
    _transitionHeight = e.touches[ 0 ].pageY - _startPos;

    if ( _transitionHeight > 0 && _transitionHeight < 60 ) {
      _refreshText.innerText = '下拉刷新';
      _element.style.transform = 'translateY(' + _transitionHeight + 'px)';

      if ( _transitionHeight > 55 ) {
        _refreshText.innerText = '释放更新';
      }
    }
  }, false );

  _element.addEventListener( 'touchend', function ( e ) {
    _element.style.transition = 'transform 0.5s ease 1s';
    _element.style.transform = 'translateY(0px)';
    _refreshText.innerText = '更新中...';

    // todo...
  }, false );
} )( window );
// CSS,canvas,svg，js
// css旋转中心和其他不同，


for ( let i = 0; i < 20; i++ ) {
  setTimeout( () => {
    console.log( 1 )
    window.requestAnimationFrame( step );
  }, 1000 )
}

var images = new Array()
function preload () {
  for ( i = 0; i & lt; preload.arguments.length; i++) {
    images[ i ] = new Image()
    images[ i ].src = preload.arguments[ i ]
  }
}
preload(
  "http://qiniu.cllgeek.com/react02.png",
  "http://qiniu.cllgeek.com/react03.png",
  "http://qiniu.cllgeek.com/react04.png"
) 


