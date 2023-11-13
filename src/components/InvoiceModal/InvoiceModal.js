import React, { Children, useState } from 'react';
import axios from 'axios';
import useTrait from '../../../hooks/useTrait';

const InvoiceModal = ({ openModal, closeModal, onAddProductItem }) => {
    const [newProduct, setNewProduct] = useState({
        description: '',
        units: 0,
        unitPrice: 0,
        gst: 0,
        total: 0,
    });

    const setUnits = useTrait(0);
    const setUnitPrice = useTrait(0);

    const handleNewProductChange = (field, value) => {


        if (field !== "description") {
            const numericValue = isNaN(value) ? 0 : value;

            setNewProduct((prevProduct) => ({ ...prevProduct, [field]: numericValue }));

            if (field === 'units') {
                setUnits.set(numericValue)
            }
            if (field === 'unitPrice') {
                setUnitPrice.set(numericValue)
            }

            const totalPrice = calculateTotalPrice(setUnits.get(), setUnitPrice.get());
            setNewProduct((prevProduct) => ({ ...prevProduct, total: totalPrice }));
        }
        else {
            setNewProduct((prevProduct) => ({ ...prevProduct, [field]: value }));
        }
    };

    const calculateTotalPrice = (units, unitPrice) => {
        const totalPrice = units * unitPrice;
        return isNaN(totalPrice) ? 0 : totalPrice;
    };

    const saveProduct = async () => {

        try {

            const response = await axios.post('/api/add-data', {
                productData: newProduct,
            });

            const productDateRes = response.data;
            setNewProduct(productDateRes);
            onAddProductItem(newProduct);
            setNewProduct({
                description: '',
                units: 0,
                unitPrice: 0,
                gst: 0,
                total: 0,
            })

            closeModal();
        } catch (error) {
            console.error('Error calculating GST:', error);
        }
    };

    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className={`fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full ${openModal ? 'block' : 'hidden'}`}>
            <div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
                <div className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer" onClick={closeModal}>
                    <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                    </svg>
                </div>

                <div className="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">
                    <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Fill your services</h2>

                    <div className="mb-4">
                        <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Description</label>
                        <input
                            className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            type="text"
                            name="name"
                            value={newProduct?.description}
                            onChange={(e) => handleNewProductChange('description', e.target.value)}
                        />
                    </div>

                    <div className="flex">
                        <div className="mb-4 w-32 mr-2">
                            <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Units</label>
                            <input
                                className="text-right mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="text"
                                name="qty"
                                value={newProduct?.units}
                                onChange={(e) => handleNewProductChange('units', parseFloat(e.target.value, 10))}
                            />
                        </div>

                        <div className="mb-4 w-32 mr-2">
                            <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Unit Price</label>
                            <input
                                className="text-right mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="text"
                                name="rate"
                                value={newProduct?.unitPrice}
                                onChange={(e) => handleNewProductChange('unitPrice', e.target.value)}
                            />
                        </div>

                        <div className="mb-4 w-32">
                            <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Amount</label>
                            <input
                                className="text-right mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="text"
                                name="total"
                                value={newProduct?.total?.toFixed(2)}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-4 w-32">
                        <div className="relative">
                            <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">GST</label>
                            <select
                                className="text-gray-700 block appearance-none w-full bg-gray-200 border-2 border-gray-200 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                name="gst"
                                value={newProduct.gst}
                                onChange={(e) => handleNewProductChange('gst', parseFloat(e.target.value))}
                            >
                                <option value="5">GST 5%</option>
                                <option value="12">GST 12%</option>
                                <option value="18">GST 18%</option>
                                <option value="28">GST 28%</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                                <svg className="fill-current h-4 w-4 mt-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-right">
                        <button
                            type="button"
                            className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm mr-2"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow-sm"
                            onClick={saveProduct}
                        >
                            Add Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;
