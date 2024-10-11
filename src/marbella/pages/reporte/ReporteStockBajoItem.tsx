import React from 'react'
import { Producto } from '../../types/Producto'

type ReporteItemProps = {
    reporte: Producto
}

export const ReporteStockBajoItem: React.FC<ReporteItemProps> = ({ reporte }) => {
    return (
        <tr>
            <td className="border border-gray-300 px-4 py-2">
                {reporte.nombrePro}
            </td>
            <td className="border border-gray-300 px-4 py-2">
                {reporte.descripcionPro}
            </td>
            <td className="border border-gray-300 px-4 py-2">
                {reporte.precioPro}
            </td>
            <td className="border border-gray-300 px-4 py-2">
                {reporte.stockActual}
            </td>
            <td className="border border-gray-300 px-4 py-2">
                {reporte.stockMin}
            </td>
        </tr>
    )
}
