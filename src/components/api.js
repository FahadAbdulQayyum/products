import React from 'react'
import axios from 'axios'
import '../App.css'
import { useState, useEffect } from 'react'

const Api = () => {

    const [pro, setPro] = useState([])
    // const [search, setSearch] = useState([])
    const [search, setSearch] = useState(false)
    // const [search, setSearch] = useState([])
    const [filter, setFilter] = useState(false)
    const [sort, setSort] = useState(false)
    // const [sortByName, setSortByName] = useState()
    // const [sortByPrice, setSortByPrice] = useState()
    // const [filterByName, setFilterByName] = useState()
    // const [filterByPrice, setFilterByPrice] = useState()

    useEffect(() => {
        axios.get(`https://dummyjson.com/products`)
            .then((res) => {
                console.log('res', res?.data?.products)
                setPro(res?.data?.products)
                console.log('pro', pro)
            })
    }, [])

    const onChange = e => {
        console.log('e', e?.target?.value)
        axios.get(`https://dummyjson.com/products/search?q=${e?.target?.value}`)
            .then((res) => {
                setSearch(true)
                console.log('search res', res)
                // setSearch(res?.data?.products)
                setPro(res?.data?.products)
                // console.log('pro', pro)
            })
    }

    const setFilterByNameFunc = (a) => {
        pro.filter()
        console.log('setFilter', pro)
    }
    const setFilterByPriceFunc = () => { }

    const setSortByNameFunc = () => {
        let arrTemp = [...pro].sort((a, b) => a.title.localeCompare(b.title))
        setPro(arrTemp)
        console.log('pro', arrTemp);
    }
    const setSortByPriceFunc = () => {
        const temp = [...pro].sort((a, b) => {
            return b.price - a.price;
        });
        setPro(temp);
    }


    return (
        <div className='main'>
            <input type="text" placeholder='Enter for filter, sort or search' className='input'
                onChange={(e) => onChange(e)}
            />
            {/* <input type="submit" value={'Submit'} className='btn' /> */}
            {!filter ?
                <input type="submit" value={'Filter'} className='btn' onClick={() => setFilter(true)} />
                :
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <p>Filter via</p>&nbsp;
                    <input type="submit" value={'Name'} className='btn sub' onClick={(e) => setFilterByNameFunc(e)} />
                    <input type="submit" value={'Price'} className='btn sub' onClick={(e) => setFilterByPriceFunc(e)} />
                </div>
            }
            {!sort ?
                <input type="submit" value={'Sort'} className='btn' onClick={() => setSort(true)} />
                :
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <p>Sort via</p>&nbsp;
                    <input type="submit" value={'Name'} className='btn sub' onClick={() => setSortByNameFunc()} />
                    <input type="submit" value={'Price'} className='btn sub' onClick={setSortByPriceFunc} />
                </div>
            }
            <div className='divMain' >
                {
                    // !search ?
                    pro.map((v, i) => {
                        // console.log('search in pro', search);
                        // console.log('pro in pro', pro);
                        return (
                            <div key={i} className='div'>
                                <div className='divimg'>
                                    <img src={v.thumbnail} className='img' />
                                </div>
                                <p>{v.title}</p>
                                <span className='span'>
                                    <p>$</p>
                                    <p>{v.price}</p>
                                </span>
                            </div>
                        )
                    })
                    // :
                    // "wow"

                    // search.map((v, i) => {
                    //     // console.log('search in search', search);
                    //     // console.log('pro in search', pro);
                    //     return (
                    //         <div key={i} className='div'>
                    //             <div className='divimg'>
                    //                 <img src={v.thumbnail} className='img' />
                    //             </div>
                    //             <p>{v.title}</p>
                    //             <span className='span'>
                    //                 <p>$</p>
                    //                 <p>{v.price}</p>
                    //             </span>
                    //         </div>
                    //     )
                    // })
                }
            </div>
        </div >
    )
}

export default Api
