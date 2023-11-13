import React, { useState } from 'react';

const BillingInformation = ({ billingInfo, onBillingChange }) => {


    return (
        <div className="flex flex-wrap justify-between mb-8">
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
                <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Bill/Ship To:</label>
                <input
                    className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    placeholder="Billing company name"
                    value={billingInfo?.billingCompanyName}
                    onChange={(e) => onBillingChange('billingCompanyName', e.target.value)}
                />
                <input
                    className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    placeholder="Billing company address"
                    value={billingInfo?.billingCompanyAddress}
                    onChange={(e) => onBillingChange('billingCompanyAddress', e.target.value)}
                />
                <input
                    className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    placeholder="Additional info"
                    value={billingInfo?.billingAdditionalInfo}
                    onChange={(e) => onBillingChange('billingAdditionalInfo', e.target.value)}
                />
            </div>
            <div className="w-full md:w-1/3">
                <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">From:</label>
                <input
                    className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    placeholder="Your company name"
                    value={billingInfo?.yourCompanyName}
                    onChange={(e) => onBillingChange('yourCompanyName', e.target.value)}
                />
                <input
                    className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    placeholder="Your company address"
                    value={billingInfo?.yourCompanyAddress}
                    onChange={(e) => onBillingChange('yourCompanyAddress', e.target.value)}
                />
                <input
                    className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    placeholder="Additional info"
                    value={billingInfo?.additionalInfo}
                    onChange={(e) => onBillingChange('additionalInfo', e.target.value)}
                />
            </div>
        </div>
    );
};

export default BillingInformation;
