import './ItemList.css'

export default function ItemList({ description, value, option, id, date, deleteItem }) {

    return (
        <div className="ItemHist" key={id}>
            <div
                className="item-list"
            >
                <div className="texts text-description">
                    <p>{description}</p>
                </div>
                <div className="texts text-value">
                    <p>R${value.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</p>
                </div>
                <div className="texts text-date">
                    <p>{date}</p>
                </div>
                <div className="texts text-option">
                    <p>{value < 0 ? `- ${option}` : `+ ${option}`}</p>
                </div>
                <button
                    id='deleteButton'
                    onClick={deleteItem}
                >Excluir</button>
            </div>
            <hr />
        </div>
    )
}