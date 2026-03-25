import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
// import CatalogPage from '../pages/CatalogPage'
// import ProductPage from '../pages/ProductPage'
// import CartPage from '../pages/CartPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                {/* <Route path="catalogue" element={<CatalogPage />} />
                <Route path="produit/:id" element={<ProductPage />} />
                <Route path="panier" element={<CartPage />} /> */}
                <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}