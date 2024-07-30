/** @format */
import { useEffect, useState } from "react";
import axios from "axios";
// import Cookies from "js-cookie";
import Spinner from "../../components/utils/Spinner";
import Card from "../../components/Dashboard/Card";
import { Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const api_url = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    accounts: { cash: 0, check: 0, due: 0 },
    stocks: [],
    expenses: [],
    loans: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: apiData } = await axios.get(`${api_url}/dashboard`, {
          withCredentials: true,
        });

        setData(apiData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  const { cash, check, due } = data.accounts;
  const stockAmount = data.stocks.reduce((acc, cur) => (acc += cur.cash), 0);

  const expensesAmount = data.expenses.reduce(
    (acc, cur) => (acc += cur.amount),
    0
  );
  const loanAmount = data.loans.reduce((acc, cur) => (acc += cur.amount), 0);
  const total = cash + check + due + stockAmount + loanAmount;
  const weightConvert = (weight) => {
    const weightInPoint = weight / 40;
    const mon = Math.trunc(weightInPoint);
    const kg = parseInt((weightInPoint - mon) * 40);
    return `${mon.toLocaleString("bn-BD")} মন ${kg.toLocaleString(
      "bn-BD"
    )} কেজি`;
  };
  return (
    <>
      <div>
        {loading && <Spinner />}
        {error && <p>Error: {error}</p>}
        <Grid container spacing={2} justifyContent="center">
          <Grid item sx={12} sm={6} md={3}>
            <Card
              title="অ্যাকাউন্ট"
              border={colors.blueAccent[400]}
              content={
                <div>
                  <h3>ক্যাশঃ {cash.toLocaleString("bn-BD")} /=</h3>
                  <h3>চেকঃ {check.toLocaleString("bn-BD")}</h3>
                  <h3>বকেয়াঃ {due.toLocaleString("bn-BD")}</h3>
                  <h3>স্টকঃ {stockAmount.toLocaleString("bn-BD")}</h3>
                  <h3>কর্যঃ {loanAmount.toLocaleString("bn-BD")}</h3>
                  <hr />
                  <h2>মোটঃ {total.toLocaleString("bn-BD")}</h2>
                </div>
              }
            />
          </Grid>
          <Grid item sx={12} sm={6} md={3}>
            <Card
              title="স্টক"
              border={colors.redAccent[400]}
              content={data.stocks.map((stock, index) => (
                <div key={index}>
                  <h3 style={{ fontWeight: "400" }}>
                    {stock.product}: {weightConvert(stock.weight)}
                  </h3>
                </div>
              ))}
            />
          </Grid>
          <Grid item sx={12} sm={6} md={3}>
            <Card
              title="খরচ"
              border={colors.blueAccent[400]}
              content={
                <div>
                  <h3>আজ: {expensesAmount.toLocaleString("bn-BD")}</h3>
                  <h3>এই মাস: {expensesAmount.toLocaleString("bn-BD")}</h3>
                </div>
              }
            />
          </Grid>
          <Grid item sx={12} sm={6} md={3}>
            <Card
              title="Accounts"
              border={colors.blueAccent[400]}
              content={<h2>Hello World</h2>}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
