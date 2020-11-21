import { Map, HeatMap, GoogleApiWrapper } from 'google-maps-react'

const gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ];

  const positions = [
    { lat: -27.7008117, lng: -48.5012206 },
    { lat: -27.7008117, lng: -48.5012206 },
    { lat: -27.7008117, lng: -48.5012206 },
    { lat: -27.7008117, lng: -48.5010000 },
    { lat: -27.7008117, lng: -48.5010000 },
    { lat: -27.7008117, lng: -48.5010000 },
    { lat: -27.7008117, lng: -48.5010000 },
    { lat: -27.7008117, lng: -48.5012206 },
    { lat: -27.7008117, lng: -48.5012206 },
    { lat: -27.7008117, lng: -48.5012206 },
    { lat: -27.7008117, lng: -48.5012206 },
    { lat: -27.7008117, lng: -48.5012206 },
    { lat: -27.7008117, lng: -48.5012206 },
    { lat: -27.7008117, lng: -48.5012206 },
    { lat: -27.7008117, lng: -48.5000000 },
    { lat: -27.7008117, lng: -48.5000000 },
    { lat: -27.7008117, lng: -48.5000000 }
  ];

function MapWrapper ({ google }) {
    return (
        <div>
            <Map
                google={google}
                initialCenter={{ lat: -27.7008117, lng: -48.5012206 }}
            >
                <HeatMap
                    gradient={gradient}
                    opacity={0.3}
                    positions={positions}
                    radius={20}
                />
            </Map>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDWkBbWLBlbtMQ_-MZMG2iJ-k3IbAuTQH8",
    libraries: ["visualization"]
})(MapWrapper);
