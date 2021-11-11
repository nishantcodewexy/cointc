import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Div,
  Dropdown,
  Tabs,
  Tab,
  Sonnet,
  Nav,
} from "react-bootstrap";
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./Orders.css";

import { useSelector } from "react-redux";

import usdt_icon from "../../app-assets/images/coin/usdt.png";
import lang_ch_icon from "../../app-assets/images/nation/lang_ch.png";
import lang_ko_icon from "../../app-assets/images/nation/lang_ko.png";
import xrp_icon from "../../app-assets/images/coin/xrp.png";
import eth_icon from "../../app-assets/images/coin/eth.png";

import { SERVICE } from "../../../../_constants";

export const Orders = ({ services, useService }) => {
  const session = useSelector((state) => state?.session);

  const { account } = services;

  let service = useService({
    [SERVICE?.BULK_ORDER]: services?.account?.bulkOrder,
  });
  const { data, dispatchRequest, isFetching } = service;

  useEffect(() => {
    dispatchRequest(
      {
        type: SERVICE?.BULK_ORDER,
        payload: {
          fake: true,
        },
      },
      true
    );
  }, []);

  const orderTabs = {
    all: {
      label: "all orders",
      filter(data) {
        return data;
      },
    },
    mine: {
      label: "my orders",
      filter(data) {
        return data.filter(
          (item) => item?.user?.id === session?.user?.user?.id
        );
      },
    },
  };

  const [tableData, setTableData] = useState([]);
  const [_activeCurrencyTab, _setActiveCurrencyTab] = useState(
    orderTabs[0] || null
  );
  const [_activeTradeTypeTab, _setActiveTradeTypeTab] = useState([0] || null);
  const [_activeTabData, _setActiveTabData] = useState([]);
  const [activeTab, setActiveTab] = useState(Object.keys(orderTabs)[0]);

  const onTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setTableData(() => orderTabs[activeTab].filter(data?.result));
  }, [data, activeTab]);

  return session && !isFetching ? (
    <>
      <div className="content">
        <section id="mainTop">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="wow fadeInDown" data-wow-delay="0.3s">
                  Orders
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section id="lnb">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <ul className="option clear">
                  {/* <li className={(activeTab === "in-progress-tab" ? "on" : "")}><a href="#" onClick={() => handleTab("in-progress-tab")}>In progress</a></li> */}
                  {Object.keys(orderTabs).map((tab) => (
                    <li className={activeTab === tab ? "on" : ""}>
                      <a
                        className="text-capitalize"
                        href="#"
                        onClick={() => onTabClick(tab)}
                      >
                        {orderTabs[tab]?.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="setting">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <dl className="coins">
                  <dt>Coins</dt>
                  <dd>
                    <select name="" id="">
                      <option value="USDT">USDT</option>
                    </select>
                  </dd>
                </dl>
                <dl className="order_type">
                  <dt>Order Type</dt>
                  <dd>
                    <select name="" id="">
                      <option value="sell">sell</option>
                    </select>
                  </dd>
                </dl>
                <dl className="status">
                  <dt>Status</dt>
                  <dd>
                    <select name="" id="">
                      <option value="all">All</option>
                    </select>
                  </dd>
                </dl>
                <a href="#" className="btn_creat">
                  <i className="fas fa-plus-square"></i>Creat an AD
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="orders">
          <div className="container">
            <div className="tab-content">
              <RenderTab data={tableData} />
            </div>
          </div>
        </section>
      </div>
    </>
  ) : (
    "Loading..."
  );
};

function RenderTab({ data }) {
  console.log(data);
  return data?.length ? (
    <div className="">
      <div className="row">
        {/* ============================= OUR API IN NOW IN DATA */}
        <div className="table_container wow fadeInUp" data-wow-delay="0.6s">
          <table>
            <thead>
              <tr>
                <th>Partner/Date</th>
                <th>Assets/Type</th>
                <th>Price/Quantity</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, key) => (
                <tr key={key}>
                  {/* partner*/}
                  <td className="user">
                    <p className="flex_object">
                      <span className="min">{order.advert?.user?.pname}</span>
                    </p>
                    <ul className="clear">
                      <li>
                        <span>{order?.createdAt}</span>
                      </li>
                    </ul>
                  </td>
                  {/* asset/type */}
                  <td style={``}>
                    <div>icon</div>
                    <div>
                      <p>Sell</p>
                      <p>USDT</p>
                    </div>
                  </td>
                  {/* price/quantity */}
                  <td className="available_limit">
                    <dl className="limit clear">
                      <dt>Price</dt>
                      <dd>
                        {order?.advert?.price}
                        {order?.advert?.fiat}
                      </dd>
                    </dl>
                    <dl className="available clear">
                      <dt>Quantity</dt>
                      <dd className="crypt">{order.advert?.available_qty}</dd>
                    </dl>
                  </td>
                  {/* total */}
                  <td className="payment">
                    {order?.total_amount}
                    {order?.advert?.fiat}
                  </td>
                  {/* status */}
                  <td className="price">{order.status}</td>
                  {/* <td className="transaction">
                                        <TradeModel button_text={data.button_text} button_className={data.button_class} isPopup={data.isPopup}>
                                        </TradeModel>
                                        <button button_text={data.button_text} button_className={data.button_class} isPopup={data.isPopup} className="new_buy_btc"  > Buy BTC</button>
                                    </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <>Nothing Found!</>
  );
}
