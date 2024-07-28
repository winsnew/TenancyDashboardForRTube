import NavLanding from "../navLanding"

const LandingLayout = ({children}) => {
    return (
        <>
            <NavLanding/>
            {children}
        </>
    )
}

export default LandingLayout