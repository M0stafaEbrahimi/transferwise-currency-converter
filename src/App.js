import "@transferwise/neptune-css/dist/css/neptune.css";
import "@transferwise/icons/lib/styles/main.min.css";
import "@transferwise/components/build/main.css";
import "../node_modules/currency-flags/dist/currency-flags.min.css";
import "./App.css";
import {
  getLangFromLocale,
  DEFAULT_LOCALE,
  Provider,
  MoneyInput,
  translations as componentTranslations,
} from "@transferwise/components";

function App() {
  const lang = getLangFromLocale(DEFAULT_LOCALE);
  const messages = { ...componentTranslations[lang] };
  return (
    <Provider i18n={{ locale: DEFAULT_LOCALE, messages }}>
      <h1>Convertor</h1>
      <MoneyInput
        id="money-input"
        amount={1000}
        size="lg"
        onAmountChange={(value) => console.log("amount changed", value)}
        onCurrencyChange={() => alert("currency changed")}
        addon={null}
        searchPlaceholder="Type a currency or country"
        onCustomAction={() => alert("Custom action")}
        customActionLabel="Custom action label"
        currencies={[
          {
            header: "Popular currencies",
          },
          {
            value: "EUR",
            label: "EUR",
            note: "Euro",
            currency: "eur",
            searchable: "Spain, Germany, France, Austria",
          },
          {
            value: "GBP",
            label: "GBP",
            note: "British pound",
            currency: "gbp",
            searchable: "England, Scotland, Wales",
          },
        ]}
        selectedCurrency={{
          value: "EUR",
          label: "EUR",
          note: "Euro",
          currency: "eur",
          searchable: "Spain, Germany, France, Austria",
        }}
      />
      <h2>=</h2>
      <MoneyInput
        id="money-input"
        amount={1000}
        size="lg"
        onAmountChange={(value) => console.log("amount changed", value)}
        onCurrencyChange={() => alert("currency changed")}
        addon={null}
        searchPlaceholder="Type a currency or country"
        onCustomAction={() => alert("Custom action")}
        customActionLabel="Custom action label"
        currencies={[
          {
            header: "Popular currencies",
          },
          {
            value: "EUR",
            label: "EUR",
            note: "Euro",
            currency: "eur",
            searchable: "Spain, Germany, France, Austria",
          },
          {
            value: "GBP",
            label: "GBP",
            note: "British pound",
            currency: "gbp",
            searchable: "England, Scotland, Wales",
          },
        ]}
        selectedCurrency={{
          value: "EUR",
          label: "EUR",
          note: "Euro",
          currency: "eur",
          searchable: "Spain, Germany, France, Austria",
        }}
      />
    </Provider>
  );
}

export default App;
