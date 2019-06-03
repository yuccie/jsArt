class myPromse {
  constructor ( executor ) {
    let state = 'pending',
      value, reason;

    let resolve = val => {
      if ( this.state === 'pending' ) {
        this.state = 'fulfilled';
        this.value = val;
      }
    };
    let reject = reason => {
      if ( this.state === 'pending' ) {
        this.state = 'rejected';
        this.reason = reason;
      }
    };
    try {
      executor( resolve, reject );
    } catch ( err ) {
      reject( err )
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

var sum = arr.reduce( ( p, c ) => p + ( Array.isArray( c ) ? sum( c ) : c ), 0 )
var flatArr = arr.reduce( ( p, c ) => p.concat( ( Array.isArray( c ) ? flatArr( c ) : c ) ), [] )







