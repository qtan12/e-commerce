import React, {useState, useEffect} from 'react'
import { apiGetSanpham } from '../apis/product'
import { CustomSlider } from  './'
import { getNewProducts } from '../store/products/asyncAction'
import {useDispatch, useSelector} from 'react-redux'

const tabs = [
    {id: 1, name: 'BEST SELLER'},
    {id: 2, name: 'SẢN PHẨM MỚI'},

]
// setting slider

const BestSeller = () => {
    const [bestSellers, setBestSellers] =useState(null)
    const [activedTab, setActivedTab] = useState(1)
    const [products, setProduct] = useState(null)
    const dispatch = useDispatch()
    const {newProducts} = useSelector(state => state.products)

    const fetchSanpham = async () => {  
        const response = await apiGetSanpham({sort: '-sold'})
        if (response.success) {
            setBestSellers(response.products)
            setProduct(response.products)
        }
    }
    useEffect(() => {
        fetchSanpham()
        dispatch(getNewProducts())
    }, [dispatch])

    useEffect(() => {
        if(activedTab === 1) setProduct(bestSellers)
        if(activedTab === 2) setProduct(newProducts)
    }, [activedTab, bestSellers, newProducts])

    return (
        <div>
            <div className='flex text-[20px] pb-4 border-b-2 border-emerald-700'>
                {tabs.map(el => (
                    <span  
                        key={el.id} 
                        className={`font-semibold px-4 border-r cursor-pointer text-gray-400 ${activedTab === el.id ? 'text-gray-900' : ''}`}
                        onClick= {() => setActivedTab(el.id)}
                    >{el.name}</span>
        
                ))}
            </div>
            <div className='mt-4 mx-[-10px]'>
                <CustomSlider product={products} activedTab={activedTab} />
            </div>
            <div className='w-full flex gap-4 mt-8'>
                <img 
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                    alt="banner"
                    className='flex-1 object-contain flex' 
                />
                <img 
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                    alt="banner"
                    className='flex-1 object-contain flex' 
                />
            </div>
        </div>
    )
}

export default BestSeller