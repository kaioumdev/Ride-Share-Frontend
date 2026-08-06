import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
    }

    return (
        <div className='px-4 py-2'>
            {suggestions.length === 0 && (
                <div className='text-center py-8'>
                    <i className='ri-map-pin-line text-3xl text-slate-300 mb-2 block'></i>
                    <p className='text-slate-400 text-sm'>Start typing to see suggestions</p>
                </div>
            )}
            {suggestions.map((elem, idx) => (
                <div
                    key={idx}
                    onClick={() => handleSuggestionClick(elem)}
                    className='flex items-center gap-3 p-3 hover:bg-slate-50 active:bg-indigo-50 rounded-xl cursor-pointer transition-colors border-b border-slate-50 last:border-0'
                >
                    <div className='w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <i className="ri-map-pin-fill text-indigo-600 text-sm"></i>
                    </div>
                    <p className='text-sm font-medium text-slate-700 line-clamp-2'>{elem}</p>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel
