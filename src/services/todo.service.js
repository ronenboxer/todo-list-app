import { LocalStorageService } from './local-storage.service';
import { makeId } from './utils.service';

const LOCAL_STORAGE_KEY = 'todo-list';

const DEFAULT_DATA = [
    {
        id: makeId(),
        createdAt: new Date() - 1000 * 60 * 60 * 24 * 3,
        title: 'Buy milk',
        description: 'Buy milk from the store',
    },
    {
        id: makeId(),
        createdAt: new Date() - 1000 * 60 * 60 * 24 * 2,
        title: 'Do homework',
        description: 'Do homework',
    },
    {
        id: makeId(),
        createdAt: new Date() - 1000 * 60 * 60 * 24,
        title: 'Go to the gym',
        description: 'Go to the gym',
    },
    {
        id: makeId(),
        createdAt: new Date() - 0,
        title: 'Read a book',
        description: 'Read a book',
    }
];

async function getItems() {
    const items = await LocalStorageService.get( LOCAL_STORAGE_KEY );

    if ( items ) {
        return items;
    }

    return await restoreDefault();
}

async function getItem( id ) {
    const items = await getItems();

    return items.find( item => item.id === id );
}

function newItem() {
    return {
        id: makeId(),
        title: '',
        description: '',
        createdAt: new Date() - 0,
    };
}

async function addItem( item ) {
    const items = await getItems();
    if ( ! item.id || ! item.title || items.find( i => i.id === item.id ) ) {
        return false;;
    }

    items.push( item );

    LocalStorageService.set( LOCAL_STORAGE_KEY, items );

    return true;
}

async function editItem( updatedItem ) {
    const items = await getItems(),
        index = items.findIndex( i => i.id === updatedItem.id );

    if ( -1 === index ) {
        return false;
    }

    for ( let key in updatedItem ) {
        items[ index ][ key ] = updatedItem[ key ];
    }

    items[ index ].updatedAt = new Date();

    LocalStorageService.set( LOCAL_STORAGE_KEY, items );

    return items[ index ];
}

async function cloneItem( id ) {
    const item = await getItem( id );

    if ( ! item ) {
        return false;
    }

    const newItem = {
        ...item,
        id: makeId(),
        createdAt: new Date(),
        updatedAt: null,
    };

    await addItem( newItem );

    return newItem;
}

async function deleteItem( id ) {
    const items = await getItems(),
        index = items.findIndex( i => i.id === id );

    if ( -1 === index ) {
        return false;
    }

    items.splice( index, 1 );

    await LocalStorageService.set( LOCAL_STORAGE_KEY, items );

    return true;
}

async function restoreDefault() {
    LocalStorageService.set( LOCAL_STORAGE_KEY, DEFAULT_DATA );

    return LocalStorageService.get( LOCAL_STORAGE_KEY );
}

export const TodoService = {
    getItems,
    getItem,
    newItem,
    addItem,
    editItem,
    cloneItem,
    deleteItem,
    restoreDefault,
};