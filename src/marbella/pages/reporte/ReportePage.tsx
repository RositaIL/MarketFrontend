import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { obtenerReporteStockBajo } from '../../../store/thunks/thunkReporte';
import { useDispatch, useSelector } from 'react-redux';
import { StoreDispatch } from '../../../store/store';
import { RootState } from '../../../store/rootState';
import { ReporteStockLista } from './ReporteStockLista';
import { SiParamountplus } from "react-icons/si";
import imagenLogo from '../../../data/logo-Login.png'

export const ReportePage = () => {

    const dispatch: StoreDispatch = useDispatch();

    const { reporteStockBajo } = useSelector((state: RootState) => state.reporte);

    useEffect(() => {
        dispatch(obtenerReporteStockBajo())
    }, [])

    return (
        <div>
            <div className="w-full mt-6">
                <img src={imagenLogo} alt="logo" className='w-20 mx-auto block' />
                <h1 className='font-bold text-center text-black text-2xl'>Reporte de productos con stock bajo</h1>
            </div>
            <ReporteStockLista />
            <div className="flex w-2/3 justify-center mx-auto mt-8">
                <div>
                    <NavLink to={'/productos'} className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3 mt-4">
                        Regresar a productos
                    </NavLink>
                </div>
                <div className="flex w-full justify-end">
                    <div className="col-span-9 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white shadow-sm rounded p-4">
                            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                                <SiParamountplus className='w-4 h-4' />
                            </div>
                            <div className="flex flex-col flex-grow ml-4">
                                <div className="text-sm text-gray-500">Cantidad de Productos</div>
                                <div className="font-bold text-lg"><span id="meeting-total">{reporteStockBajo.length}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-white shadow-sm rounded p-4">
                            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                                <SiParamountplus className='w-4 h-4' />
                            </div>
                            <div className="flex flex-col flex-grow ml-4">
                                <div className="text-sm text-gray-500">Stock más bajo</div>
                                <div className="font-bold text-lg"><span id="yearly-cost-result">0</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
