import "@transferwise/neptune-css/dist/css/neptune.css";
import "@transferwise/icons/lib/styles/main.min.css";
import "@transferwise/components/build/main.css";
import "../node_modules/currency-flags/dist/currency-flags.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import {
  getLangFromLocale,
  DEFAULT_LOCALE,
  Provider,
  MoneyInput,
  translations as componentTranslations,
} from "@transferwise/components";
const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=c5debda6ee0fb802489c0e7d10ad5eba&format=1";
function App() {
  const [currencies, setCurrencies] = useState([
    {
      header: "Popular currencies",
    },
    {
      value: "EUR",
      label: "EUR",
      currency: "eur",
    },
    {
      value: "GBP",
      label: "GBP",
      currency: "gbp",
    },
    {
      header: "All currencies",
    },
  ]);
  console.log(currencies);
  const [fromCurrency, setFromCurrency] = useState({
    value: "EUR",
    label: "EUR",
    currency: "eur",
  });
  const [toCurrency, setToCurrency] = useState({
    value: "GBP",
    label: "GBP",
    currency: "gbp",
  });
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(1);
  const [rates, setRates] = useState();
  const lang = getLangFromLocale(DEFAULT_LOCALE);
  const messages = { ...componentTranslations[lang] };
  function handleAmount1Change(amount1) {
    setFromAmount(amount1);
    setToAmount(
      (amount1 * rates[toCurrency.value]) / rates[fromCurrency.value]
    );
  }
  function handleCurrency1Change(currency1) {
    setToAmount(
      (fromAmount * rates[toCurrency.value]) / rates[currency1.value]
    );
    setFromCurrency(currency1);
  }
  function handleAmount2Change(amount2) {
    setToAmount(amount2);
    setFromAmount(
      (amount2 * rates[fromCurrency.value]) / rates[toCurrency.value]
    );
  }
  function handleCurrency2Change(currency2) {
    setFromAmount(
      (toAmount * rates[fromCurrency.value]) / rates[currency2.value]
    );
    setToCurrency(currency2);
  }
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const currencyOptions = Object.keys(data.rates);
        //const firstCurrency = Object.keys(data.rates)[0];
        const currData = currencyOptions.map((opt) => ({
          value: opt,
          label: opt,
          currency: opt.toLowerCase(),
        }));
        setCurrencies((prev) => [...prev, ...currData]);
        setRates(data.rates);
      });
  }, []);
  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, [rates]);
  return (
    <Provider i18n={{ locale: DEFAULT_LOCALE, messages }}>
      <h1>Convertor</h1>
      <MoneyInput
        id="money-input"
        amount={fromAmount}
        size="lg"
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        addon={null}
        searchPlaceholder="Type a currency"
        currencies={currencies}
        selectedCurrency={fromCurrency}
      />
      <h2>=</h2>
      <MoneyInput
        id="money-input"
        amount={toAmount}
        size="lg"
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        addon={null}
        searchPlaceholder="Type a currency"
        currencies={currencies}
        selectedCurrency={toCurrency}
      />
    </Provider>
  );
}

export default App;
