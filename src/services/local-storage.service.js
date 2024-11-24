function get( key ) {
     return new Promise( ( resolve ) => {
    setTimeout(() => {
        return resolve( JSON.parse( localStorage.getItem( key ) ?? 'null' ) );
    }, 1500);
  } );
}

function set( key, value ) {
    localStorage.setItem( key, JSON.stringify( value ) );

    return get( key );
}

export const LocalStorageService = {
    get,
    set,
};