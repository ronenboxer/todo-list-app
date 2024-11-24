import { ChevronDownIcon } from '@elementor/icons';
import { TableHead, TableRow, TableCell, Typography, IconButton, Box } from '@elementor/ui';

export function ItemListHeader( { columns, onSort, selectedSort } ) {

    return (
        <TableHead className='item-list-header'>
            <TableRow>
                { columns.map( ( column, index ) => (
                    <TableCell key={ column.key }>
                        <Box sx={ {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                        } }>
                            <Typography variant="h6">{ column.label }</Typography>
                            { column.sortable
                                ? <IconButton className={ `sort-button ${ index === selectedSort.index ? 'selected' : '' }` } onClick={ () => onSort( index ) } sx={ {
                                        transform: index === selectedSort.index && ! selectedSort.isAsc ? 'rotate(180deg)' : 'rotate(0)',
                                    } }>
                                <ChevronDownIcon/>
                                </IconButton>
                                : null
                            }
                        </Box>
                    </TableCell>
                ) ) }
            </TableRow>
        </TableHead>
    );
}