import React, { useState } from 'react';
import InvoiceModal from '../InvoiceModal/InvoiceModal';

const ProductInformation = ({ productInfo, onAddProductItem, onDeleteProductItem }) => {

    const [openModal, setOpenModal] = useState(false);

    const handleAddProductItem = (newProduct) => {
        onAddProductItem({ ...newProduct });
    };


    return (
        <div>
            <div className="flex -mx-1 border-b py-2 items-start">
                <div className="flex-1 px-1">
                    <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Description</p>
                </div>
                <div className="px-1 w-20 text-right">
                    <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Units</p>
                </div>
                <div className="px-1 w-32 text-right">
                    <p className="leading-none">
                        <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Unit Price</span>
                        <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
                    </p>
                </div>
                <div className="px-1 w-32 text-right">
                    <p className="leading-none">
                        <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Amount</span>
                        <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
                    </p>
                </div>
                <div className="px-1 w-20 text-center"></div>
            </div>

            {productInfo?.map((item, index) => (
                <div key={index} className="flex -mx-1 py-2 border-b">
                    <div className="flex-1 px-1">
                        <p className="text-gray-800">{item?.description}</p>
                    </div>
                    <div className="px-1 w-20 text-right">
                        <p className="text-gray-800">{item?.units}</p>
                    </div>
                    <div className="px-1 w-32 text-right">
                        <p className="text-gray-800">৳{typeof item?.unitPrice === 'number' ? item?.unitPrice.toFixed(2) : item?.unitPrice}</p>
                    </div>
                    <div className="px-1 w-32 text-right">
                        <p className="text-gray-800">৳{item?.total.toFixed(2)}</p>
                    </div>
                    <div className="px-1 w-20 text-right">
                        <a href="#" className="text-red-500 hover:text-red-600 text-sm font-semibold" onClick={() => onDeleteProductItem(index)}>
                            Delete
                        </a>
                    </div>
                </div>
            ))}

            <button
                className="mt-6 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded shadow-sm"
                onClick={() => setOpenModal(!openModal)}
            >
                Add Invoice Items
            </button>


            <InvoiceModal
                openModal={openModal}
                closeModal={() => setOpenModal(false)}

                onAddProductItem={handleAddProductItem}
            />
        </div>
    );
};

export default ProductInformation;
