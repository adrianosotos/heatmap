import { useEffect, useState } from 'react'
import { Map, HeatMap, GoogleApiWrapper } from 'google-maps-react'

function MapWrapper ({ google, positions }) {
    const [initalCenter, setInitialCenter] = useState({ lat: -27.7008117, lng: -48.5012206 })
    useEffect(() => { 
        setInitialCenter({ lat: -27.7008117, lng: -48.5012206 })
    }, [positions])
    return (
        <div>
            <Map
                google={google}
                initialCenter={initalCenter}
            >
                <HeatMap
                    opacity={0.3}
                    position={{positions}}
                    positions={positions}
                    radius={20}
                    
                />
            </Map>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_APIKEY,
    libraries: ["visualization"]
})(MapWrapper);
