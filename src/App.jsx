import { useState } from 'react'
import Cards from './components/Cards/Cards'
import ItemList from './components/ItemList/ItemList'
import './App.css'


export default function App() {

    
    const [listHist, setHist = (item) => {
        const listHist = [...listHist, item]
        // window.localStorage.setItem('listStorage', listHist)
        return listHist
    }] = useState([])
    // const savedLocalStorage = !listHist ? null : localStorage.setItem('listItems', listHist);
    const [valorEntrada, setEntrada] = useState(0)
    const [valorSaida, setSaida] = useState(0)
    const [valorTotal, setTotal] = useState(0)
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [inputDate, setDate] = useState('')
    const [inputOption, setInput] = useState()

    
    function handleDate(dataString) {
        const data = new Date(dataString);

        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        const hora = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');

        const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`;

        console.log(data)
        return dataFormatada;

    }


    function addHist(inputDate, inputOption, description, value) {
        
        const id = Math.floor(Math.random() * 10000)
        const date = handleDate(inputDate)
        const handledValue = inputOption === 'Saida' ? parseFloat(value) * -1 : parseFloat(value)
        const item = {
            id: id,
            date: date,
            description: description,
            value: handledValue,
            option: inputOption,
            notHandledDate : inputDate
        }
        if(inputOption === 'Saida'){
            setSaida((currentValue) => currentValue + handledValue)
            setTotal((currentValue) => currentValue + handledValue)
        }
        if(inputOption === 'Entrada'){
            setEntrada((currentValue) => currentValue + handledValue)
            setTotal((currentValue) => currentValue + handledValue)
        }
        
        listHist.push(item)
        console.log(listHist)

        orderList()
    }

    function DeleteItem(id, value, option) {
        setHist(listHist.filter(item => item.id != id))
        if(option === 'Saida'){
            setSaida((currentValue) => currentValue - value)
            setTotal((currentValue) => currentValue - value)
        }
        if(option === 'Entrada'){
            setEntrada((currentValue) => currentValue - value)
            setTotal((currentValue) => currentValue - value)
        }

        orderList()
    }

    function orderList(){
        listHist.sort(function (a, b){
            return new Date(b.notHandledDate) - new Date(a.notHandledDate)
        })
    }

    function handleClick(ev) {
        ev.preventDefault()
        if(!inputDate || !inputOption || !description || !value) {
            alert('Preencha corretamente as informações!')
        } else {
            addHist(inputDate, inputOption, description, value)
            setDescription('')
            setValue('')
        }
        
    }

    function handleValue(ev) {
        if (ev.target.value >= 0 && ev.target.value <= 99999999999) {
            setValue(ev.target.value)
        }
    }

    return (
        <div className="app">
            <div className="page">
                <div className="title">
                    <h1>Controle Financeiro</h1>
                </div>
                <div className="cards-infos-geral">
                    <Cards
                        title='Entradas'
                        CardValue={valorEntrada}
                        icon='./adicionar.png'
                    />

                    <Cards
                        title='Saída'
                        CardValue={valorSaida}
                        icon='menos.png'
                    />
                    <Cards
                        title='Total'
                        CardValue={valorTotal}
                        icon='dolar.png'
                    />
                </div>

                <div className="new-item">
                    <form className='form'>
                        <div className="description">
                            <label>Descrição</label><br />
                            <input
                                type="text"
                                value={description}
                                onChange={(ev) => setDescription(ev.target.value)}
                            />
                        </div>
                        <div className="value">
                            <label>Valor</label><br />
                            <input
                                type="text"
                                value={value}
                                onChange={handleValue}
                            />
                        </div>
                        <div className="options">
                            <input
                                type="radio"
                                name='inputOption'
                                value='Entrada'
                                onChange={ev => setInput(ev.target.value)}
                            />
                            <label htmlFor="">Entrada</label>
                            <br />
                            <input
                                type="radio"
                                name='inputOption'
                                value='Saida'
                                onChange={ev => setInput(ev.target.value)}
                            />
                            <label htmlFor="">Saída</label>
                        </div>
                        <div className="date-input">
                            <label htmlFor="">Data</label>
                            <input
                                type="datetime-local"
                                value={inputDate}
                                onChange={(ev) => setDate(ev.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleClick}
                        >ADICIONAR</button>
                    </form>
                </div>

                <div className="hist">
                    <div className="list-hist">
                        {listHist.length >= 1
                            ? listHist.map(({ description, value, option, id, date }) => {
                                return (
                                        <ItemList
                                            key={id}
                                            description={description}
                                            value={value}
                                            option={option}
                                            date={date}
                                            deleteItem={() => DeleteItem(id, value, option)}
                                        />
                                    // <p>Há itens na lista!</p>
                                )
                            })
                            : <p>Não há nenhum item ainda!</p>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}