import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

// import { Pagination, Stack } from '@mui/material';

const Api = () => {

    let init = 0

    const [pro, setPro] = useState([])
    const [searchArr, setSearchArr] = useState([])
    const [searchLimit, setSearchLimit] = useState([])
    const [prev, setPrev] = useState(false)
    // const [search, setSearch] = useState([])
    const [searchh, setSearchh] = useState(false)
    const [search, setSearch] = useState(false)
    // const [search, setSearch] = useState([])
    const [filter, setFilter] = useState(false)
    const [sort, setSort] = useState(false)
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
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

    // const onChange = e => {
    // const onChange = () => {
    const onChange = (init = 0, limit = 5) => {
        // console.log('e', e?.target?.value)
        // axios.get(`https://dummyjson.com/products/search?q=${e?.target?.value}`)
        axios.get(`https://dummyjson.com/products/search?q=${searchh}`)
            .then((res) => {
                setSearch(true)
                console.log('search res', res)
                // setSearch(res?.data?.products)
                // setPro(res?.data?.products)
                console.log('search', res?.data?.products);
                setSearchArr(res?.data?.products)
                setSearchLimit(res?.data?.products.slice(init, limit))
                // console.log('searchArr', searchArr);
                // setSearchLimit([...searchArr].slice(init, limit))
                // console.log('searchLimit', searchLimit);
                // setLimit(limit + 5)
                // console.log('pro', pro)
            })
    }

    const setFilterByNameFunc = (a) => {
        pro.filter()
        console.log('setFilter', pro)
    }
    const setFilterByPriceFunc = () => { }

    const setSortByNameFunc = () => {
        setSearch(false)
        let arrTemp = [...pro].sort((a, b) => a.title.localeCompare(b.title))
        setPro(arrTemp)
        console.log('pro', arrTemp);
    }
    const setSortByPriceFunc = () => {
        setSearch(false)
        const temp = [...pro].sort((a, b) => {
            return b.price - a.price;
        });
        setPro(temp);
    }

    // const BasicPagination = () => {
    //     return (
    //         <Stack spacing={2} >
    //             <Pagination count={10} />
    //             <Pagination count={10} color="primary" />
    //             <Pagination count={10} color="secondary" />
    //             <Pagination count={10} disabled />
    //         </Stack >
    //     );
    // }

    return (
        <div className='main'>
            <input type="text" placeholder='Enter for filter, sort or search' className='input'
                // onChange={(e) => onChange(e)}
                onChange={(e) => setSearchh(e?.target?.value)}
                autoFocus={true}
            />
            <input type="submit" value={'Search'} className='btn'
                // onClick={() => onChange()}
                onClick={onChange}
            />
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
                    !search ?
                        pro.map((v, i) => {
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
                        }) :
                        // searchArr.map((v, i) => {
                        searchLimit.map((v, i) => {
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
                }
            </div>
            <div className="pagi">
                {prev && <button onClick={() => (init = 0, onChange(init, limit), page > 1 ? setPage(page - 1) : null, console.log('prev', init, limit))}>Prev</button>}
                {search && <button onClick={() => (init = limit, onChange(init, limit + 5), page < (searchArr.length / 5) ? setPage(page + 1) : null, setPrev(true))}>Next</button>}
            </div>
            <p>{search && page + '/' + (Math.ceil(searchArr.length / 5))}</p>
            {/* <p>{search && searchArr.length / 5}</p> */}
        </div >
    )
}

export default Api
