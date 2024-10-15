import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootState';
import { ReporteStockBajoItem } from './ReporteStockBajoItem';


export const ReporteStockLista = () => {

    const { reporteStockBajo } = useSelector((state: RootState) => state.reporte);
    return (
        <div className="font-sans overflow-x-auto p-4 mt-4">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border-y border-gray-100 bg-gray-50/50 p-2">Nombre</th>
                            <th className="border-y border-gray-100 bg-gray-50/50 p-2">Descripción</th>
                            <th className="border-y border-gray-100 bg-gray-50/50 p-2">Precio (S/.)</th>
                            <th className="border-y border-gray-100 bg-gray-50/50 p-2">Stock Actual</th>
                            <th className="border-y border-gray-100 bg-gray-50/50 p-2">Stock Minimo</th>
                        </tr>
                    </thead>
                    <tbody id="attendees-list">
                        {reporteStockBajo.map((reporte, index) => {
                            return <ReporteStockBajoItem key={index} reporte={reporte} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
