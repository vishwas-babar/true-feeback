import React from 'react'

const Overlay = ({ isActive }: { isActive: boolean }) => {
    return (
        <div className={`absolute inset-0 opacity-30 bg-slate-300 ${isActive ? "" : "hidden"}`}>

        </div>
    )
}

export default Overlay