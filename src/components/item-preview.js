import { TableRow, TableCell, Tooltip, Button } from '@elementor/ui';
import { useNavigate } from 'react-router-dom';

export function ItemPreview( { item, columns } ) {
    const navigator = useNavigate();

    function navigate( url ) {
        navigator( url );
    }

    return (
        <TableRow>
            { columns.map( ( column, index ) => (
                    <TableCell key={ column.key }>
                       { column.altContent
                        ? column.altContent( item.id )
                        : item[ column.key ] || 0 === item[ column.key ]
                            ?<Tooltip title={ 'Details' }>
                                <Button onClick={ () => navigate( `/item/${ item.id }` )}>
                                { column.isDate
                                    ? new Date( item[ column.key ] ).toLocaleString()
                                    : item[ column.key ]
                                }
                                </Button>
                            </Tooltip>
                            : null
                        }
                    </TableCell>
                ) ) }
        </TableRow>
    );
}