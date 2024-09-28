import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Flag from 'react-world-flags';
import { Bar } from 'react-chartjs-2';

// Keyframe animations
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    height: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    height: 0;
  }
  to {
    opacity: 1;
    height: auto;
  }
`;

// Styled components
const ConverterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 90%;  // Increased for better mobile visibility
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.4rem;

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const Input = styled.input`
    height: 40px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 90%;
  font-size: 1.5rem; // Font size for mobile
    font-family: 'Product Sans', sans-serif;


  @media (max-width: 600px) {
    font-size: 1.5rem; // Smaller font size for mobile
      font-family: 'Product Sans', sans-serif;

  }
`;

const Select = styled.select`
  padding: 10px 40px 10px 10px; /* Added padding for the dropdown arrow */
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 93%;
  font-size: 1rem;
  background-color: #fff; /* Background color for better visibility */
  appearance: none; /* Remove default dropdown arrow */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="6 9 12 15 18 9"/></svg>'); /* Custom arrow */
  background-repeat: no-repeat;
  background-position: right 10px center; /* Position the arrow */
  transition: border-color 0.3s ease; /* Smooth transition for border color */
    font-family: 'Product Sans', sans-serif;


  &:focus {
    border-color: #007bff; /* Change border color on focus */
    outline: none; /* Remove default outline */
  }

  &:hover {
    border-color: #007bff; /* Change border color on hover */
  }

  @media (max-width: 600px) {
    font-size: 1rem; /* Font size for mobile */
  }
`;


const Button = styled.button`
    height: 50px;
    width: 95%;
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 100px;
  font-size: 1rem; // Font size for mobile
    transition: background-color 0.3s ease, transform 0.2s ease;


  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);

  @media (max-width: 600px) {
    font-size: 0.9rem; // Smaller font size for mobile
    padding: 10px; // Adjust padding for easier touch on mobile
  }
`;

const Result = styled.div`
  margin-top: 20px;
  font-size: 2.7em;
  @media (max-width: 600px) {
    font-size: 1em; // Smaller font size for mobile
  }
`;

const RatesContainer = styled.div`
    justify-content: center;
    align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const RateTable = styled.table`
  width: 96%;
  border-collapse: collapse;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;

  th, td {
    border: 1px solid #ccc;
    padding: 10px; // Adjust padding for mobile
    text-align: left;
    font-size: 0.9rem; // Font size for mobile

    @media (max-width: 600px) {
      font-size: 0.8rem; // Smaller font size for mobile
    }
  }

  th {
    background-color: #007bff;
    color: white;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const ChartContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background-color: #e7f1ff;
  border-radius: 5px;
  text-align: center;
  animation: ${props => (props.showChart ? fadeIn : fadeOut)} 0.5s forwards;
`;

// Currency Converter component
const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const [chartData, setChartData] = useState(null);
  const [showChart, setShowChart] = useState(false);

  // Fetching currencies
  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        setCurrencies(Object.keys(response.data.rates));
        setExchangeRates(response.data.rates);
      })
      .catch(error => console.error('Error fetching currency data', error));
  }, []);

  // Currency conversion
  const convertCurrency = () => {
    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
        const rate = response.data.rates[toCurrency];
        setResult((amount * rate).toFixed(2));

        // Fetch chart data
        fetchChartData(toCurrency);
      })
      .catch(error => console.error('Error fetching conversion rate', error));
  };

  // Fetching chart data
  const fetchChartData = (currency) => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setFullYear(endDate.getFullYear() - 1);

    const url = `https://api.exchangerate-api.com/v4/history/${currency}?start_at=${startDate.toISOString().split('T')[0]}&end_at=${endDate.toISOString().split('T')[0]}`;

    axios.get(url)
      .then(response => {
        const labels = Object.keys(response.data.rates);
        const data = labels.map(label => response.data.rates[label][currency]);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: `${currency} Exchange Rate`,
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
        setShowChart(true);
      })
      .catch(error => console.error('Error fetching chart data', error));
  };

  // Get country code for currency
  const getCountryCode = (currency) => {
    const currencyToCountry = {
        USD: 'US', // US Dollar
        EUR: 'EU', // Euro
        IDR: 'ID', // Indonesian Rupiah
        JPY: 'JP', // Japanese Yen
        GBP: 'GB', // Pound Sterling
        AUD: 'AU', // Australian Dollar
        CAD: 'CA', // Canadian Dollar
        CHF: 'CH', // Swiss Franc
        CNY: 'CN', // Chinese Renminbi
        HKD: 'HK', // Hong Kong Dollar
        INR: 'IN', // Indian Rupee
        KRW: 'KR', // South Korean Won
        MXN: 'MX', // Mexican Peso
        NZD: 'NZ', // New Zealand Dollar
        SGD: 'SG', // Singapore Dollar
        THB: 'TH', // Thai Baht
        TRY: 'TR', // Turkish Lira
        ZAR: 'ZA', // South African Rand
        // ... (other currencies)
        AED: 'AE', // United Arab Emirates Dirham
        AFN: 'AF', // Afghan Afghani
        ALL: 'AL', // Albanian Lek
        AMD: 'AM', // Armenian Dram
        ANG: 'AN', // Netherlands Antillean Guilder
        AOA: 'AO', // Angolan Kwanza
        ARS: 'AR', // Argentine Peso
        AWG: 'AW', // Aruban Florin
        AZN: 'AZ', // Azerbaijani Manat
        BAM: 'BA', // Bosnia and Herzegovina Convertible Mark
        BBD: 'BB', // Barbadian Dollar
        BDT: 'BD', // Bangladeshi Taka
        BGN: 'BG', // Bulgarian Lev
        BHD: 'BH', // Bahraini Dinar
        BIF: 'BI', // Burundian Franc
        BMD: 'BM', // Bermudian Dollar
        BND: 'BN', // Brunei Dollar
        BOB: 'BO', // Bolivian Boliviano
        BRL: 'BR', // Brazilian Real
        BSD: 'BS', // Bahamian Dollar
        BTN: 'BT', // Bhutanese Ngultrum
        BWP: 'BW', // Botswana Pula
        BYN: 'BY', // Belarusian Ruble
        BZD: 'BZ', // Belize Dollar
        CDF: 'CD', // Congolese Franc
        CLP: 'CL', // Chilean Peso
        COP: 'CO', // Colombian Peso
        CRC: 'CR', // Costa Rican Colón
        CUP: 'CU', // Cuban Peso
        CVE: 'CV', // Cape Verdean Escudo
        CZK: 'CZ', // Czech Koruna
        DJF: 'DJ', // Djiboutian Franc
        DKK: 'DK', // Danish Krone
        DOP: 'DO', // Dominican Peso
        DZD: 'DZ', // Algerian Dinar
        EGP: 'EG', // Egyptian Pound
        ERN: 'ER', // Eritrean Nakfa
        ETB: 'ET', // Ethiopian Birr
        FJD: 'FJ', // Fijian Dollar
        FKP: 'FK', // Falkland Islands Pound
        GEL: 'GE', // Georgian Lari
        GHS: 'GH', // Ghanaian Cedi
        GIP: 'GI', // Gibraltar Pound
        GMD: 'GM', // Gambian Dalasi
        GNF: 'GN', // Guinean Franc
        GTQ: 'GT', // Guatemalan Quetzal
        GYD: 'GY', // Guyanese Dollar
        HNL: 'HN', // Honduran Lempira
        HRK: 'HR', // Croatian Kuna
        HTG: 'HT', // Haitian Gourde
        HUF: 'HU', // Hungarian Forint
        ILS: 'IL', // Israeli New Shekel
        IQD: 'IQ', // Iraqi Dinar
        IRR: 'IR', // Iranian Rial
        ISK: 'IS', // Icelandic Króna
        JMD: 'JM', // Jamaican Dollar
        JOD: 'JO', // Jordanian Dinar
        KES: 'KE', // Kenyan Shilling
        KGS: 'KG', // Kyrgyzstani Som
        KHR: 'KH', // Cambodian Riel
        KMF: 'KM', // Comorian Franc
        KPW: 'KP', // North Korean Won
        KWD: 'KW', // Kuwaiti Dinar
        KYD: 'KY', // Cayman Islands Dollar
        LAK: 'LA', // Lao Kip
        LBP: 'LB', // Lebanese Pound
        LKR: 'LK', // Sri Lankan Rupee
        LRD: 'LR', // Liberian Dollar
        LSL: 'LS', // Lesotho Loti
        LYD: 'LY', // Libyan Dinar
        MAD: 'MA', // Moroccan Dirham
        MDL: 'MD', // Moldovan Leu
        MGA: 'MG', // Malagasy Ariary
        MKD: 'MK', // Macedonian Denar
        MMK: 'MM', // Myanmar Kyat
        MNT: 'MN', // Mongolian Tögrög
        MOP: 'MO', // Macanese Pataca
        MRO: 'MR', // Mauritanian Ouguiya
        MUR: 'MU', // Mauritian Rupee
        MVR: 'MV', // Maldivian Rufiyaa
        MWK: 'MW', // Malawian Kwacha
        MXN: 'MX', // Mexican Peso
        MYR: 'MY', // Malaysian Ringgit
        MZN: 'MZ', // Mozambican Metical
        NAD: 'NA', // Namibian Dollar
        NGN: 'NG', // Nigerian Naira
        NIO: 'NI', // Nicaraguan Córdoba
        NOK: 'NO', // Norwegian Krone
        NPR: 'NP', // Nepalese Rupee
        NZD: 'NZ', // New Zealand Dollar
        OMR: 'OM', // Omani Rial
        PAB: 'PA', // Panamanian Balboa
        PEN: 'PE', // Peruvian Sol
        PGK: 'PG', // Papua New Guinean Kina
        PHP: 'PH', // Philippine Peso
        PKR: 'PK', // Pakistani Rupee
        PLN: 'PL', // Polish Złoty
        PYG: 'PY', // Paraguayan Guarani
        QAR: 'QA', // Qatari Riyal
        RON: 'RO', // Romanian Leu
        RSD: 'RS', // Serbian Dinar
        RUB: 'RU', // Russian Ruble
        RWF: 'RW', // Rwandan Franc
        SAR: 'SA', // Saudi Riyal
        SBD: 'SB', // Solomon Islands Dollar
        SCR: 'SC', // Seychellois Rupee
        SDG: 'SD', // Sudanese Pound
        SEK: 'SE', // Swedish Krona
        SGD: 'SG', // Singapore Dollar
        SHP: 'SH', // Saint Helena Pound
        SLL: 'SL', // Sierra Leonean Leone
        SOS: 'SO', // Somali Shilling
        SRD: 'SR', // Surinamese Dollar
        SSP: 'SS', // South Sudanese Pound
        STD: 'ST', // São Tomé and Principe Dobra
        SVC: 'SV', // Salvadoran Colón
        SYP: 'SY', // Syrian Pound
        SZL: 'SZ', // Swazi Lilangeni
        THB: 'TH', // Thai Baht
        TJS: 'TJ', // Tajikistani Somoni
        TMT: 'TM', // Turkmenistan Manat
        TND: 'TN', // Tunisian Dinar
        TOP: 'TO', // Tongan Paʻanga
        TRY: 'TR', // Turkish Lira
        TTD: 'TT', // Trinidad and Tobago Dollar
        TWD: 'TW', // New Taiwan Dollar
        TZS: 'TZ', // Tanzanian Shilling
        UAH: 'UA', // Ukrainian Hryvnia
        UGX: 'UG', // Ugandan Shilling
        USD: 'US', // United States Dollar
        USN: 'US', // United States Dollar (next day)
        USS: 'US', // United States Dollar (same day)
        UYI: 'UY', // Uruguayan Peso (indexed units)
        UYU: 'UY', // Uruguayan Peso
        UZS: 'UZ', // Uzbekistan Som
        VEF: 'VE', // Venezuelan Bolivar
        VND: 'VN', // Vietnamese Dong
        VUV: 'VU', // Vanuatu Vatu
        WST: 'WS ', // Samoan Tālā
        XAF: 'CM', // Central African CFA Franc
        XAG: 'XAG', // Silver (troy ounce)
        XAU: 'XAU', // Gold (troy ounce)
        XBA: 'XBA', // European Composite Unit (EURCO)
        XBB: 'XBB', // European Monetary Unit (E.M.U.-6)
        XBC: 'XBC', // European Unit of Account 9 (E.U.A.-9)
        XBD: 'XBD', // European Unit of Account 17 (E.U.A.-17)
        XCD: 'AG', // East Caribbean Dollar
        XDR: 'XDR', // Special Drawing Rights
        XOF: 'BJ', // West African CFA Franc
        XPD: 'XPD', // Palladium (troy ounce)
        XPF: 'PF', // CFP Franc
        XPT: 'XPT', // Platinum (troy ounce)
        XSU: 'XSU', // SUCRE
        XTS: 'XTS', // Codes specifically reserved for testing purposes
        XUA: 'XUA', // East African shilling
        XXX: 'XX', // Unknown or invalid currency
        YER: 'YE', // Yemeni Rial
        ZAR: 'ZA', // South African Rand
        ZMW: 'ZM', // Zambian Kwacha
        ZWL: 'ZW', // Zimbabwean Dollar
      };
    return currencyToCountry[currency] || 'UN';
  };

  return (
    <ConverterContainer>
      <h2>Currency Converter</h2>
      <Input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <Select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
        {currencies.map(currency => (
          <option key={currency} value={currency}>
            <Flag code={getCountryCode(currency)} style={{ width: '20px', marginRight: '10px' }} />
            {currency}
          </option>
        ))}
      </Select>
      <Select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
        {currencies.map(currency => (
          <option key={currency} value={currency}>
            <Flag code={getCountryCode(currency)} style={{ width: '20px', marginRight: '10px' }} />
            {currency}
          </option>
        ))}
      </Select>
      <Button onClick={convertCurrency}>Convert</Button>
      {result && <Result>{amount} {fromCurrency} = {result} {toCurrency}</Result>}
      
      <RatesContainer>
        <h3>Live Exchange Rates</h3>
        <RateTable>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Amount</th>
              <th>Change (24h)</th>
              <th>Chart (24h)</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map(currency => (
              <tr key={currency}>
                <td>
                  <Flag code={getCountryCode(currency)} style={{ width: '20px', marginRight: '10px' }} />
                  {currency}
                </td>
                <td>{(exchangeRates[currency] * amount).toFixed(2)}</td>
                <td>+0.02%</td>
                <td>Chart</td>
              </tr>
            ))}
          </tbody>
        </RateTable>
      </RatesContainer>

      <ChartContainer showChart={showChart}>
        {chartData && <Bar data={chartData} />}
      </ChartContainer>
    </ConverterContainer>
  );
};

export default CurrencyConverter;
