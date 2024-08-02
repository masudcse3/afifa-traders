/** @format */
import { useEffect, useState } from "react";
import axios from "axios";
// import Cookies from "js-cookie";
import Spinner from "../../components/utils/Spinner";
import Card from "../../components/Dashboard/Card";
import { Grid, useTheme } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import { tokens } from "../../theme";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const api_url = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    accounts: { cash: 0, check: 0, due: 0 },
    stocks: [],
    expenses: [],
    expensesToday: [],
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
  const expenseToday = data.expensesToday.reduce(
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
      {loading && <Spinner />}
      {error && <p>Error: {error}</p>}
      <Grid container spacing={1} justifyContent="center">
        <Grid item sm={12} md={4}>
          <Card
            icon={<AccountBalanceWalletOutlinedIcon />}
            title={`অ্যাকাউন্টঃ  ${total.toLocaleString("bn-BD")}`}
            bg={colors.primary["400"]}
            content={
              <div className="title-text">
                <h3>
                  <b>ক্যাশঃ </b>
                  {cash.toLocaleString("bn-BD")}
                </h3>
                <h3>
                  <b>চেকঃ </b>
                  {check.toLocaleString("bn-BD")}
                </h3>
                <h3>
                  <b>স্টকঃ </b>
                  {stockAmount.toLocaleString("bn-BD")}
                </h3>
                <h3>
                  <b>বাকিঃ </b>
                  {due.toLocaleString("bn-BD")}
                </h3>
                <h3>
                  <b>কর্যঃ </b>
                  {loanAmount.toLocaleString("bn-BD")}
                </h3>
              </div>
            }
          />
        </Grid>
        <Grid item sx={12} sm={12} md={4}>
          <Card
            title="স্টক"
            bg={colors.primary[400]}
            icon={<Inventory2OutlinedIcon />}
            content={data.stocks.map((stock, index) => (
              <div key={index} className="title-text">
                <h3>
                  <b> {stock.product}:</b> {weightConvert(stock.weight)}
                  <br />
                  <b>মূল্যঃ </b>
                  {stock.cash.toLocaleString("bn-BD")} টাকা <br />
                  <b>পড়তাঃ </b>
                  {stock.porta.toLocaleString("bn-BD")} টাকা
                </h3>
              </div>
            ))}
          />
        </Grid>
        <Grid item sx={12} sm={12} md={4}>
          <Card
            title="খরচ"
            bg={colors.primary[400]}
            icon={<AddBusinessOutlinedIcon />}
            content={
              <div className="title-text">
                <h3>আজ: {expenseToday.toLocaleString("bn-BD")}</h3>
                <h3>এই মাস: {expensesAmount.toLocaleString("bn-BD")}</h3>
              </div>
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
