import './Card.css'

export default function Card({ title, icon, CardValue }) {
    return (
        <div className="card-div">

            <div className='card-infos'>
                <h3 className="card-title">{title}</h3>
                <img src={icon} className='icon' />
            </div>
            <p className="card-value">R${CardValue.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</p>

        </div>
    )
}