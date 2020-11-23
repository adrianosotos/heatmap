import { useEffect, useState } from 'react'
import axios from 'axios'

import Form from './components/Form'
import MapWrapper from './components/Map'

import './styles/App.css';

function App() {
    const [requestStatus, setRequestStatus] = useState(null)
    const [positions, setPosition] = useState([])
    
    useEffect(() => {
        fetchLocations()
    }, [requestStatus])

    function fetchLocations () {
        axios.get('http://localhost:5000/address')
            .then(({ data }) => {
                console.log(data)
                setPosition(parsePositon(data))
            })
    }

    function parsePositon (positions = []) {
        return positions.map(({ longitude, latitude, residents }) => ({
            lat: latitude,
            lng: longitude,
            weight: Number(residents)
        }))
    }
    return (
        <div className="App">
            <div className={`feedback ${requestStatus}`}>
                {requestStatus === 'success' ? 'Enviado' : 'Falha no envio'}
            </div>
            <Form requestStatus  setRequestStatus={setRequestStatus} />
            <MapWrapper positions={positions}/>
        </div>
    );
}

export default App;
