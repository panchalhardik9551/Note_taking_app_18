import React, { useEffect, useState } from 'react'


const getlocalitem = () => {
    let list = localStorage.getItem('lists')
    if (list) {
        return JSON.parse(localStorage.getItem('lists'))
    } else {
        return []
    }
}

export default function Todo() {

    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getlocalitem())
    const [toggle, setToggle] = useState(true);
    const [editnew, setEditnew] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('plz fill data')
        } else if (inputData && !toggle) {
            setItems(
                items.map((elem) => {
                    if (elem.id === editnew) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setToggle(true)
            setInputData('')
            setEditnew(null)
        } else {
            const allinputdata = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allinputdata]);
            setInputData('')
        }

    }

    const deleteItem = (indexdata) => {
        const updateitems = items.filter((elem) => {
            return indexdata !== elem.id;
        })
        setItems(updateitems)
    }

    const removeAll = () => {
        setItems([])
    }

    const editItem = (id) => {
        let newItem = items.find((elem) => {
            return elem.id === id
        })
        setToggle(false)
        setInputData(newItem.name)
        setEditnew(id)
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <figcaption style={{fontSize:"20px"}}><b>Add Your list here</b> </figcaption>
                    </figure>
                    <div className="addItem">
                       <div className='text'> 
                       <textarea type="text" className='note' cols="24" rows="7" placeholder='Add Items...'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                       </div>
                       
                        {
                            toggle ? <i className='fa fa-plus add-btn fa-2x' title='Add Item' onClick={addItem}></i> : <i className='fa fa-pencil-square fa-2x pen' title='Edit' onClick={addItem}></i>

                        }
                        <div>

                            <button style={{cursor:"pointer", padding:"5px 10px", marginTop:"10px"}} data-sm-link-text="Remove All" onClick={removeAll}><span>Remove All</span></button>
                        </div>

                    </div>
                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <>
                                        <div>
                                            <div className="eachItem" key={elem.id}>
                                                <h3>{elem.name} </h3>
                                            </div>
                                            <div className='edit'>
                                                <i className="fa fa-pencil-square fa-2x" aria-hidden="true" title='Edit' onClick={() => editItem(elem.id)}></i>
                                                <i className="fa fa-trash add-btn fa-2x" title='Delete' onClick={() => deleteItem(elem.id)}></i>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                    

                </div>
            </div>
        </>
    )
}
