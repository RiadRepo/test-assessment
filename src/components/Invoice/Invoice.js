// pages/invoice.js
import { useState } from 'react';
import InvoiceInformation from './InvoiceInfo/InvoiceInformation';
import BillingInformation from './BillingInformation';
import ProductInformation from './ProductInformation';
import InvoiceTemplate from '../InvoiceTemplate/InvoiceTemplate';


const Invoice = () => {
  const [printMode, setPrintMode] = useState(false);
  const [invoiceInfo, setInvoiceInfo] = useState({ invoiceDate: '', invoiceNumber: '', Image: '' });
  const [billingInfo, setBillingInfo] = useState({
    billingCompanyName: '',
    billingCompanyAddress: '',
    billingAdditionalInfo: '',
    yourCompanyName: '',
    yourCompanyAddress: '',
    additionalInfo: '',
  });
  const [productInfo, setProductInfo] = useState([]);
  // const [netTotal, setNetTotal] = useState(0);
  const [totalGST, setTotalGST] = useState(0);

  const handlePrint = async () => {
    await setPrintMode(true);
    window.print();
    setPrintMode(false);
  };

  const handleAddProductItem = (newProduct) => {
    const updatedProductInfo = [...productInfo, newProduct];
    setProductInfo(updatedProductInfo);

    // Calculate amount and update totals
    const calculatedAmount = calculateAmount(newProduct.units, newProduct.unitPrice, 18);
    // setNetTotal(netTotal + calculatedAmount);
    setTotalGST(totalGST + (calculatedAmount - newProduct.unitPrice * newProduct.units));
  };

  const handleInvoiceChange = (field, value) => {
    setInvoiceInfo({ ...invoiceInfo, [field]: value });
  };

  const handleBillingChange = (field, value) => {
    setBillingInfo({ ...billingInfo, [field]: value });
  };

  const handleProductItemChange = (index, field, value) => {
    const updatedProductInfo = [...productInfo];
    updatedProductInfo[index][field] = value;
    setProductInfo(updatedProductInfo);
  };

  const handleDeleteProductItem = (index) => {
    const deletedProduct = productInfo[index];
    const calculatedAmount = calculateAmount(deletedProduct.units, deletedProduct.unitPrice, deletedProduct.gst);


    const updatedTotalGST = totalGST - (calculatedAmount - deletedProduct.unitPrice * deletedProduct.units);


    setTotalGST(updatedTotalGST);

    const updatedProductInfo = [...productInfo];
    updatedProductInfo.splice(index, 1);
    setProductInfo(updatedProductInfo);
  };

  const calculateAmount = (units, unitPrice, gst) => {
    return units * unitPrice + (units * unitPrice * gst) / 100;
  };

  const calculateTotalAmount = () => {
    return productInfo.reduce((total, item) => total + calculateAmount(item.units, item.unitPrice, item.gst), 0);
  };

  let TotalPrice = calculateTotalAmount();

  return (
    <div className="container mx-auto p-4">
      {printMode ? (
        <> <InvoiceTemplate billingInfo={billingInfo} invoiceInfo={invoiceInfo} productInfo={productInfo} totalGST={totalGST} TotalPrice={TotalPrice} /> </>
      ) : (
        <>
          <div className='flex justify-between py-6'>
            <h1 className="text-3xl text-gray-800 block font-bold uppercase tracking-wide mb-4">Invoice</h1>

            <button
              className="text-black bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              onClick={handlePrint}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>

            </button>
          </div>
          <InvoiceInformation invoiceInfo={invoiceInfo} onInvoiceChange={handleInvoiceChange} />
          <BillingInformation billingInfo={billingInfo} onBillingChange={handleBillingChange} />
          <ProductInformation
            productInfo={productInfo}
            onProductItemChange={handleProductItemChange}
            onAddProductItem={handleAddProductItem}
            onDeleteProductItem={handleDeleteProductItem}
          />

          <div className="py-2 ml-auto mt-5 w-full sm:w-2/4 lg:w-1/4">
            <div className="flex justify-between mb-3">
              <div className="text-gray-800 text-right flex-1">Total incl. GST</div>
              <div className="text-right w-40">
                <div className="text-gray-800 font-medium">৳{calculateTotalAmount().toFixed(2)}</div>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <div className="text-sm text-gray-600 text-right flex-1">GST(18%) in Total</div>
              <div className="text-right w-40">
                <div className="text-sm text-gray-600">৳{totalGST.toFixed(2)}</div>
              </div>
            </div>
            <div className="py-2 border-t border-b">
              <div className="flex justify-between">
                <div className="text-xl text-gray-600 text-right flex-1">Amount due</div>
                <div className="text-right w-40">
                  <div className="text-xl text-gray-800 font-bold">৳{calculateTotalAmount().toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Invoice;
