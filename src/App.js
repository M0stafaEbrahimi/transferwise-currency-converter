import "@transferwise/neptune-css/dist/css/neptune.css";
import "@transferwise/icons/lib/styles/main.min.css";
import "@transferwise/components/build/main.css";
import "../node_modules/currency-flags/dist/currency-flags.min.css";
import "./App.css";
import TimeLine from "./components/TimeLine";
import { useEffect, useState } from "react";
import {
  getLangFromLocale,
  DEFAULT_LOCALE,
  Provider,
  MoneyInput,
  translations as componentTranslations,
} from "@transferwise/components";
const BASE_URL = "http://localhost:8080";
function App() {
  const [currencies, setCurrencies] = useState([
    {
      header: "Popular currencies",
    },
    {
      value: "EUR",
      label: "EUR",
      note: "Euro",
      currency: "eur",
    },
    {
      value: "GBP",
      label: "GBP",
      note: "British pound",
      currency: "gbp",
    },
    {
      header: "All currencies",
    },
  ]);
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
  const [toAmount, setToAmount] = useState();
  const [fee, setFee] = useState();
  const [type, setType] = useState("from");
  const [rate, setRate] = useState();
  const [selectedFee, setSelectedFee] = useState();
  const [selectedFeeOption, setSelectedFeeOption] = useState("Normal");
  const lang = getLangFromLocale(DEFAULT_LOCALE);
  const messages = { ...componentTranslations[lang] };

  function handleAmount1Change(amount1 = fromAmount) {
    setType("from");
    fetch(`${BASE_URL}/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromCurrency.value,
        fromAmount: amount1,
        to: toCurrency.value,
        toAmount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFee(data.convertOptions);
        setRate(data.rate);
        setSelectedFeeOption(data.convertOptions[0].option);
        setSelectedFee(data.convertOptions[0].fee.toFixed(3));
        setToAmount((data.fromAmount - data.convertOptions[0].fee) * data.rate);
      });
    setFromAmount(amount1);
  }
  function handleCurrency1Change(currency1) {
    setFromCurrency(currency1);
    fetch(`${BASE_URL}/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: currency1.value,
        fromAmount,
        to: toCurrency.value,
        toAmount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFee(data.convertOptions);
        setRate(data.rate);
        setSelectedFeeOption(data.convertOptions[0].option);
        setSelectedFee(data.convertOptions[0].fee.toFixed(3));
        setToAmount((data.fromAmount - data.convertOptions[0].fee) * data.rate);
      });
  }
  function handleAmount2Change(amount2) {
    setType("to");
    fetch(`${BASE_URL}/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromCurrency.value,
        fromAmount: null,
        to: toCurrency.value,
        toAmount: amount2,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFee(data.convertOptions);
        setRate(data.rate);
        setSelectedFeeOption(data.convertOptions[0].option);
        setSelectedFee(data.convertOptions[0].fee.toFixed(3));
        setFromAmount(data.toAmount / data.rate + data.convertOptions[0].fee);
      });
    setToAmount(amount2);
  }
  function handleCurrency2Change(currency2) {
    fetch(`${BASE_URL}/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromCurrency.value,
        fromAmount,
        to: currency2.value,
        toAmount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFee(data.convertOptions);
        setRate(data.rate);
        setSelectedFeeOption(data.convertOptions[0].option);
        setSelectedFee(data.convertOptions[0].fee.toFixed(3));
        setToAmount((data.fromAmount - data.convertOptions[0].fee) * data.rate);
      });
    setToCurrency(currency2);
  }
  function handleReceiveCurrencies(event) {
    const eventData = JSON.parse(event.data);
    setCurrencies((currencies) => {
      return currencies.length < 9 ? [...currencies, eventData] : currencies;
    });
  }
  useEffect(() => {
    const eventSource = new EventSource(`${BASE_URL}/currency`);
    eventSource.addEventListener("message", handleReceiveCurrencies);
    if (
      [...new URLSearchParams(new URL(window.location.href).search)].length > 0
    ) {
      const [sourceCurrencyCode, targetCurrencyCode, sourceAmount] = [
        ...new URLSearchParams(new URL(window.location.href).search).values(),
      ];
      setFromCurrency({
        value: sourceCurrencyCode,
        label: sourceCurrencyCode,
        currency: sourceCurrencyCode.toLowerCase(),
      });
      setToCurrency({
        value: targetCurrencyCode,
        label: targetCurrencyCode,
        currency: targetCurrencyCode.toLowerCase(),
      });
      setFromAmount(+sourceAmount);
    } else {
      handleAmount1Change();
    }
    return () => {
      // Remove event listener and close the connection on unmount
      eventSource.removeEventListener("message", handleReceiveCurrencies);
      eventSource.close();
    };
  }, []);
  // useEffect(() => {
  //   handleAmount1Change();
  // }, []);
  useEffect(() => {
    if (type === "from") {
      setToAmount((fromAmount - selectedFee) * rate);
    }
    if (type === "to") {
      setFromAmount(toAmount / rate + selectedFee);
    }
  }, [selectedFeeOption]);
  return (
    <Provider i18n={{ locale: DEFAULT_LOCALE, messages }}>
      <h1>Convertor</h1>
      <div className="moneyInput">
        <label htmlFor="money-input">You Send</label>
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
      </div>
      <TimeLine
        fees={fee}
        rate={rate}
        selectedFee={selectedFee}
        setSelectedFee={setSelectedFee}
        selectedFeeOption={selectedFeeOption}
        setSelectedFeeOption={setSelectedFeeOption}
        fromCurrency={fromCurrency}
        amount={fromAmount}
      />
      <div className="moneyInput">
        <label htmlFor="money-input">Recipient gets</label>
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
      </div>
    </Provider>
  );
}

export default App;
