import { Box, Container } from "@mui/material"
import Navbar from "../navbar"
import Sidebar from "../sidebar"
import Footer from "../footer"
import { useMode } from "../../styles/theme"
import { useState } from "react"

const Main = ({children}) => {
    const [isSidebar, setIsSidebar] = useState(true)
    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar}/>
            <main className="content">
                <Navbar setIsSidebar={setIsSidebar}/>
                {children}
                {/* <Footer/> */}
            </main>
        </div>
    )
}

export default Main