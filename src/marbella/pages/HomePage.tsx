
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { MarbellaProvider } from "../../context/MarbellaProvider"

export const HomePage = () => {
    return (
        <>
            <Header />
            <div className="container mx-auto">
                <MarbellaProvider>
                    <Outlet />
                </MarbellaProvider>
            </div>
            <Footer />
        </>

    )
}
