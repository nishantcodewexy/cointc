import { Helmet } from "react-helmet";
import { useEffect , useLayoutEffect} from "react";

function AdminDashboardIndex() {
  useEffect(() => {
    /* const parser = new DOMparser();
    const htmlString = parser.parseFromString(str, 'text/html').body.childNodes; */
    const htmlString = document.createRange().createContextualFragment(`
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="author" content="PIXINVENT" />
    <title>CoinTC - Admin</title>
  
    <link
      href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,600%7CIBM+Plex+Sans:300,400,500,600,700"
      rel="stylesheet"
    />

    <link
      rel="stylesheet"
      type="text/css"
      href="app-assets/vendors/css/vendors.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="app-assets/vendors/css/tables/datatable/dataTables.bootstrap4.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="app-assets/vendors/css/tables/datatable/responsive.bootstrap4.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="app-assets/vendors/css/tables/datatable/buttons.bootstrap4.min.css"
    />

    <link
      rel="stylesheet"
      type="text/css"
      href="app-assets/css/bootstrap.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="app-assets/css/bootstrap-extended.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="app-assets/css/colors.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="app-assets/css/components.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="app-assets/css/themes/dark-layout.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="app-assets/css/themes/semi-dark-layout.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="app-assets/css/core/menu/menu-types/vertical-menu.css"
    />
    <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
    <link
      rel="stylesheet"
      type="text/css"
      href="assets/fontawesome/css/all.min.css"
    />
    `);

    document.getElementsByTagName("head")[0].appendChild(htmlString);
  });

  useLayoutEffect(() => {
    const htmlString = `
    <!-- BEGIN: Vendor JS-->
    <script src="app-assets/vendors/js/vendors.min.js"></script>
    <script src="app-assets/fonts/LivIconsEvo/js/LivIconsEvo.tools.js"></script>
    <script src="app-assets/fonts/LivIconsEvo/js/LivIconsEvo.defaults.js"></script>
    <script src="app-assets/fonts/LivIconsEvo/js/LivIconsEvo.min.js"></script>
    <!-- BEGIN Vendor JS-->

    <!-- BEGIN: Page Vendor JS-->
    <script src="app-assets/vendors/js/charts/apexcharts.min.js"></script>
    <script src="app-assets/vendors/js/extensions/dragula.min.js"></script>
    <!-- END: Page Vendor JS-->

    <!-- BEGIN: Theme JS-->
    <script src="app-assets/js/scripts/configs/vertical-menu-dark.js"></script>
    <script src="app-assets/js/core/app-menu.js"></script>
    <script src="app-assets/js/core/app.js"></script>
    <script src="app-assets/js/scripts/components.js"></script>
    <script src="app-assets/js/scripts/footer.js"></script>
    <!-- END: Theme JS-->

    <!-- BEGIN: Page JS-->
    <script src="app-assets/js/scripts/pages/dashboard-analytics.js"></script>
    <!-- END: Page JS-->
    `;
    // document.body.insertAdjacentHTML("beforeend", htmlString);
    document.body.innerHTML += htmlString;
  });

  return (
    <div
      className="vertical-layout vertical-menu-modern semi-dark-layout 2-columns  navbar-sticky footer-static  "
      data-open="click"
      data-menu="vertical-menu-modern"
      data-col="2-columns"
      data-layout="semi-dark-layout"
    >
      {/* BEGIN: Header  */}
      <div className="header-navbar-shadow"></div>
      <nav className="header-navbar main-header-navbar navbar-expand-lg navbar navbar-with-menu fixed-top ">
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div className="navbar-collapse" id="navbar-mobile">
              <div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                <ul className="nav navbar-nav">
                  <li className="nav-item mobile-menu d-xl-none mr-auto">
                    <a
                      className="nav-link nav-menu-main menu-toggle hidden-xs"
                      href=""
                    >
                      <i className="ficon bx bx-menu"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <ul className="nav navbar-nav float-right">
                <li className="dropdown dropdown-user nav-item">
                  <a
                    className="dropdown-toggle nav-link dropdown-user-link"
                    href=""
                    data-toggle="dropdown"
                  >
                    <div className="user-nav d-sm-flex d-none">
                      <span className="user-name">Admin</span>
                      <span className="user-status text-muted">Available</span>
                    </div>
                    <span>
                      <img
                        className="round"
                        src="/app-assets/images/portrait/small/avatar-s-11.jpg"
                        alt="avatar"
                        height="40"
                        width="40"
                      />
                    </span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right pb-0">
                    <a className="dropdown-item" href="#">
                      <i className="bx bx-user mr-50"></i> Edit Profile
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bx bx-envelope mr-50"></i> My Inbox
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bx bx-check-square mr-50"></i> Task
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bx bx-message mr-50"></i> Chats
                    </a>
                    <div className="dropdown-divider mb-0"></div>
                    <a className="dropdown-item" href="#">
                      <i className="bx bx-power-off mr-50"></i> Logout
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* END: Header */}

      {/* BEGIN: Main Menu */}
      <div
        className="main-menu menu-fixed menu-dark menu-accordion menu-shadow"
        data-scroll-to-active="true"
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mr-auto">
              <a className="navbar-brand" href="#">
                <div className="brand-logo"></div>
                <h2 className="brand-text mb-0">CoinTC</h2>
              </a>
            </li>
            <li className="nav-item nav-toggle">
              <a
                className="nav-link modern-nav-toggle pr-0"
                data-toggle="collapse"
              >
                <i className="bx bx-x d-block d-xl-none font-medium-4 primary"></i>
                <i
                  className="toggle-icon bx bx-disc font-medium-4 d-none d-xl-block primary"
                  data-ticon="bx-disc"
                ></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="shadow-bottom"></div>
        <div className="main-menu-content">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
            data-icon-style="lines"
          >
            <li className="active nav-item">
              <a href="index.html">
                <i className="menu-livicon" data-icon="envelope-pull"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  Dashboard
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="adminbankinfo.html">
                <i className="menu-livicon" data-icon="bank"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  Admin Bank Details
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="menu-livicon" data-icon="user"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  User Management
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="user_info.html"
                  >
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice List"
                    >
                      User information
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="secession_member.html"
                  >
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice"
                    >
                      Secession Member
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="login_history.html"
                  >
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice Edit"
                    >
                      Login History
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="menu-livicon" data-icon="envelope-pull"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  SMS Management
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="sms_management_user.html"
                  >
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice List"
                    >
                      SMS management by user
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="sms_history_list.html"
                  >
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice"
                    >
                      SMS history
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#">
                <i className="menu-livicon" data-icon="unlock"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Authentication Management
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a className="d-flex align-items-center" href="list_security">
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice List"
                    >
                      Security Management
                    </span>
                  </a>
                </li>
                <li>
                  <a className="d-flex align-items-center" href="kyc_list.html">
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice"
                    >
                      KYC Certification
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="menu-livicon" data-icon="notebook"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Deposit and Withdrawal Management
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="deposit_details.html"
                  >
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice List"
                    >
                      Deposit and Withdrawal History
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="d-flex align-items-center"
                    href="withdraw_details.html"
                  >
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice"
                    >
                      Withdrawal application management
                    </span>
                  </a>
                </li>
                <li>
                  <a className="d-flex align-items-center" href="#">
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice"
                    >
                      Withdrawal fee management
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="menu-livicon" data-icon="list"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  P2P management
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="menu-livicon" data-icon="gift"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Referral Management
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="ads_list.html">
                <i className="menu-livicon" data-icon="adjust"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Ads management
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="user_balance.html">
                <i className="menu-livicon" data-icon="balance"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Balance Management
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="support.html">
                <i className="menu-livicon" data-icon="balance"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Support
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="currency_list.html">
                <i className="menu-livicon" data-icon="balance"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Currency Management
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="trade_history.html">
                <i className="menu-livicon" data-icon="balance"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  P2P Trade
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="p2p_dispute_list.html">
                <i className="menu-livicon" data-icon="balance"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  P2P Dispute List
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="chat_history.html">
                <i className="menu-livicon" data-icon="balance"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Chat History
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="menu-livicon" data-icon="briefcase"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  wallet management
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="menu-livicon" data-icon="comments"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Chat management
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a className="d-flex align-items-center" href="#">
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice List"
                    >
                      Chat management
                    </span>
                  </a>
                </li>
                <li>
                  <a className="d-flex align-items-center" href="#">
                    <i className="bx bx-right-arrow-alt"></i>
                    <span
                      className="menu-item text-truncate"
                      data-i18n="Invoice"
                    >
                      Dispute management
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="menu-livicon" data-icon="users"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Customer Center Management
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="menu-livicon" data-icon="credit-card-out"></i>
                <span className="menu-title text-truncate" data-i18n="Invoice">
                  Payment Management
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/*  END: Main Menu */}

      {/* BEGIN: Content */}
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <div className="dashPages">
              <h2>Dashboard</h2>
            </div>

            {/* <!-- Dashboard Analytics Start --> */}
            <section id="dashboard-analytics">
              <div className="row">
                {/* <!-- Activity Card Starts--> */}

                {/* <!-- Profit Report Card Starts--> */}
                <div className="col-xl-4 col-md-6 col-12 profit-report-card">
                  <div className="row">
                    <div className="col-md-12 col-sm-6">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="card-title">Users</h4>
                          <a href="#">view All</a>
                        </div>
                        <div className="card-body d-flex justify-content-space-evenly">
                          <div className="d-inline-flex">
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-green">
                                0
                              </h5>
                              <small className="text-muted">New</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-blue">
                                20
                              </h5>
                              <small className="text-muted">Total</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-parpal">
                                5
                              </h5>
                              <small className="text-muted">Suspend</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-6">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="card-title">Admin Status</h4>
                          <a href="#">view All</a>
                        </div>
                        <div className="card-body d-flex justify-content-space-evenly">
                          <div className="d-inline-flex">
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-green">
                                0
                              </h5>
                              <small className="text-muted">New</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-blue">
                                20
                              </h5>
                              <small className="text-muted">Total</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-parpal">
                                5
                              </h5>
                              <small className="text-muted">Suspend</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6 col-12 profit-report-card">
                  <div className="row">
                    <div className="col-md-12 col-sm-6">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="card-title">Withdraw Request</h4>
                          <a href="#">view All</a>
                        </div>
                        <div className="card-body d-flex justify-content-space-evenly">
                          <div className="d-inline-flex">
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-green">
                                0
                              </h5>
                              <small className="text-muted">New</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-blue">
                                20
                              </h5>
                              <small className="text-muted">Total</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-parpal">
                                5
                              </h5>
                              <small className="text-muted">Suspend</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-6">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="card-title">KYC</h4>
                          <a href="#">view All</a>
                        </div>
                        <div className="card-body d-flex justify-content-space-evenly">
                          <div className="d-inline-flex">
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-green">
                                0
                              </h5>
                              <small className="text-muted">New</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-blue">
                                20
                              </h5>
                              <small className="text-muted">Total</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-parpal">
                                5
                              </h5>
                              <small className="text-muted">Suspend</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6 col-12 profit-report-card">
                  <div className="row">
                    <div className="col-md-12 col-sm-6">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="card-title">Suport Tickets</h4>
                          <a href="#">view All</a>
                        </div>
                        <div className="card-body d-flex justify-content-space-evenly">
                          <div className="d-inline-flex">
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-green">
                                0
                              </h5>
                              <small className="text-muted">New</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-blue">
                                20
                              </h5>
                              <small className="text-muted">Total</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-parpal">
                                5
                              </h5>
                              <small className="text-muted">Suspend</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-6">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="card-title">2 Factor Auth...</h4>
                          <a href="#">view All</a>
                        </div>
                        <div className="card-body d-flex justify-content-space-evenly">
                          <div className="d-inline-flex">
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-green">
                                0
                              </h5>
                              <small className="text-muted">New</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-blue">
                                20
                              </h5>
                              <small className="text-muted">Total</small>
                            </div>
                          </div>
                          <div className="d-inline-flex">
                            <div id="profit-info-chart d-none"></div>
                            <div className="profit-content ml-50 mt-50">
                              <h5 className="mb-0 text-center text-color-parpal">
                                5
                              </h5>
                              <small className="text-muted">Suspend</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Sales Chart Starts--> */}
                <div className="col-xl-3 col-md-6 col-12 sales-card d-none">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <div className="card-title-content">
                        <h4 className="card-title">Sales</h4>
                        <small className="text-muted">
                          Calculated in last 7 days
                        </small>
                      </div>
                      <i className="bx bx-dots-vertical-rounded font-medium-3 cursor-pointer"></i>
                    </div>
                    {/* <!-- <div className="card-body">
                                    <div id="sales-chart" className="mb-2"></div>
                                    <div className="d-flex justify-content-between my-1">
                                        <div className="sales-info d-flex align-items-center">
                                            <i className='bx bx-up-arrow-circle text-primary font-medium-5 mr-50'></i>
                                            <div className="sales-info-content">
                                                <h6 className="mb-0">Best Selling</h6>
                                                <small className="text-muted">Sunday</small>
                                            </div>
                                        </div>
                                        <h6 className="mb-0">28.6k</h6>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <div className="sales-info d-flex align-items-center">
                                            <i className='bx bx-down-arrow-circle icon-light font-medium-5 mr-50'></i>
                                            <div className="sales-info-content">
                                                <h6 className="mb-0">Lowest Selling</h6>
                                                <small className="text-muted">Thursday</small>
                                            </div>
                                        </div>
                                        <h6 className="mb-0">986k</h6>
                                    </div>
                                </div> --> */}
                  </div>
                </div>
                {/* <!-- Growth Chart Starts--> */}
                <div className="col-xl-3 col-md-6 col-12 growth-card d-none">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButtonSec"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          2020
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButtonSec"
                        >
                          <a className="dropdown-item" href="">
                            2020
                          </a>
                          <a className="dropdown-item" href="">
                            2019
                          </a>
                          <a className="dropdown-item" href="">
                            2018
                          </a>
                        </div>
                      </div>
                      <div id="growth-Chart"></div>
                      <h6 className="mt-2"> 62% Growth in 2020</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* <!-- Task Card Starts --> */}
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="card widget-todo">
                        <div className="card-header border-bottom d-none justify-content-between align-items-center flex-wrap">
                          <h4 className="card-title d-flex mb-25 mb-sm-0 d-none">
                            <i className="bx bx-check font-medium-5 pl-25 pr-75"></i>
                            Tasks
                          </h4>
                          <ul className="list-inline d-flex mb-25 mb-sm-0">
                            <li className="d-flex align-items-center">
                              <i className="bx bx-filter font-medium-3 mr-50"></i>
                              <div className="dropdown">
                                <div
                                  className="dropdown-toggle mr-1 cursor-pointer"
                                  role="button"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  Filter
                                </div>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a className="dropdown-item" href="">
                                    My Tasks
                                  </a>
                                  <a className="dropdown-item" href="">
                                    Due this week
                                  </a>
                                  <a className="dropdown-item" href="">
                                    Due next week
                                  </a>
                                  <a className="dropdown-item" href="">
                                    Custom Filter
                                  </a>
                                </div>
                              </div>
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="bx bx-sort mr-50 font-medium-3"></i>
                              <div className="dropdown">
                                <div
                                  className="dropdown-toggle cursor-pointer"
                                  role="button"
                                  id="dropdownMenuButton2"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  Sort
                                </div>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton2"
                                >
                                  <a className="dropdown-item" href="">
                                    None
                                  </a>
                                  <a className="dropdown-item" href="">
                                    Alphabetical
                                  </a>
                                  <a className="dropdown-item" href="">
                                    Due Date
                                  </a>
                                  <a className="dropdown-item" href="">
                                    Assignee
                                  </a>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body px-0 py-1 d-none">
                          <ul
                            className="widget-todo-list-wrapper"
                            id="widget-todo-list"
                          >
                            <li className="widget-todo-item">
                              <div className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-50">
                                <div className="widget-todo-title-area d-flex align-items-center">
                                  <i className="bx bx-grid-vertical mr-25 font-medium-4 cursor-move"></i>
                                  <div className="checkbox checkbox-shadow">
                                    <input
                                      type="checkbox"
                                      className="checkbox__input"
                                      id="checkbox1"
                                    />
                                    <label htmlFor="checkbox1"></label>
                                  </div>
                                  <span className="widget-todo-title ml-50">
                                    Add SCSS and JS files if required
                                  </span>
                                </div>
                                <div className="widget-todo-item-action d-flex align-items-center">
                                  <div className="badge badge-pill badge-light-success mr-1">
                                    frontend
                                  </div>
                                  <div className="avatar bg-rgba-primary m-0 mr-50">
                                    <div className="avatar-content">
                                      <span className="font-size-base text-primary">
                                        RA
                                      </span>
                                    </div>
                                  </div>
                                  <div className="dropdown">
                                    <span
                                      className="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer icon-light"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      role="menu"
                                    ></span>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a className="dropdown-item" href="">
                                        View Details
                                      </a>
                                      <a className="dropdown-item" href="">
                                        Duplicate Task
                                      </a>
                                      <a className="dropdown-item" href="">
                                        Delete Task
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="widget-todo-item">
                              <div className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-50">
                                <div className="widget-todo-title-area d-flex align-items-center">
                                  <i className="bx bx-grid-vertical mr-25 font-medium-4 cursor-move"></i>
                                  <div className="checkbox checkbox-shadow">
                                    <input
                                      type="checkbox"
                                      className="checkbox__input"
                                      id="checkbox2"
                                    />
                                    <label htmlFor="checkbox2"></label>
                                  </div>
                                  <span className="widget-todo-title ml-50">
                                    Check your changes, before commiting
                                  </span>
                                </div>
                                <div className="widget-todo-item-action d-flex align-items-center">
                                  <div className="badge badge-pill badge-light-danger mr-1">
                                    backend
                                  </div>
                                  <div className="avatar m-0 mr-50">
                                    <img
                                      src="../app-assets/images/profile/user-uploads/social-2.jpg"
                                      alt="img placeholder"
                                      height="32"
                                      width="32"
                                    />
                                  </div>
                                  <div className="dropdown">
                                    <span
                                      className="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer icon-light"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      role="menu"
                                    ></span>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a className="dropdown-item" href="">
                                        View Details
                                      </a>
                                      <a className="dropdown-item" href="">
                                        Duplicate Task
                                      </a>
                                      <a className="dropdown-item" href="">
                                        Delete Task
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="widget-todo-item completed">
                              <div className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-50">
                                <div className="widget-todo-title-area d-flex align-items-center">
                                  <i className="bx bx-grid-vertical mr-25 font-medium-4 cursor-move"></i>
                                  <div className="checkbox checkbox-shadow">
                                    <input
                                      type="checkbox"
                                      className="checkbox__input"
                                      id="checkbox3"
                                      defaultChecked
                                    />
                                    <label htmlFor="checkbox3"></label>
                                  </div>
                                  <span className="widget-todo-title ml-50">
                                    Dribble, Behance, UpLabs & Pinterest Post
                                  </span>
                                </div>
                                <div className="widget-todo-item-action d-flex align-items-center">
                                  <div className="badge badge-pill badge-light-primary mr-1">
                                    UI/UX
                                  </div>
                                  <div className="avatar bg-rgba-primary m-0 mr-50">
                                    <div className="avatar-content">
                                      <span className="font-size-base text-primary">
                                        JP
                                      </span>
                                    </div>
                                  </div>
                                  <div className="dropdown">
                                    <span
                                      className="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer icon-light"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      role="menu"
                                    ></span>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a className="dropdown-item" href="/">
                                        View Details
                                      </a>
                                      <a className="dropdown-item" href="/">
                                        Duplicate Task
                                      </a>
                                      <a className="dropdown-item" href="/">
                                        Delete Task
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="widget-todo-item">
                              <div className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-50">
                                <div className="widget-todo-title-area d-flex align-items-center">
                                  <i className="bx bx-grid-vertical mr-25 font-medium-4 cursor-move"></i>
                                  <div className="checkbox checkbox-shadow">
                                    <input
                                      type="checkbox"
                                      className="checkbox__input"
                                      id="checkbox4"
                                    />
                                    <label htmlFor="checkbox4"></label>
                                  </div>
                                  <span className="widget-todo-title ml-50">
                                    Fresh Design Web & Responsive Miracle
                                  </span>
                                </div>
                                <div className="widget-todo-item-action d-flex align-items-center">
                                  <div className="badge badge-pill badge-light-info mr-1">
                                    Design
                                  </div>
                                  <div className="avatar m-0 mr-50">
                                    <img
                                      src="../app-assets/images/profile/user-uploads/user-05.jpg"
                                      alt="img placeholder"
                                      height="32"
                                      width="32"
                                    />
                                  </div>
                                  <div className="dropdown">
                                    <span
                                      className="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer icon-light"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      role="menu"
                                    ></span>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a className="dropdown-item" href="/">
                                        View Details
                                      </a>
                                      <a className="dropdown-item" href="/">
                                        Duplicate Task
                                      </a>
                                      <a className="dropdown-item" href="/">
                                        Delete Task
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="widget-todo-item">
                              <div className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-50">
                                <div className="widget-todo-title-area d-flex align-items-center">
                                  <i className="bx bx-grid-vertical mr-25 font-medium-4 cursor-move"></i>
                                  <div className="checkbox checkbox-shadow">
                                    <input
                                      type="checkbox"
                                      className="checkbox__input"
                                      id="checkbox5"
                                    />
                                    <label htmlFor="checkbox5"></label>
                                  </div>
                                  <span className="widget-todo-title ml-50">
                                    Add Calendar page, source and credit page in
                                    documentation
                                  </span>
                                </div>
                                <div className="widget-todo-item-action d-flex align-items-center">
                                  <div className="badge badge-pill badge-light-warning mr-1">
                                    Javascript
                                  </div>
                                  <div className="avatar bg-rgba-primary m-0 mr-50">
                                    <div className="avatar-content">
                                      <span className="font-size-base text-primary">
                                        AK
                                      </span>
                                    </div>
                                  </div>
                                  <div className="dropdown">
                                    <span
                                      className="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer icon-light"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      role="menu"
                                    ></span>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a className="dropdown-item" href="">
                                        View Details
                                      </a>
                                      <a className="dropdown-item" href="">
                                        Duplicate Task
                                      </a>
                                      <a className="dropdown-item" href="">
                                        Delete Task
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="widget-todo-item">
                              <div className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-50">
                                <div className="widget-todo-title-area d-flex align-items-center">
                                  <i className="bx bx-grid-vertical mr-25 font-medium-4 cursor-move"></i>
                                  <div className="checkbox checkbox-shadow">
                                    <input
                                      type="checkbox"
                                      className="checkbox__input"
                                      id="checkbox6"
                                    />
                                    <label htmlFor="checkbox6"></label>
                                  </div>
                                  <span className="widget-todo-title ml-50">
                                    Add Angular Starter-kit
                                  </span>
                                </div>
                                <div className="widget-todo-item-action d-flex align-items-center">
                                  <div className="badge badge-pill badge-light-primary mr-1">
                                    UI/UX
                                  </div>
                                  <div className="avatar m-0 mr-50">
                                    <img
                                      src="../app-assets/images/profile/user-uploads/user-05.jpg"
                                      alt="img placeholder"
                                      height="32"
                                      width="32"
                                    />
                                  </div>
                                  <div className="dropdown">
                                    <span
                                      className="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer icon-light"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      role="menu"
                                    ></span>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a className="dropdown-item" href="">
                                        View Details
                                      </a>
                                      <a className="dropdown-item" href="">
                                        Duplicate Task
                                      </a>
                                      <a className="dropdown-item" href="">
                                        Delete Task
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <div className="card-header">
                          <div className="card-body p-0">
                            <h4 className="card-title">Deposit</h4>
                          </div>
                        </div>

                        <ul className="chartlablelist">
                          <li>
                            <div className="labelcolorimg"></div>
                            <div className="labelColorDetails">
                              <h2 className="yellowText">
                                <small>New Deposit</small>
                                $0USD
                              </h2>
                            </div>
                          </li>
                          <li>
                            <div className="labelcolorimg"></div>
                            <div className="labelColorDetails">
                              <h2>
                                <small>Total Deposit</small>
                                $55033090.31USD
                              </h2>
                            </div>
                          </li>
                        </ul>
                        <div id="sales-chart" className="mb-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Daily Financials Card Starts --> */}
                <div className="col-lg-5 d-none">
                  <div className="card ">
                    <div className="card-header">
                      <h4 className="card-title">Order Timeline</h4>
                    </div>
                    <div className="card-body">
                      <ul className="timeline mb-0">
                        <li className="timeline-item timeline-icon-primary active">
                          <div className="timeline-time">September, 16</div>
                          <h6 className="timeline-title">
                            1983, orders, $4220
                          </h6>
                          <p className="timeline-text">2 hours ago</p>
                          <div className="timeline-content">
                            <img
                              src="../app-assets/images/icon/pdf.png"
                              alt="document"
                              height="23"
                              width="19"
                              className="mr-50"
                            />
                            <span>New Order.pdf</span>
                          </div>
                        </li>
                        <li className="timeline-item timeline-icon-primary active">
                          <div className="timeline-time">September, 17</div>
                          <h6 className="timeline-title">
                            12 Invoices have been paid
                          </h6>
                          <p className="timeline-text">25 minutes ago</p>
                          <div className="timeline-content">
                            <img
                              src="../app-assets/images/icon/pdf.png"
                              alt="document"
                              height="23"
                              width="19"
                              className="mr-50"
                            />
                            <span>Invoices.pdf</span>
                          </div>
                        </li>
                        <li className="timeline-item timeline-icon-primary active pb-0">
                          <div className="timeline-time">September, 18</div>
                          <h6 className="timeline-title">
                            Order #37745 from September
                          </h6>
                          <p className="timeline-text">4 minutes ago</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Dashboard Analytics end --> */}
          </div>
        </div>
      </div>
      {/* END: Content */}

      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>

      {/* <!-- BEGIN: Footer--> */}
      <footer className="footer footer-static footer-light">
        <p className="clearfix mb-0">
          <span className="float-left d-inline-block">2021 &copy; CoinTC</span>
          <span className="float-right d-sm-inline-block d-none">CoinTC</span>
          <button className="btn btn-primary btn-icon scroll-top" type="button">
            <i className="bx bx-up-arrow-alt"></i>
          </button>
        </p>
      </footer>
      {/* <!-- END: Footer--> */}
    </div>
  );
}

export default AdminDashboardIndex;
