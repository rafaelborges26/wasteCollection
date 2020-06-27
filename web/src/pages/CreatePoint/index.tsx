import React, { useEffect, useState, ChangeEvent } from 'react'
import './styles.css'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet' //marker é o alfinete q aparece no mapa
import api from '../../services/api'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'

interface Item {
    id: number,
    title: string,
    image_url: string
}

interface IBGEUFresponse {
    sigla: string
}

interface IBGECityresponse {
    nome: string
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]) //sempre q criamos um estado para um array ou objt: informar manualmente o tipo da var, para isso criamos uma interface
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])

    const [ufselected, setUfSelected] = useState('0')
    const [citySelected, setCitySelected] = useState('0')
    const [selectMapPosition, setSelectMapPosition] = useState<[number,number]>([0,0])
    const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0])


    useEffect(() => { //funcao do q fazer e quando fazer
        api.get('items').then(response => { //entao buscamos os items da api
            setItems(response.data) //setando os dados da api para o estado. Assim a const items tera os valores do json
        }) 
    },[]) //nesse caso [] se ficar sem nd so vai recarregar uma vez
 
    useEffect(() => {
        axios.get<IBGEUFresponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => { //<IBGEUFresponse> faz o retorno ficar igual o da interface
            const ufInitials = response.data.map(uf => uf.sigla) //pegando as siglas
            setUfs(ufInitials)
        })
    },[])

    useEffect(() => {
        //carregar sempre que o usuario selecionar uma uf
        if(ufselected === '0')
            return

        axios.get<IBGECityresponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufselected}/municipios`).then(response => { 
            const citynames = response.data.map(city => city.nome) //pegando o nome da cdd
            setCities(citynames)
        })
    },[ufselected]) //toda vez q a var mudar ele recarregar o useEffector


    useEffect( () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setInitialPosition([latitude, longitude])
        })

    })


    function handleChangeUF(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value //pegar o valor q o user selecionou
        setUfSelected(uf)
    }

    function handleChangeCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value
        setCitySelected(city)
    }

    function handleSelectMap(event: LeafletMouseEvent) {
        setSelectMapPosition([event.latlng.lat, event.latlng.lng])
    }

    return (
        <div id="page-create-point">
        <header>
            <img src={logo} alt="Ecoleta"/>
            <Link to="/">
                <FiArrowLeft/>
                Voltar para home
            </Link>
        </header>

        <form> 
            <h1>Cadastro do ponto de coleta</h1>

            <fieldset>
                <legend>
                    <h2>Dados</h2>
                </legend>
            </fieldset>

            <div className="field">
                    <label htmlFor="name">Nome da entidade</label>
                    <input type="text"
                           name="name"
                           id="name"
                    />
            </div>

            <div className="field-group">
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input type="email"
                           name="email"
                           id="email"
                    />
                </div>
                <div className="field">
                    <label htmlFor="whatsapp">Whatsapp</label>
                    <input type="text"
                           name="whatsapp"
                           id="whatsapp"
                    />
                </div>
            </div>

            <fieldset>
                <legend>
                    <h2>Endereço</h2>
                    <span>Selecione o endereço no mapa</span>
                </legend>

                <Map center={initialPosition} zoom={14} onClick={handleSelectMap} >
                <TileLayer ////layout do mapa
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={selectMapPosition}/> 

                </Map>
                <div className="field-group">
                    <div className="field">
                        <label htmlFor="uf">Estado (UF)</label>
                        <select value={ufselected} name="uf" id="uf" onChange={handleChangeUF}>
                            <option value="0">Selecione um estado</option>
                            {ufs.map(uf => (
                            <option key={uf} value={uf} >{uf}</option>
                            ))}  
                        </select>
                    </div>
                    <div className="field"> 
                        <label htmlFor="city">Cidade</label>
                        <select value={citySelected} onChange={handleChangeCity} name="city" id="city">
                            <option value="0">Selecione uma cidade</option>
                            {cities.map(city => (
                                <option key= {city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>

            </fieldset>

            <fieldset>
                <legend>
                    <h2>Ítens de Coleta</h2>
                    <span>Selecione um ou mais ítens abaixo</span>
                </legend>

                <ul className="items-grid">
                    {items.map(items => (
                        <li key={items.id} className="selected">
                        <img src={items.image_url} alt="Oleo"/>
                        <span>{items.title}</span>
                    </li>
                    ))}
                </ul>
            </fieldset>
            <button type="submit">Cadastrar ponto de coleta</button>
        </form>
        </div>



    )
        
} 

export default CreatePoint