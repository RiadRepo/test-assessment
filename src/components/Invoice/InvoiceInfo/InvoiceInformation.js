
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InvoiceInformation = ({ invoiceInfo, onInvoiceChange }) => {


    const [invoiceNumber, setInvoiceNumber] = useState(
        invoiceInfo?.invoiceNumber || generateInvoiceNumber()
    );
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());
    const [imagePreview, setImagePreview] = useState('/image-placeholder.png');

    useEffect(() => {
        if (!invoiceInfo?.invoiceNumber) {
            const defaultInvoiceNumber = generateInvoiceNumber();
            setInvoiceNumber(defaultInvoiceNumber);
            onInvoiceChange('invoiceNumber', defaultInvoiceNumber);
        }

        if (!invoiceInfo?.invoiceDate) {
            const defaultInvoiceDate = new Date();
            setSelectedDate(defaultInvoiceDate);
            onInvoiceChange('invoiceDate', defaultInvoiceDate.toISOString().split('T')[0]);
        }

        if (!invoiceInfo?.dueDate) {
            const defaultDueDate = new Date();
            setDueDate(defaultDueDate);
            onInvoiceChange('dueDate', defaultDueDate.toISOString().split('T')[0]);
        }
        if (!invoiceInfo?.Image) {
            onInvoiceChange('Image', imagePreview);
        }
    }, [invoiceInfo, onInvoiceChange]);

    // Function to generate a random invoice number
    function generateInvoiceNumber() {
        const randomNumber = Math.floor(Math.random() * 1000000);
        return `#INV-${randomNumber}`;
    }

    // Function to handle changes in the invoice number
    const handleInvoiceNumberChange = (e) => {
        const value = e.target.value;
        setInvoiceNumber(value);
        onInvoiceChange('invoiceNumber', value);
    };


    const handleDateChange = (date) => {
        setSelectedDate(date);
        onInvoiceChange('invoiceDate', date.toISOString().split('T')[0]); // Format the date as needed
    };
    const handleDateDueChange = (date) => {
        setDueDate(date);
        onInvoiceChange('dueDate', date.toISOString().split('T')[0]); // Format the date as needed
    };



    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                setImagePreview(e.target.result);
                onInvoiceChange('Image', e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex mb-8 justify-between">
            <div className="w-2/4">
                <div className="mb-2 md:mb-1 md:flex items-center">
                    <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice No.</label>
                    <span className="mr-4 inline-block hidden md:block">:</span>
                    <div className="flex-1">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            type="text"
                            placeholder="eg. #INV-100001"
                            value={invoiceNumber}
                            onChange={handleInvoiceNumberChange}
                        />
                    </div>
                </div>

                <div className="mb-2 md:mb-1 md:flex items-center">
                    <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice Date</label>
                    <span className="mr-4 inline-block hidden md:block">:</span>
                    <div className="flex-1">

                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="border border-neutral-100 bg-gray-200 p-2 w-48"
                        />
                    </div>
                </div>

                <div className="mb-2 md:mb-1 md:flex items-center">
                    <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Due date</label>
                    <span className="mr-4 inline-block hidden md:block">:</span>
                    <div className="flex-1">

                        <DatePicker
                            selected={dueDate}
                            onChange={handleDateDueChange}
                            className="border border-neutral-100 bg-gray-200  p-2 w-48"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="w-32 h-32 mb-1 border rounded-lg overflow-hidden relative bg-gray-100">
                    <img id="image" className="object-cover w-full h-32" src={imagePreview} alt="Invoice Preview" />

                    <div
                        className="absolute top-0 left-0 right-0 bottom-0 w-full block cursor-pointer flex items-center justify-center"
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <button
                            type="button"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
                            className="hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded-lg shadow-sm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-camera"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {/* Your SVG path here */}
                            </svg>
                        </button>
                    </div>
                </div>
                <input
                    name="photo"
                    id="fileInput"
                    accept="image/*"
                    className="hidden"
                    type="file"
                    onChange={handleImageChange}
                />
            </div>
        </div>
    );
};

export default InvoiceInformation;
