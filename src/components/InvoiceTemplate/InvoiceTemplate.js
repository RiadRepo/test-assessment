import React from 'react';

const InvoiceTemplate = ({ invoiceInfo, billingInfo, productInfo, totalGST, TotalPrice }) => {
    return (
        <div >
            <div className="mb-8 flex justify-between">
                <div>
                    <h2 className="text-3xl font-bold mb-6 pb-2 tracking-wider uppercase">Invoice</h2>

                    <div className="mb-1 flex items-center">
                        <label className="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Invoice No.</label>
                        <span className="mr-4 inline-block">:</span>
                        <div>{invoiceInfo?.invoiceNumber}</div>
                    </div>

                    <div className="mb-1 flex items-center">
                        <label className="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Invoice Date</label>
                        <span className="mr-4 inline-block">:</span>
                        <div>{invoiceInfo?.invoiceDate}</div>
                    </div>

                    <div className="mb-1 flex items-center">
                        <label className="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Due date</label>
                        <span className="mr-4 inline-block">:</span>
                        <div>{invoiceInfo?.dueDate}</div>
                    </div>
                </div>
                <div className="pr-5">
                    <div className="w-32 h-32 mb-1 overflow-hidden">
                        <img src={invoiceInfo?.Image} id="image2" className="object-cover w-20 h-20" alt="Invoice" />
                    </div>
                </div>
            </div>

            <div className="flex justify-between mb-10">
                <div className="w-1/2">
                    <label className="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">Bill/Ship To:</label>
                    <div>
                        <div>{billingInfo?.billingCompanyName}</div>
                        <div>{billingInfo?.billingCompanyAddress}</div>
                        <div>{billingInfo?.billingAdditionalInfo}</div>
                    </div>
                </div>
                <div className="w-1/2">
                    <label className="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">From:</label>
                    <div>
                        <div>{billingInfo?.yourCompanyName}</div>
                        <div>{billingInfo?.yourCompanyAddress}</div>
                        <div>{billingInfo?.additionalInfo}</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap -mx-1 border-b py-2 items-start">
                <div className="flex-1 px-1">
                    <p className="text-gray-600 uppercase tracking-wide text-xs font-bold">Description</p>
                </div>

                <div className="px-1 w-32 text-right">
                    <p className="text-gray-600 uppercase tracking-wide text-xs font-bold">Units</p>
                </div>

                <div className="px-1 w-32 text-right">
                    <p className="leading-none">
                        <span className="block uppercase tracking-wide text-xs font-bold text-gray-600">Unit Price</span>
                        <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
                    </p>
                </div>

                <div className="px-1 w-32 text-right">
                    <p className="leading-none">
                        <span className="block uppercase tracking-wide text-xs font-bold text-gray-600">Amount</span>
                        <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
                    </p>
                </div>
            </div>

            {productInfo?.map((invoice, index) => (
                <div key={index} className="flex flex-wrap -mx-1 py-2 border-b">
                    <div className="flex-1 px-1">
                        <p className="text-gray-800">{invoice?.description}</p>
                    </div>

                    <div className="px-1 w-32 text-right">
                        <p className="text-gray-800">{invoice?.units}</p>
                    </div>

                    <div className="px-1 w-32 text-right">
                        <p className="text-gray-800">৳{typeof invoice?.unitPrice === 'number' ? invoice?.unitPrice.toFixed(2) : invoice?.unitPrice}</p>
                    </div>

                    <div className="px-1 w-32 text-right">
                        <p className="text-gray-800">৳{invoice?.total?.toFixed(2)}</p>
                    </div>
                </div>
            ))}

            <div className="py-2 ml-auto mt-20" style={{ width: '320px' }}>
                <div className="flex justify-between mb-3">
                    <div className="text-gray-800 text-right flex-1">Total incl. GST</div>
                    <div className="text-right w-40">
                        <div className="text-gray-800 font-medium" >৳{TotalPrice.toFixed(2)}</div>
                    </div>
                </div>
                <div className="flex justify-between mb-4">
                    <div className="text-sm text-gray-600 text-right flex-1">GST(18%) in Total</div>
                    <div className="text-right w-40">
                        <div className="text-sm text-gray-600" >৳{totalGST.toFixed(2)}</div>
                    </div>
                </div>

                <div className="py-2 border-t border-b">
                    <div className="flex justify-between">
                        <div className="text-xl text-gray-600 text-right flex-1">Amount due</div>
                        <div className="text-right w-40">
                            <div className="text-xl text-gray-800 font-bold" >৳{TotalPrice.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceTemplate;
