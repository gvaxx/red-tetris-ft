import React from "react"

export const MainWindow = ({children, title}) => (
    <section className='nes-container with-title main-window'>
        <h3 className="title">{title}</h3> 
        {children}
    </section>
)
