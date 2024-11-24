import { useState } from 'react';
import { TableContainer, Table, TableBody, Box, Button } from '@elementor/ui';
import { ItemListHeader } from './item-list-header';
import { ItemPreview } from './item-preview';
import { useTodos } from '../hooks/use-todos';
import { DELETE_TODO, SET_TODOS } from '../store/todos-reducer';
import { TodoService } from '../services/todo.service';
import { Link, useNavigate } from 'react-router-dom';
import { makeId } from '../services/utils.service';
import { NewItem } from './new-item';

export function ItemList( { items } ) {
    const [ sortIndex, setSortIndex ] = useState( { index: 0, isAsc: true } );
    const { dispatch } = useTodos();
    const columns = [
        { key: 'index', label: '#', sortable: true },
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', sortable: true },
        { key: 'createdAt', label: 'Created At', isDate: true, sortable: true },
        { key: 'updatedAt', label: 'Updated At', isDate: true, sortable: true },
        { key: 'actions', label: 'Actions', altContent: ( id ) => (
            <>
                <Button onClick={ () => navigate( `/item/${ id }edit` ) }>Edit</Button>
                <Button onClick={ () => cloneItem( id ) }>Clone</Button>
                <Button onClick={ ( e ) => onDeleteTodo( e, id ) }>Delete</Button>
            </>
        ) },
    ];

    const navigator = useNavigate();

    function handleSort( index ) {
        if ( ! columns[ index ].sortable ) {
            return;
        }

        setSortIndex( ( currSort ) => sortIndex.index === index
            ? { index, isAsc: ! currSort.isAsc }
            : { index, isAsc: true }
        );
    }

    function navigate( url ) {
        navigator( url );
    }

    function cloneItem( id ) {
        const mewItem = { id: makeId(), ...items.find( item => item.id === id ) };
        dispatch( { type: SET_TODOS, payload: [ ...items, mewItem ] } );

        TodoService
            .cloneItem( id )
            .then( ( item ) => {
                dispatch( { type: DELETE_TODO, payload: mewItem.id } );
                
                if ( item ) {
                    dispatch( { type: SET_TODOS, payload: [ ...items, item ] } );
                }
            } );
    }

    function onDeleteTodo( event, id ) {
        event.preventDefault();

        const itemsBackup = [ ...items ];

        dispatch( { type: DELETE_TODO, payload: id } );

        TodoService
            .deleteItem( id )
            .then( ( res ) => {
                if ( ! res ) {
                    dispatch( { type: SET_TODOS, payload: itemsBackup } );
                }
            } )
    }

    function getSortedItems() {
        return [ ...items ].sort( ( itemA, itemB ) => ( itemA[ columns[ sortIndex.index ].key ] > itemB[ columns[ sortIndex.index ].key ]
            ? 1
            : -1 ) * ( sortIndex.isAsc ? 1 : 1 ) );
    }

    const sortedItems = getSortedItems();

    return (
        <TableContainer>
            <Table>
                <ItemListHeader columns={ columns } onSort={ () => handleSort } selectedSort={ sortIndex }/>
                <TableBody className="item-list-body">
                    { sortedItems.map( ( item ) => (
                        <ItemPreview item={ sortedItems[ 0 ] } key={ item.id } columns={ columns }/>
                    ) )}
                    <NewItem columns={ columns }/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}