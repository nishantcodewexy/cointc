import React, { useEffect, useState, useRef } from "react";
import "./Trade.css";
import {
  Button,
  Modal,
  Nav,
  ProgressBar,
  Tabs,
  Tab,
  Dropdown,
  Overlay,
  Tooltip,
  OverlayTrigger,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

// COMPONENTS
import TableGenerator from "../../../admin/components/TableGenerator.Component";
import usdt_icon from "../../app-assets/images/icon/usdt.png";
import refresh_icon from "../../app-assets/images/page/creat-ad/refresh.png";
import bank_icon from "../../app-assets/images/icon/bank-icon.png";
import money_icon from "../../app-assets/images/icon/money.png";
import chat_icon from "../../app-assets/images/icon/chat-icon.png";
import axios from "axios";
// CONSTANTS
import { SERVICE } from "../../../../_constants";

// ============================== first method
axios
  .get(
    "/api/ad",
    {},
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${}`
      },
    }
  )
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// fetch('https://mywebsite.com/endpoint/', {
//     method: 'GET',
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         firstParam: 'yourValue',
//         secondParam: 'yourOtherValue',
//     }),
// });

// ================================ fifth method ================
// function HeaderPostAction() {

//     axios({
//           method: 'get',
//           url: 'advert/',
//           data: {},
//           headers: {
//              "Content-Type": "application/x-www-form-urlencoded",
//              "Cache-Control": "no-cache",
//              "Postman-Token": "42e6c291-9a09-c29f-f28f-11872e2490a5"
//           }
//        }).then(function(response) {
//           console.log("Heade With Authentication :" + response);
//        })
//        .catch(function(error) {
//           console.log("Post Error : " + error);
//        });
//  }

// =========================================== Second method
// fetch("https://examples.com/example.json")
//  .then(response => {
//    if (!response.ok) {
//      throw Error(response.statusText)
//    }
//    return response.json()
//  })
//  .then(data => {
//    console.log(data)
//  })
//  .catch(error => console.error(error))

//   const getAdvertData = async () => {
//       try{
//           const data = await axios.get(
//             ""
//           );
//           console.log(data.data)
//         //   setAdvert(data.data)
//       }catch (e){
//           console.log(e)
//       }
//   }

// ========================================= THIRD METHOD

function Advert({ services, useService }) {
  const { account } = services;

  let service = useService({
    [SERVICE?.ADVERT_FIND]: account.findAdvert,
  });

  const { dispatchRequest } = service;

  useEffect(() => {
    dispatchRequest({
      type: SERVICE?.ADVERT_FIND,
      payload: {
        fake: true,
        sudo: true,
      },
      // toast: { success: notifySuccess, error: notifyError },
    });
  }, []);

  return (
    <>
      {
        <Row>
          <Col>
            <TableGenerator
              {...{ service }}
              omit="*"
              extras={[
                "email",
                "currency",
                "account_balance",
                "available_balance",
              ]}
              transformers={{
                email: ({ row }) => row?.user?.email || "",
                currency: ({ row }) => row?.currency || " Not specified",
                account_balance: ({ row }) =>
                  row?.balance?.accountBalance || "",
                available_balance: ({ row }) =>
                  row?.balance?.availableBalance || "",
              }}
            />
          </Col>
        </Row>
      }
    </>
  );
}

export default Advert;
//

function BankTooltip() {
  const [show, setShow] = useState(true);
  const target = useRef(null);
  // setShow(show)
  return (
    <>
      <OverlayTrigger
        key={"bottom"}
        placement={"bottom"}
        overlay={
          <Tooltip id={`tooltip-${"bottom"}`} className="tooltip-bank-transfer">
            {" "}
            Bank Transfer{" "}
          </Tooltip>
        }
      >
        <Button
          variant="transparent"
          className="align-items-center bg-transparent d-inline-flex p-0 mr-1"
        >
          <Image src={bank_icon} width={20} />
        </Button>
      </OverlayTrigger>
    </>
  );
}

const table_data = {
  buy_data: {
    btc: [
      {
        first_char: "A",
        name: "Auhai8888",
        isVarified: true,
        order_count: "106",
        order_text: "주문",
        percentage: "98.1",
        status: "완료",
        availability: "사용가능",
        payment: "1.65908675 BTC",
        is_limited: "한도",
        payment_range: "50,000 - 300,000 CNY",
        price: "270,042.63 CNY",
        button_text: "Buy BTC",
        button_url: "#",
        button_class: "btn_buy",
        isPopup: true,
      },
    ],
    eth: [
      {
        first_char: "A",
        name: "Auhai8888",
        isVarified: true,
        order_count: "106",
        order_text: "주문",
        percentage: "98.1",
        status: "완료",
        availability: "사용가능",
        payment: "1.65908675 BTC",
        is_limited: "한도",
        payment_range: "50,000 - 300,000 CNY",
        price: "270,042.63 CNY",
        button_text: "Buy ETH",
        button_url: "#",
        button_class: "btn_buy",
        isPopup: true,
      },
    ],
    usdt: [
      {
        first_char: "A",
        name: "Auhai8888",
        order_count: "106",
        order_text: "주문",
        percentage: "98.1",
        status: "완료",
        availability: "사용가능",
        payment: "1.65908675 BTC",
        is_limited: "한도",
        payment_range: "50,000 - 300,000 CNY",
        price: "270,042.63 CNY",
        button_text: "Buy USDT",
        button_url: "#",
        button_class: "btn_buy",
        isPopup: true,
      },
    ],
    xrp: [
      {
        first_char: "A",
        name: "Auhai8888",
        isVarified: true,
        order_count: "106",
        order_text: "주문",
        percentage: "98.1",
        status: "완료",
        availability: "사용가능",
        payment: "1.65908675 BTC",
        is_limited: "한도",
        payment_range: "50,000 - 300,000 CNY",
        price: "270,042.63 CNY",
        button_text: "Buy XRP",
        button_url: "#",
        button_class: "btn_buy",
        isPopup: true,
      },
    ],
    eos: [
      {
        first_char: "A",
        name: "Auhai8888",
        isVarified: true,
        order_count: "106",
        order_text: "주문",
        percentage: "98.1",
        status: "완료",
        availability: "사용가능",
        payment: "1.65908675 BTC",
        is_limited: "한도",
        payment_range: "50,000 - 300,000 CNY",
        price: "270,042.63 CNY",
        button_text: "Buy EOS",
        button_url: "#",
        button_class: "btn_buy",
        isPopup: true,
      },
    ],
  },
  sell_data: {
    btc: [
      {
        first_char: "A",
        name: "Auhai8888",
        isVarified: true,
        order_count: "106",
        order_text: "주문",
        percentage: "98.1",
        status: "완료",
        availability: "사용가능",
        payment: "1.65908675 BTC",
        is_limited: "한도",
        payment_range: "50,000 - 300,000 CNY",
        price: "270,042.63 CNY",
        button_text: "Buy BTC",
        button_url: "#",
        button_class: "btn_buy",
        isPopup: true,
      },
    ],
    eth: [
      {
        first_char: "A",
        name: "Auhai8888",
        isVarified: true,
        order_count: "106",
        order_text: "주문",
        percentage: "98.1",
        status: "완료",
        availability: "사용가능",
        payment: "1.65908675 BTC",
        is_limited: "한도",
        payment_range: "50,000 - 300,000 CNY",
        price: "270,042.63 CNY",
        button_text: "Buy ETH",
        button_url: "#",
        button_class: "btn_buy",
        isPopup: true,
      },
    ],
    usdt: [
      {
        first_char: "A",
        name: "Auhai8888",
        order_count: "106",
        order_text: "주문",
        percentage: "98.1",
        status: "완료",
        availability: "사용가능",
        payment: "1.65908675 BTC",
        is_limited: "한도",
        payment_range: "50,000 - 300,000 CNY",
        price: "270,042.63 CNY",
        button_text: "Buy USDT",
        button_url: "#",
        button_class: "btn_buy",
        isPopup: true,
      },
    ],
    xrp: [
      {
        first_char: "A",
        name: "Auhai8888",
        isVarified: true,
        order_count: "106",
        order_text: "주문",
        percentage: "98.1",
        status: "완료",
        availability: "사용가능",
        payment: "1.65908675 BTC",
        is_limited: "한도",
        payment_range: "50,000 - 300,000 CNY",
        price: "270,042.63 CNY",
        button_text: "Buy XRP",
        button_url: "#",
        button_class: "btn_buy",
        isPopup: true,
      },
    ],
    eos: [
      {
        first_char: "A",
        name: "Auhai8888",
        isVarified: true,
        order_count: "106",
        order_text: "주문",
        percentage: "98.1",
        status: "완료",
        availability: "사용가능",
        payment: "1.65908675 BTC",
        is_limited: "한도",
        payment_range: "50,000 - 300,000 CNY",
        price: "270,042.63 CNY",
        button_text: "Buy EOS",
        button_url: "#",
        button_class: "btn_buy",
        isPopup: true,
      },
    ],
  },
};
function renderTableData(data) {
  return (
    <tr>
      <td class="user">
        <p>
          <span>{data.first_char}</span>
          {data.name}
          {data.isVarified === true ? <i class="fas fa-check-circle"></i> : ""}
        </p>
        <ul class="clear">
          <li>
            <span>{data.order_count}</span>
            {data.order_text}
          </li>
          <li>
            <span>{data.percentage}</span>% {data.status}
          </li>
        </ul>
      </td>
      <td class="available_limit">
        <dl class="available clear">
          <dt>{data.availability}</dt>
          <dd>{data.payment}</dd>
        </dl>
        <dl class="limit clear">
          <dt>{data.is_limited}</dt>
          <dd>{data.payment_range}</dd>
        </dl>
      </td>
      <td class="payment">
        <span class="icon_method01"></span>
        <span class="icon_method02"></span>
        <span class="icon_method03"></span>
      </td>
      <td class="price">{data.price}</td>
      <td class="transaction">
        <TradeModel
          button_text={data.button_text}
          button_class={data.button_class}
          isPopup={data.isPopup}
        ></TradeModel>
      </td>
    </tr>
  );
}

const TradeModel = function (props) {
  const button_text = props.button_text;
  const button_class = props.button_class;
  const isPopup = props.isPopup;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Link
        to="#"
        className={button_class}
        onClick={isPopup ? handleShow : undefined}
      >
        {button_text}
      </Link>

      <Modal show={show} onHide={handleClose} size={"xl"}>
        <Modal.Body>
          <div class="row" id="tradeModal">
            <div class="col-sm-12 col-md-6">
              <div class="scroll-area-sm">
                <div class="modal-header align-items-center">
                  <h3 class="modal-title">Bi7752</h3>
                  <p class="mb-0">2270 orders 99.65% completion</p>
                </div>

                <div class="col col-sm-12 col-md-8 mt-3">
                  <div class="trade-my-modal">
                    <div class="my-modal-top d-flex justify-content-between align-items-center">
                      <h5 class="mb-0">Trade Info</h5>
                      <a href="#" class="btn btn-ref-my-modal">
                        30s to Refresh
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col col-sm-12 col-md-10 mt-4">
                  <div class="trade-my-modal">
                    <div class="my-modal-center">
                      <table class="w-100">
                        <thead>
                          <th class="text-light-gray font-weight-light">
                            Price
                          </th>
                          <th class="text-light-gray font-weight-light">
                            Available
                          </th>
                        </thead>
                        <tbody>
                          <td class="text-black">47,757.8541 USD</td>
                          <td class="text-black">1.546410 BTC</td>
                        </tbody>
                        <thead>
                          <th class="text-light-gray font-weight-light pt-4">
                            Payment
                          </th>
                          <th class="text-light-gray font-weight-light pt-4">
                            Limit
                          </th>
                        </thead>
                        <tbody>
                          <td class="text-black">60 Minutes</td>
                          <td class="text-black">$50,000.00 ~ $100,000.00</td>
                        </tbody>
                        <thead>
                          <th class="text-light-gray font-weight-light pt-4">
                            Payment Method
                          </th>
                          <th class="text-light-gray font-weight-light pt-4"></th>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6">
              <div class="modal-body">
                <div class="modal-body-input">
                  <label>How much do you want to Sell?</label>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Amount.."
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text my-input" id="basic-addon2">
                        BTC
                      </span>
                    </div>
                  </div>
                  <p class="d-flex justify-content-end text-black">
                    사용 가능 : 0.24810 BTC &nbsp;
                    <span class="text-light-blue"> 전체 </span>{" "}
                  </p>
                </div>
                <div class="modal-body-input">
                  <label>How much do you want to Sell?</label>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Amount.."
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text my-input" id="basic-addon2">
                        BTC
                      </span>
                    </div>
                  </div>
                  <p class="d-flex justify-content-end text-black">
                    사용 가능 : 0.24810 BTC &nbsp;
                    <span class="text-light-blue"> 전체 </span>{" "}
                  </p>
                  <div class="row ">
                    <div class="col-12">
                      <div class="md-head">Guides</div>
                      <div class="md-dt-txt">
                        1. Please confirm the price and amount before place this
                        trade.
                      </div>
                      <div class="md-dt-txt">
                        2. Please pay the seller in the payment window. After
                        completed the payment, please click "I have paid". The
                        seller will release the crypto to you after received
                        payment. If you do not mark as paid in time, the trade
                        will be automatically cancelled after timeout.
                      </div>
                      <div class="md-dt-txt">
                        3.If you encounter trade dispute, you can open a
                        dispute, the customer service will intervene to deal
                        with it. For details, please see "Help
                      </div>
                    </div>
                  </div>
                  <div class="row justify-content-center mt-5 mb-5">
                    <div class="col-4">
                      <a href="/sell_btc" class="btn btn-primary ">
                        Sell BTC
                      </a>
                    </div>
                    <div class="col-4">
                      <a href="#" class="btn btn-outline-limited btn-cans">
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const Trade = ({ services, useService }) => {
  const { account } = services;

  let service = useService({
    [SERVICE?.ADVERT_FIND]: services?.account?.findAdvert,
  });
  const { data, dispatchRequest } = service;

  useEffect(() => {
    dispatchRequest(
      {
        type: SERVICE?.ADVERT_FIND,
        payload: {
          fake: true,
        },
      },
      true
    );
  }, []);

  const currencies = ["btc", "eth", "usdt", "xrp", "eos"];

  const trade_types = ["buy", "sell"];
  const [tableData, setTableData] = useState([]);
  const [_activeCurrencyTab, _setActiveCurrencyTab] = useState(
    currencies[0] || null
  );
  const [_activeTradeTypeTab, _setActiveTradeTypeTab] = useState(
    trade_types[0] || null
  );
  const [_activeTabData, _setActiveTabData] = useState([]);

  useEffect(() => {
    if (data?.result?.length) {
      const result = data.result;
      let obj = {};

      currencies.forEach((currency) => {
        // sell
        let sell = result.filter(
          (item) =>
            String(item?.crypto).toLowerCase() == currency &&
            String(item?.type).toLowerCase() == "sell"
        );
        let buy = result.filter(
          (item) =>
            String(item?.crypto).toLowerCase() == currency &&
            String(item?.type).toLowerCase() == "buy"
        );
        obj[currency] = { buy, sell };
      });
      setTableData(() => obj);
    }
  }, [data]);

  useEffect(() => {
    if (
      Object.keys(tableData)?.length &&
      _activeCurrencyTab &&
      _activeTradeTypeTab
    ) {
      console.log("HERE");
      _setActiveTabData(
        () => tableData[_activeCurrencyTab][_activeTradeTypeTab] || []
      );
    }
  }, [_activeTradeTypeTab, _activeCurrencyTab, tableData]);

  const [activeTab, setActiveTab] = useState("buy-tab");
  const [activeBuyTab, setActiveBuyTab] = useState("buy-btc-tab");
  const [activeSellTab, setActiveSellTab] = useState("sell-btc-tab");

  const handleTab = (tab) => {
    setActiveTab(tab);
  };
  const handleBuyTab = (tab) => {
    setActiveBuyTab(tab);
  };
  const handleSellTab = (tab) => {
    setActiveSellTab(tab);
  };

  return (
    <div class="content">
      <section id="mainTop">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h3 class="wow fadeInDown" data-wow-delay="0.3s">
                P2P Trade
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section id="lnb">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <ul class="buy_sell clear">
                <li className={activeTab === "buy-tab" ? "on" : ""}>
                  <a href="#" onClick={() => handleTab("buy-tab")}>
                    Buy
                  </a>
                </li>
                <li className={activeTab === "sell-tab" ? "on" : ""}>
                  <a href="#" onClick={() => handleTab("sell-tab")}>
                    Sell
                  </a>
                </li>
              </ul>
              {activeTab === "buy-tab" ? (
                <ul class="coin_name clear">
                  <li className={activeBuyTab === "buy-btc-tab" ? "on" : ""}>
                    <a href="#" onClick={() => handleBuyTab("buy-btc-tab")}>
                      BTC
                    </a>
                  </li>
                  <li className={activeBuyTab === "buy-eth-tab" ? "on" : ""}>
                    <a href="#" onClick={() => handleBuyTab("buy-eth-tab")}>
                      ETH
                    </a>
                  </li>
                  <li className={activeBuyTab === "buy-usdt-tab" ? "on" : ""}>
                    <a href="#" onClick={() => handleBuyTab("buy-usdt-tab")}>
                      USDT
                    </a>
                  </li>
                  <li className={activeBuyTab === "buy-xrp-tab" ? "on" : ""}>
                    <a href="#" onClick={() => handleBuyTab("buy-xrp-tab")}>
                      XRP
                    </a>
                  </li>
                  <li className={activeBuyTab === "buy-eos-tab" ? "on" : ""}>
                    <a href="#" onClick={() => handleBuyTab("buy-eos-tab")}>
                      EOS
                    </a>
                  </li>
                </ul>
              ) : (
                <ul class="coin_name clear">
                  <li className={activeSellTab === "sell-btc-tab" ? "on" : ""}>
                    <a href="#" onClick={() => handleSellTab("sell-btc-tab")}>
                      BTC
                    </a>
                  </li>
                  <li className={activeSellTab === "sell-eth-tab" ? "on" : ""}>
                    <a href="#" onClick={() => handleSellTab("sell-eth-tab")}>
                      ETH
                    </a>
                  </li>
                  <li className={activeSellTab === "sell-usdt-tab" ? "on" : ""}>
                    <a href="#" onClick={() => handleSellTab("sell-usdt-tab")}>
                      USDT
                    </a>
                  </li>
                  <li className={activeSellTab === "sell-xrp-tab" ? "on" : ""}>
                    <a href="#" onClick={() => handleSellTab("sell-xrp-tab")}>
                      XRP
                    </a>
                  </li>
                  <li className={activeSellTab === "sell-eos-tab" ? "on" : ""}>
                    <a href="#" onClick={() => handleSellTab("sell-eos-tab")}>
                      EOS
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="setting">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <dl class="money">
                <dt>화폐</dt>
                <dd>
                  <select name="" id="">
                    <option value="CNY">CNY</option>
                    <option value="AED">AED</option>
                    <option value="AMD">AMD</option>
                    <option value="ARS">ARS</option>
                    <option value="AUD">AUD</option>
                    <option value="BDT">BDT</option>
                    <option value="BHD">BHD</option>
                  </select>
                </dd>
              </dl>
              <dl class="method">
                <dt>결제 방법</dt>
                <dd>
                  <select name="" id="">
                    <option value="all_payment">All payments</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="wechat">WeChat</option>
                    <option value="alipay">Alipay</option>
                    <option value="cash_deposit">Cash Deposit to Bank</option>
                  </select>
                </dd>
              </dl>
              <a href="/ad_create" class="btn_creat">
                <i class="fas fa-plus-square"></i>Creat an AD
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="trade">
        <div class="container">
          <div class="tab-content">
            <div
              className={
                "tab-pane " + (activeTab === "buy-tab" ? "active" : "")
              }
            >
              <BuyTabContent valueFromParent={activeBuyTab} />
            </div>
            <div
              className={
                "tab-pane " + (activeTab === "sell-tab" ? "active" : "")
              }
            >
              <SellTabContent valueFromParent={activeSellTab} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function BuyTabContent(props) {
  //    btc_ads = temp1.filter(order => String(order?.crypto).toLowerCase() == "btc")

  //    sell_ads = temp1.filter(order => String(order?.type).toLowerCase() =='sells' && String(order?.crypto).lowerCase()  == 'btc')
  var activeSubTab = props.valueFromParent;
  return (
    <>
      <div class="indicator">
        <button type="button" class="btn_prev" disabled>
          <i class="fal fa-chevron-left"></i>
        </button>
        <span class="on">1</span>
        <span>2</span>
        <span>3</span>
        <span style={{ cursor: "default" }}>...</span>
        <span>40</span>
        <button type="button" class="btn_next">
          <i class="fal fa-chevron-right"></i>
        </button>
      </div>
    </>
  );
}

function SellTabContent(props) {
  var activeSubTab = props.valueFromParent;
  return (
    <>
      <div class="indicator">
        <button type="button" class="btn_prev" disabled>
          <i class="fal fa-chevron-left"></i>
        </button>
        <span class="on">1</span>
        <span>2</span>
        <span>3</span>
        <span style={{ cursor: "default" }}>...</span>
        <span>40</span>
        <button type="button" class="btn_next">
          <i class="fal fa-chevron-right"></i>
        </button>
      </div>
    </>
  );
}

function RenderTabContent({ data }) {
  console.log({ data });
  return (
    <div class="tab-content">
      <div
        className=""
        id="buy-btc-tab-pane"
        role="tabpanel"
        aria-labelledby="buy-btc-tab"
      >
        <div class="row">
          <div class="col-12">
            <div class="table_container wow fadeInUp" data-wow-delay="0.6s">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Avaliable/Limited</th>
                    <th>Payment</th>
                    <th>Price</th>
                    <th>Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr>
                      <td class="user">
                        <p>
                          <span>{item.user?.pname[0]}</span>
                          {/* <span></span> */}
                          {item.user?.pname} <i class="fas fa-check-circle"></i>
                          {/* <span>{item.user?.verified === true ? <i class="fas fa-check-circle"></i> : ''}</span> */}
                        </p>
                        <ul class="clear">
                          <li>
                            <span>{/* data.order_count */ "106 order"}</span>
                          </li>
                          <li>
                            <span>
                              {/* data.percentage */ " 98.1% Completion "}
                            </span>{" "}
                            {/* data.status */}
                          </li>
                          {/* <li>  106 order | 98.1% Completion  </li> */}
                        </ul>
                      </td>

                      <td class="available_limit">
                        <dl class="limit clear">
                          <dt>{data.is_limited}</dt>
                          <dd>{data.payment_range}</dd>
                        </dl>
                        <dl class="available clear">
                          <dt>{item.max_order_price}</dt>
                          <dt class="crypt">{item.crypto}</dt>
                          {/* 50,000 - 300,000 CNY */}
                          {/* <dt>{item.min_order_price}</dt> */}
                        </dl>
                      </td>

                      <td class="payment">
                        <span class="icon_method01"></span>
                        <span class="icon_method02"></span>
                        <span class="icon_method03"></span>
                      </td>

                      <td class="price">
                        {/* {data.price} */}
                        {item.price}
                        {item.fiat}
                      </td>
                      <td class="transaction">
                        <TradeModel
                          button_text={data.button_text}
                          button_class={data.button_class}
                          isPopup={data.isPopup}
                        ></TradeModel>
                        <button
                          button_text={data.button_text}
                          button_class={data.button_class}
                          isPopup={data.isPopup}
                          class="new_buy_btc"
                        >
                          {" "}
                          Buy BTC
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
