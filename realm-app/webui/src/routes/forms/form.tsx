/**
 * Form Page Component
 *
 * Description:
 *
 *
 *
 * Components Used:
 *
 *
 * Author:
 *  - Ayaz Shah (ayaz.shah@mongodb.com)
 *  - Adlai Gordon (adlai.gordon@mongodb.com)
 */

import Layout from "../../components/Layout/Layout";
import { Col, Row } from "react-bootstrap";
import { Option, Select } from "@leafygreen-ui/select";
import { Combobox, ComboboxOption } from "@leafygreen-ui/combobox";
import TextInput from "@leafygreen-ui/text-input";
import TextArea from "@leafygreen-ui/text-area";
import React, { useEffect, useState, useContext } from "react";
import FormFooter from "@leafygreen-ui/form-footer";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { SearchInput, SearchResult } from "@leafygreen-ui/search-input";
import { H1, Body, Label, Link } from "@leafygreen-ui/typography";
import Badge from "@leafygreen-ui/badge";
import Banner from "@leafygreen-ui/banner";
import addDays from "date-fns/addDays";
import { AuthContext } from "../../realmApp/AuthProvider";
import { useNavigate } from "react-router-dom";
import Toast from "@leafygreen-ui/toast";
import { app } from "../../realmApp/realmApp";
import Checkbox from "@leafygreen-ui/checkbox";
import * as Realm from "realm-web";
import { useOktaAuth } from "@okta/okta-react";
import "../forms/form.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import ReactGA from "react-ga4";

interface Props {
  isProtected: boolean;
}

export const FormComponent = ({ isProtected }: Props) => {
  // Get the card paramter "cardLink" passed from home page
  const { card } = useParams<{ card: string }>();

  ReactGA.send({ hitType: "pageview", page: `/form/{card}`, title: card });


  // Get start date to the nearest 15 minutes
  const getNearestFutureQuarterHour = (date) => {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    const totalMinutes =
      hour * 60 + minutes + seconds / 60 + milliseconds / 60000;

    const roundedTotalMinutes = Math.ceil(totalMinutes / 15) * 15;

    const nearestFutureQuarterHour = new Date(date);
    nearestFutureQuarterHour.setHours(Math.floor(roundedTotalMinutes / 60));
    nearestFutureQuarterHour.setMinutes(roundedTotalMinutes % 60);
    nearestFutureQuarterHour.setSeconds(0);
    nearestFutureQuarterHour.setMilliseconds(0);

    return nearestFutureQuarterHour;
  };

  // Get end date to the nearest 15 minutes
  const getNearestFutureEndQuarterHour = (date) => {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    const totalMinutes =
      hour * 60 + minutes + seconds / 60 + milliseconds / 60000;

    const roundedTotalMinutes = Math.ceil(totalMinutes / 15) * 15 + 15;

    const nearestFutureQuarterHour = new Date(date);
    nearestFutureQuarterHour.setHours(Math.floor(roundedTotalMinutes / 60));
    nearestFutureQuarterHour.setMinutes(roundedTotalMinutes % 60);
    nearestFutureQuarterHour.setSeconds(0);
    nearestFutureQuarterHour.setMilliseconds(0);

    return nearestFutureQuarterHour;
  };

  /* 
    Establish stateful values for the form -- useState(<defaultValue>)
    Determines if a field will be hidden or shown by default
  */
  const [productsFieldHidden, setProductsFieldHidden] = useState(true);
  const [salesSegmentFieldHidden, setSalesSegmentFieldHidden] = useState(true);

  const [expectedParticipantFieldHidden, setExpectedParticipantFieldHidden] =
    useState(true);
  const [participantPersonasFieldHidden, setParticipantPersonasFieldHidden] =
    useState(true);
  const [routeFieldHidden, setRouteFieldHidden] = useState(true);
  const [nbmDeckLinkFieldHidden, setNBMDeckLinkFieldHidden] = useState(true);
  const [tfwCheckListFieldHidden, setTFWCheckListFieldHidden] = useState(true);
  const [tfwApprovedHidden, setTFWApprovedHidden] = useState(true);
  const [nbmDeck3WhyHidden, setNBMDeck3WhyHidden] = useState(true);
  const [dateOptionalHidden, setDateOptionalHidden] = useState(true);
  const [marketingCampaignHidden, setMarketingCampaignHidden] = useState(true);
  const [workshopTypeHidden, setWorkshopTypeHidden] = useState(true);
  const [useCaseFieldHidden, setUseCaseFieldHidden] = useState(true);
  const [demoFieldHidden, setDemoFieldHidden] = useState(true);
  const [testFieldHidden, setTestFieldHidden] = useState(true);

  /* Set if SFDC Account or Opportunity is Required or not
  */
  // Sets default state of required
  const [accountFieldRequired, setAccountFieldRequired] = useState(true);
  const [accountFieldLabel, setAccountFieldLabel] = useState<string>("Account Name *");
  const [opportunityFieldRequired, setOpportunityFieldRequired] = useState(true);
  const [opportunityFieldLabel, setOpportunityFieldLabel] = useState<string>("Salesforce Opportunity Name *");

  // Call this function if not required 
  const setAccountOppFieldsNotRequired = () => {
    setAccountFieldRequired(false);
    setAccountFieldLabel("Account Name");
    setOpportunityFieldRequired(false);
    setOpportunityFieldLabel("Salesforce Opportunity Name");
  };

/*
    Set the default values for each field
    Also need to create a hidden switch above
  */

  const [salesSegment, setSalesSegment] = useState<string>("");

  const [title, setTitle] = useState<string>("");
  const [leadTimeText, setLeadTimeText] = useState<string>("");
  const [leadTime, setLeadTime] = useState(0);
  const [startDate, setStartDate] = useState(() => {
    const currentDate = new Date(); // Get the current date
    currentDate.setDate(currentDate.getDate() + leadTime); // Add leadTime days to the current date
    return currentDate; // Return the updated start date
  });

  const [startTime, setStartTime] = useState(
    getNearestFutureQuarterHour(new Date())
  );
  const [endTime, setEndTime] = useState(
    getNearestFutureEndQuarterHour(new Date())
  );

  const [routeValue, setRouteValue] = useState("");
  const [oppsList, setOppsList] = useState([]);
  const [selectedOpp, setSelectedOpp] = useState("");
  const [disableOpp, setDisableOpp] = useState(true);
  const [accountId, setAccountId] = useState("");
  const [accountInfo, setAccountInfo] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [subjectValue, setSubjectValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [isOptionalDateChecked, setOptionalDateChecked] = useState(false);
  const [timezoneValue, setTimezoneValue] = useState("");
  const [productsValue, setProductsValue] = useState("");
  const [expectedParticipantsValue, setExpectedParticipantsValue] =
    useState("");
  const [participantsPersonasValue, setParticipantsPersonasValue] =
    useState("");
  const [extraEmailsValue, setExtraEmailsValue] = useState([]);
  const [emailList, setEmailList] = useState([]);
  const [emailCache, setEmailCache] = useState({});
  const [rdEmailList, setRDEmailList] = useState([]);
  const [languagesValue, setLanguageValue] = useState("English");
  const [workshopTypeValue, setWorkshopTypeValue] = useState("");
  const [useCaseValue, setUseCaseValue] = useState("");
  const [demosValue, setDemosValue] = useState("");
  const [tfwChecklistValue, setTFWChecklistValue] = useState("");
  const [nbmDeckLinkValue, setNBMDeckLinkValue] = useState("");
  const [tfwApprovedValue, setTFWApprovedValue] = useState("");
  const [marketingCampaignValue, setMarketingCampaignValue] = useState("");
  const [nbmDeckValue, setNBMDeckValue] = useState("");
  const [userProfile, setUserProfile] = useState<{
    data: {
      firstName: string;
      lastName: string;
      email: string;
      name: string;
    };
    identities: any[];
    type: string;
  } | null>(null);
  const [open, setOpen] = useState(false);
  const [validationToastOpen, setValidationToastOpen] = useState(false);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [warningToastOpen, setWarningToastOpen] = useState(false);
  const [progressToastOpen, setProgressToastOpen] = useState(false);
  const [ticketId, setTicketID] = useState("");
  const [ticketWarning, setTicketWarning] = useState("");

  // Validation Fields
  const [ticketValidation, setTicketValidation] = useState([]);
  const [isAccountSelected, setIsAccountSelected] = useState(false);
  const [isCcSelected, setIsCcSelected] = useState(false);
  const [isRdSelected, setIsRdSelected] = useState(false);
  const navigate = useNavigate();

  // Get the user from the context
  const [user, setUser] = useState(null);
  const { authState, oktaAuth } = useOktaAuth();

  // This is the user used to invoke the functions
  const [appUser, setAppUser] = useState(null);

  useEffect(() => {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + leadTime); // Add leadTime days to the current date
    if (currentDate.getDay() === 0) { // if date falls on Sunday, add 1 day
      currentDate.setDate(currentDate.getDate() + 1); 
    } else if (currentDate.getDay() === 6) { // if date falls on Saturday, add 2 day
      currentDate.setDate(currentDate.getDate() + 2);
    }
    setStartDate(currentDate); // Update the startDate state with the new calculated date
  }, [leadTime]);

  /* Adding a new Form
      This section set the values of fields based on the cardLink parameter -- change the default value, or show/hide
      To add a new form, add a new if block

      else if (card === "<cardLink>") {
        setTitle("<Top Banner Text>");
        setLeadTimeText("XX Days"); // String to show
        setLeadTime(6); // Integer to block of this many upcoming calendar days
      }

      All form fields are hidden by default. 
      To unhide: set<FormFieldName>Hidden(false);
      
      Example:
      setProductsFieldHidden(false);
      setExpectedParticipantFieldHidden(false);
      setMarketingCampaignHidden(false);
    
  */

  useEffect(() => {
    if (card === "discovery") {
      setTitle("Discovery call");
      setLeadTimeText("2 Days");
      setLeadTime(2);
      setProductsFieldHidden(false);
      setExpectedParticipantFieldHidden(false);
      setParticipantPersonasFieldHidden(false);
      setUseCaseFieldHidden(false);
      setDemoFieldHidden(false);
    } else if (card === "webinar") {
      setTitle("Webinar");
      setLeadTimeText("6 Days");
      setLeadTime(6);
      setProductsFieldHidden(false);
      setExpectedParticipantFieldHidden(false);
      setMarketingCampaignHidden(false);
      setAccountOppFieldsNotRequired();
    } else if (card === "workshop") {
      setTitle("Workshop");
      setLeadTimeText("6 Days");
      setLeadTime(6);
      setExpectedParticipantFieldHidden(false);
      setMarketingCampaignHidden(false);
      setWorkshopTypeHidden(false);
      setAccountOppFieldsNotRequired();
    } else if (card === "sa") {
      setTitle("End to End opportunity SA");
      setLeadTimeText("2 Days");
      setLeadTime(2);
      setDateOptionalHidden(false);
      setNBMDeck3WhyHidden(false);
    } else if (card === "preonboarding") {
      setTitle("Pre-onboarding");
      setLeadTimeText("1 Day");
      setLeadTime(1);
      setSalesSegmentFieldHidden(false);
    } else if (card === "searchtfw") {
      setTitle("Search TFW");
      setLeadTimeText("2 Days");
      setLeadTime(2);
      setExpectedParticipantFieldHidden(false);
      setParticipantPersonasFieldHidden(false);
      setTFWCheckListFieldHidden(false);
    } else if (card === "nwtfw") {
      setTitle("New Workload TFW");
      // setLeadTimeText("3 Days");
      setLeadTime(5);
      setRouteFieldHidden(false);
      setNBMDeckLinkFieldHidden(false);
      setTFWCheckListFieldHidden(false);
      setTFWApprovedHidden(false);
    } else if (card === "csmSupport") {
      setTitle("CSM Support");
      setLeadTimeText("5 Days");
      setLeadTime(5);
      setSalesSegmentFieldHidden(false);
    } else {
      navigate(`*`)
    }
  }, []);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUser(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUser(info);
        loginApiKey();
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const loginApiKey = () => {
    // Getting the JWT token from Okta authState and passing as an paran to Realm
    const credentials = Realm.Credentials.jwt(authState.idToken?.idToken);

    app.logIn(credentials).then((appUser) => {
      setAppUser(appUser);
    });
  };

  const getFormattedMinutes = (date) => {
    const minutes = date.getMinutes();
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
  };

  const formatHour = (hour) => {
    return String(hour).padStart(2, "0");
  };


/* Validation
  Determine if a field has a valid value.
  Fail validation if not

  Build up an array of Validation Errors to display to the user upon validation failure

*/
  const addValidationError = (errorText) => {
    setTicketValidation((prevState) => [...prevState, errorText]);
  };

  const validation = (): boolean => {
    setTicketValidation([]);
    let validationPassed = true;
    if (accountFieldRequired && accountInfo === "") {
      validationPassed = false;
      addValidationError("Account Name is a required field");
    }

    if (opportunityFieldRequired && selectedOpp === "") {
      validationPassed = false;
      addValidationError("Salesforce Opportunity Name is a required field");
    }

    if (card === "preonboarding" || card === "csmSupport") {
      if (salesSegment === "") {
        addValidationError("Your Sales Segment is a required field");
        validationPassed = false;
      }
    }

    if (subjectValue === "") {
      addValidationError("Subject is a required field");
      validationPassed = false;
    }

    if (descriptionValue === "") {
      addValidationError("Description is a required field");
      validationPassed = false;
    }

    if (startDate === null && isOptionalDateChecked === false) {
      addValidationError("Meeting Date is a required field");
      validationPassed = false;
    }

    if (card === "workshop") {
      if (workshopTypeValue === "") {
        validationPassed = false;
        addValidationError("Workshop Type is a required field");
      }
    }

    if (timezoneValue === "") {
      validationPassed = false;
      addValidationError("Timezone is a required field");
    }

    if (
      card === "discovery" ||
      card === "webinar" ||
      card === "workshop" ||
      card === "searchtfw"
    ) {
      if (expectedParticipantsValue === "") {
        validationPassed = false;
        addValidationError("Expected Participant Size is a required field");
      }
    }

    if (card === "webinar") {
      if (productsValue === "") {
        validationPassed = false;
        addValidationError("Product is a required field");
      }
    }

    if (card === "searchtfw") {
      if (participantsPersonasValue === "") {
        validationPassed = false;
        addValidationError("Participant Personas is a required field");
      }

      if (tfwChecklistValue === "") {
        validationPassed = false;
        addValidationError("Copy of the TFW Checklist is a required field");
      }
    }

    if (card === "discovery") {
      if (productsValue === "") {
        validationPassed = false;
        addValidationError("Product is a required field");
      }

      if (participantsPersonasValue === "") {
        validationPassed = false;
        addValidationError("Participant Personas is a required field");
      }
    }

    if (card === "nwtfw") {
      if (routeValue === "") {
        validationPassed = false;
        addValidationError("Route is a required field");
      }
      if (nbmDeckLinkValue === "") {
        validationPassed = false;
        addValidationError("NBM Deck Link is a required field");
      }

      if (tfwChecklistValue === "") {
        validationPassed = false;
        addValidationError("Copy of the TFW Checklist is a required field");
      }

      if (tfwApprovedValue === "") {
        validationPassed = false;
        addValidationError("TFW Approved by RD is a required field");
      }
    }

    return validationPassed;
  };


  /* 
    Build up body of API call to Atlas App Services, which then in turn calls Zendesk

  */

  const create_ticket = async () => {
    if (user === undefined) return;

    if (validation() === false) {
      setValidationToastOpen(true);
      return;
    } else {
      setValidationToastOpen(false);
      setWarningToastOpen(false);
      setSuccessToastOpen(false);
      setProgressToastOpen(true);

      //retrieve the emails for CC field
      let CCfield = [];
      extraEmailsValue.forEach((e) => {
        CCfield.push({ user_email: emailCache[e] });
      });

      const ticket = {
        subject: subjectValue,
        description: descriptionValue,
        brand: "Sales",
        formType: "Remote Solution Center",
        requester: {
          name: `${user.name}`,
          email: `${user.email}`,
        },
        "Your Sales Segment": salesSegment,
        group: "SO-L1-Solution-Architects",
        CC: CCfield,
        "Meeting time (regex)":
          formatHour(startTime.getHours()) +
          ":" +
          getFormattedMinutes(startTime),
        "Meeting end time (regex)":
          formatHour(endTime.getHours()) + ":" + getFormattedMinutes(endTime),
        "Meeting Date": startDate.toISOString().slice(0, 10),
        "Timezone (SA)": timezoneValue,
        "Number of Attendees (Expected)": Number(expectedParticipantsValue),
        "Expected Participant Size": Number(expectedParticipantsValue),
        "Number of Attendees (Actual)": 0,
        "Customer name": accountInfo,
        Products: productsValue,
        "Participant Personas": participantsPersonasValue,
        "Language Requirements (SA)": languagesValue,
        "Use Case": useCaseValue,
        Demos: demosValue,
        "Copy of the TFW Checklist (SA)": tfwChecklistValue,
        "NBM Deck link (SA)": nbmDeckLinkValue,
        "TFW approved by RD (SA)": tfwApprovedValue,
        "SFDC Campaign Link": marketingCampaignValue,
        'NBM / "3 Whys" deck': nbmDeckValue,
      };

      if (selectedOpp === "") {
        ticket["SFDC Opportunity link (or Account link)"] = {
          type: "account",
          id: accountId,
        };
      } else {
        // Retrieve the opp id from the list of opportunities
        let opp = oppsList.find((op) => op.nm === selectedOpp);
        if (Array.isArray(opp)) opp = opp[0];
        ticket["SFDC Opportunity link (or Account link)"] = {
          type: "opportunity",
          id: opp._id,
        };
      }

      if (card === "sa") {
        ticket["Type Of Request (SA)"] = "End-to-End opportunity SA";
        if (isOptionalDateChecked === true) {
          ticket["Meeting Date"] = null;
          ticket["Meeting time (regex)"] = null;
          ticket["Meeting end time (regex)"] = null;
        }
      } else if (card === "discovery") {
        ticket["Type Of Request (SA)"] = "Customer call";
        ticket["Sales Call (sub)"] = "Discovery/Demo";
      } else if (card === "webinar") {
        ticket["Type Of Request (SA)"] = "Webinar";
      } else if (card === "workshop") {
        ticket["Type Of Request (SA)"] = "eWorkshop";
        ticket["eWorkshop"] = workshopTypeValue;
      } else if (card === "preonboarding") {
        ticket["Type Of Request (SA)"] = "Customer call";
        ticket["Sales Call (sub)"] = "Pre-Onboarding";
      } else if (card === "searchtfw") {
        ticket["Type Of Request (SA)"] = "Customer call";
        ticket["Sales Call (sub)"] = "Search TFW";
      } else if (card === "nwtfw") {
        ticket["Type Of Request (SA)"] = "Customer call";
        ticket["Sales Call (sub)"] = routeValue;
      } else if (card === "csmSupport") {
        ticket["Type Of Request (SA)"] = "Customer call";
        ticket["Sales Call (sub)"] = "Discovery/Demo";
      }

      // Call the Realm Function "create_zendesk_ticket"
      const result = await appUser.functions.create_zendesk_ticket(ticket);

      /*  Testing Only -- so that we view & check the newly created ticket
          Future: Redirect to https://help-sales.mongodb.com/hc/en-us/requests/{TICKETID}

      */
      if (result.status === 200) {
        setProgressToastOpen(false);
        setSuccessToastOpen(true); // set state to true on success
        setTicketID(
          `https://help-sales.mongodb.com/hc/en-us/requests/${result.ticketId}`
        );
      } else {
        setProgressToastOpen(false);
        setWarningToastOpen(true);
        const errorBody = result.zendeskResponse.body;
        const jsonObject = JSON.parse(errorBody);

        setTicketWarning(`Error - ${jsonObject.details.base[0].description}`);
      }
    }
  };

  const searchAccount = async (event: any) => {
    if (isAccountSelected) {
      // Reset the flag once we've ignored one change.
      setIsAccountSelected(false);
      return;
    }

    const searchQuery = event.target.value;

    if (user === undefined) return;

    setAccountInfo(searchQuery);

    if (searchQuery.length < 3) {
      setAccountList([]);
      return;
    }

    let search = { searchTerm: searchQuery };

    const response = await appUser.functions.search_account(search);

    setAccountList(response.result);

    //clean the opp field
    setSelectedOpp("")
  };

  const selectAccount = async (acct: any) => {
    setIsAccountSelected(true);

    let search = { account_id: acct._id };

    const response = await appUser.functions.search_opp(search);

    setOppsList(response.result);
    setDisableOpp(false);

    setAccountInfo(acct.nm);
    setAccountId(acct._id);
  };

  const searchRDEmail = async (searchQuery: any) => {
    if (user === undefined) return;

    setTFWApprovedValue(searchQuery);

    if (searchQuery.length < 3) {
      setRDEmailList([]);
      return;
    }

    let search = { searchTerm: searchQuery };

    const response = await appUser.functions.search_by_email(search);

    setRDEmailList(response.result);
  };

  const searchEmail = async (searchQuery: any) => {
    if (user === undefined) return;

    if (searchQuery.length < 3) {
      setEmailList([]);
      return;
    }

    let search = { searchTerm: searchQuery };

    const response = await appUser.functions.search_by_email(search);

    let emails = [];

    response.result.forEach((email) => {
      const concatName = `${email.firstName} ${email.lastName}`;
      emails.push(concatName);
      let cacheObject = emailCache;
      cacheObject[concatName] = email.username;
      setEmailCache(cacheObject);
    });

    setEmailList(emails);
  };

  const handleExtraEmailField = (e) => {
    setExtraEmailsValue(e);
    setEmailList(e);
  };

  const isWeekday = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const filterEndTime = (time: Date): boolean => {
    // const currentDate = new Date();
    const selectedDate = new Date(time);

    return startTime.getTime() < selectedDate.getTime();
  };

  const selectRoute = (route) => {
    setRouteValue(route);
    if (route === "New Workload TFW - Fast") {
      setLeadTimeText("3 Days");
      setLeadTime(3);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate());
      setStartDate(currentDate);
    } else {
      setLeadTimeText("5 Days");
      setLeadTime(5);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate());
      setStartDate(currentDate);
    }
  };

  return (
    <Layout>
      <div>
        <Row className="form-hero-image">
          <Col>
            <H1 className="form-hero-text">{title}</H1>
          </Col>
        </Row>
        <Row className="navigationRow">
          <Col></Col>
          <Col xs={12} md={10} lg={10}>
            <Body className="navigationStyle">
              <a className="navigationRefStyle" href="/">
                Home
              </a>
              <span> &#62; </span> {title}
            </Body>
          </Col>
          <Col></Col>
        </Row>
        <Row className="g-2 mt-2">
          <Col></Col>
          <Col xs={12} md={6} lg={6}>
            <div>
              {routeFieldHidden ? null : (
                <Select
                  className="fieldMargin"
                  label="Route *"
                  name="route"
                  baseFontSize={13}
                  onChange={(selectedValue) => selectRoute(selectedValue)}
                >
                  <Option value="New Workload TFW - Fast">Fast</Option>
                  <Option value="New Workload TFW - Classic">Classic</Option>
                </Select>
              )}
              <Label className="fieldMargin" htmlFor="accountName">
                {accountFieldLabel}
              </Label>
              <SearchInput
                id="accountName"
                className="fieldMargin"
                value={accountInfo}
                onChange={(event) => searchAccount(event)}
                aria-label="Account Name"
              >
                {accountList.map((acct: any, index) => {
                  return (
                    <SearchResult
                      onClick={() => selectAccount(acct)}
                      key={index}
                    >
                      {acct.nm} - {acct.owner}
                    </SearchResult>
                  );
                })}
              </SearchInput>

              <Combobox
                id="searchOpp"
                className="fieldMargin"
                disabled={disableOpp}
                label={opportunityFieldLabel}
                onChange={(value) => setSelectedOpp(value)}
                value={selectedOpp} // set the current value
              >
                {oppsList.map((opp: any, index) => {
                  return <ComboboxOption key={index} value={opp.nm} />;
                })}
              </Combobox>
              {salesSegmentFieldHidden ? null : (
                <Select
                  className="fieldMargin"
                  label="Your Sales Segment *"
                  name="salesSegment"
                  baseFontSize={13}
                  onChange={(selectedValue) => setSalesSegment(selectedValue)}
                >
                  <Option value="PLS">PLS</Option>
                  <Option value="Acquisition">Acquisition</Option>
                  <Option value="Growth">Growth</Option>
                  <Option value="Partners">Partners</Option>
                  <Option value="Pods/Strat/FSI">Pods/Strat/FSI</Option>
                </Select>
              )}
              <TextInput
                className="fieldMargin"
                baseFontSize={13}
                label="Subject *"
                value={subjectValue}
                onChange={(event) => setSubjectValue(event.target.value)}
                optional={false}
              />
              <TextArea
                className="fieldMargin"
                baseFontSize={13}
                label="Description *"
                description="Detailed description of opportunity and engagement (sales challenges, customer challenges, unique considerations). Please add attachments as applicable (web links to 3 Whys/NBM deck, discovery capture sheet, Atlas sizing/pricing info, etc.).
                Note that if more information is provided, engagement completion is faster."
                value={descriptionValue}
                onChange={(event) => setDescriptionValue(event.target.value)}
              />
              <Badge variant="yellow">Lead Time: {leadTimeText}</Badge>
              <Row xs={12} md={12} lg={12}>
                {dateOptionalHidden ? null : (
                  <Checkbox
                    className="my-checkbox"
                    onChange={() => {
                      if (isOptionalDateChecked) {
                        setOptionalDateChecked(false);
                      } else {
                        setOptionalDateChecked(true);
                      }
                    }}
                    label="I do not yet know the date and time of the meeting"
                    checked={isOptionalDateChecked}
                    bold={false}
                  />
                )}
                <Col>
                  {isOptionalDateChecked ? null : (
                    <>
                      <Label className="fieldMargin" htmlFor="datePicker">
                        Meeting Date
                      </Label>
                      <DatePicker
                        minDate={addDays(new Date(), leadTime)}
                        className="datePicker"
                        id="datePicker"
                        selected={startDate}
                        onChange={(date: any) => setStartDate(date)}
                        dateFormat="MMMM d, yyyy"
                        filterDate={isWeekday}
                      />
                    </>
                  )}
                </Col>
                <Col>
                  {isOptionalDateChecked ? null : (
                    <>
                      <Label className="fieldMargin" htmlFor="datePicker">
                        Start Time
                      </Label>
                      <DatePicker
                        className="datePicker"
                        selected={startTime}
                        onChange={(date: Date) => setStartTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Start Time"
                        dateFormat="h:mm aa"
                      />
                    </>
                  )}
                </Col>
                <Col>
                  {isOptionalDateChecked ? null : (
                    <>
                      <Label className="fieldMargin" htmlFor="datePicker">
                        End Time
                      </Label>
                      <DatePicker
                        className="datePicker"
                        selected={endTime}
                        onChange={(date: Date) => setEndTime(date)}
                        filterTime={filterEndTime}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="End Time"
                        dateFormat="h:mm aa"
                      />
                    </>
                  )}
                </Col>
              </Row>
              <Banner className="bannerStyle fieldMargin">
                For urgent requests please reach out to{" "}
                <Link>rsc-manager@mongodb.com</Link>
              </Banner>
              {workshopTypeHidden ? null : (
                <Select
                  className="fieldMargin"
                  label="Workshop Type *"
                  name="workshopType"
                  baseFontSize={13}
                  onChange={(selectedValue) =>
                    setWorkshopTypeValue(selectedValue)
                  }
                >
                  <Option value="Atlas Intro -101">Atlas Intro -101</Option>
                  <Option value="Analytics on Atlas - 111">
                    Analytics on Atlas - 111
                  </Option>
                  <Option value="Atlas Search - 225">Atlas Search - 225</Option>
                  <Option value="Atlas  Realm Web - 201">Atlas  Realm Web - 201</Option>
                  <Option value="Atlas Aggregation Pipeline - 220">
                    Atlas Aggregation Pipeline - 220
                  </Option>
                  <Option value="IoT Time Series - 240">IoT Time Series - 240</Option>
                  <Option value="Other">Other</Option>
                </Select>
              )}
              {/* {workshopTypeHidden ? null : (
                  <WebinarModal />
                )} */}
              <Select
                className="fieldMargin"
                label="Timezone *"
                name="timezone"
                baseFontSize={13}
                onChange={(selectedValue) => setTimezoneValue(selectedValue)}
              >
                <Option value="America/New_York">America/New_York</Option>
                <Option value="America/Chicago">America/Chicago</Option>
                <Option value="America/Los_Angeles">America/Los_Angeles</Option>
                <Option value="Europe/London">Europe/London</Option>
                <Option value="Europe/Berlin">Europe/Berlin</Option>
                <Option value="Europe/Central">Europe/Central</Option>
                <Option value="Asia/Singapore">Asia/Singapore</Option>
                <Option value="Asia/Kolkata">Asia/Kolkata</Option>
                <Option value="Australia/Sydney">Australia/Sydney</Option>
              </Select>
              {productsFieldHidden ? null : (
                <Combobox
                  className="fieldMargin"
                  label="Products *"
                  multiselect={true}
                  onChange={(products: any) => setProductsValue(products)}
                >
                  <ComboboxOption value="MongoDB" />
                  <ComboboxOption value="MongoDB Enterprise Advance" />
                  <ComboboxOption value="MongoDB Atlas" />
                  <ComboboxOption value="Realm" />
                  <ComboboxOption value="Atlas Search" />
                  <ComboboxOption value="Data Lake" />
                  <ComboboxOption value="Online Archive" />
                  <ComboboxOption value="Charts" />
                  <ComboboxOption value="Database Connectors" />
                  <ComboboxOption value="Other" />
                </Combobox>
              )}
              {expectedParticipantFieldHidden ? null : (
                <TextInput
                  className="fieldMargin"
                  baseFontSize={13}
                  label="Expected Participant Size *"
                  type="tel"
                  value={expectedParticipantsValue}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === "" || /^[0-9]+$/.test(value)) {
                      setExpectedParticipantsValue(value);
                    }
                  }}
                />
              )}
              {marketingCampaignHidden ? null : (
                <TextInput
                  className="fieldMargin"
                  baseFontSize={13}
                  label="Marketing Campaign Link"
                  optional={true}
                  value={marketingCampaignValue}
                  onChange={(event) =>
                    setMarketingCampaignValue(event.target.value)
                  }
                />
              )}
              {participantPersonasFieldHidden ? null : (
                <Combobox
                  className="fieldMargin"
                  label="Participant Personas *"
                  multiselect={true}
                  onChange={(participantsPersonas: any) =>
                    setParticipantsPersonasValue(participantsPersonas)
                  }
                >
                  <ComboboxOption value="App Owners" />
                  <ComboboxOption value="Data Analytics" />
                  <ComboboxOption value="Database Administrators" />
                  <ComboboxOption value="Developers" />
                  <ComboboxOption value="DevOps" />
                  <ComboboxOption value="Enterprise Architect" />
                  <ComboboxOption value="Executives" />
                  <ComboboxOption value="MDB Partner" />
                  <ComboboxOption value="Security" />
                </Combobox>
              )}
              {nbmDeckLinkFieldHidden ? null : (
                <TextInput
                  className="fieldMargin"
                  baseFontSize={13}
                  label="NBM Deck Link *"
                  description="Please Share with 10Gen so the SA can access"
                  optional={false}
                  value={nbmDeckLinkValue}
                  onChange={(event) => setNBMDeckLinkValue(event.target.value)}
                />
              )}
              {tfwCheckListFieldHidden ? null : (
                <TextInput
                  className="fieldMargin"
                  baseFontSize={13}
                  label="Copy of the TFW Checklist *"
                  description="Create and fill a copy of this: NWL TFW Prep document https://docs.google.com/document/d/1Nc1zuvmRSTPelClFoloGWLuv8mX_HBupbLIy-PqibSc"
                  optional={false}
                  value={tfwChecklistValue}
                  onChange={(event) => setTFWChecklistValue(event.target.value)}
                />
              )}
              {nbmDeck3WhyHidden ? null : (
                <TextInput
                  className="fieldMargin"
                  baseFontSize={13}
                  label='NBM / "3 Whys" deck'
                  description="Provide Google Presentation Link"
                  optional={true}
                  value={nbmDeckValue}
                  onChange={(event) => setNBMDeckValue(event.target.value)}
                />
              )}
              {useCaseFieldHidden ? null : (
                <Select
                  className="fieldMargin"
                  label="Use Case"
                  name="useCase"
                  baseFontSize={13}
                  onChange={(selectedValue) => setUseCaseValue(selectedValue)}
                >
                  <Option value="Single View">Single View</Option>
                  <Option value="Mainframe Offload">Mainframe Offload</Option>
                  <Option value="Event-Driven Architecture">
                    Event-Driven Architecture
                  </Option>
                  <Option value="Time Series">Time Series</Option>
                  <Option value="Microservices">Microservices</Option>
                  <Option value="Mobile & Web Development">Mobile & Web Development</Option>
                  <Option value="Internet of Things">Internet of Things</Option>
                  <Option value="TBD">TBD</Option>
                  <Option value="Other">Other</Option>
                </Select>
              )}
              {demoFieldHidden ? null : (
                <Combobox
                  className="fieldMargin"
                  label="Demos"
                  multiselect={true}
                  onChange={(demos: any) => setDemosValue(demos)}
                >
                  <ComboboxOption value="MongoDB" />
                  <ComboboxOption value="MongoDB Enterprise Advance" />
                  <ComboboxOption value="MongoDB Atlas" />
                  <ComboboxOption value="Realm" />
                  <ComboboxOption value="Atlas Search" />
                  <ComboboxOption value="Data Lake" />
                  <ComboboxOption value="Online Archive" />
                  <ComboboxOption value="Charts" />
                  <ComboboxOption value="Database Connectors" />
                  <ComboboxOption value="Other" />
                </Combobox>
              )}
              {tfwApprovedHidden ? null : (
                <Combobox
                  label="TFW Approved by RD *"
                  description="Name of the RD who assisted the NBM in the past"
                  placeholder="Search"
                  value={tfwApprovedValue}
                  onFilter={(event) => searchRDEmail(event)}
                >
                  {rdEmailList.map((email: any, index) => {
                    return (
                      <ComboboxOption
                        key={index}
                        value={`${email.firstName} ${email.lastName}`}
                      />
                    );
                  })}
                </Combobox>
              )}

              <Combobox
                label="CC"
                placeholder="Search"
                onFilter={(event) => searchEmail(event)}
                onChange={(e) => handleExtraEmailField(e)}
                multiselect={true}
              >
                {emailList.map((email: any, index) => {
                  return <ComboboxOption key={index} value={email} />;
                })}
              </Combobox>

              <Select
                className="fieldMargin"
                label="Language Requirements"
                name="languageReq"
                baseFontSize={13}
                defaultValue="English"
                onChange={(selectedValue) => setLanguageValue(selectedValue)}
              >
                <Option value="English">English</Option>
                <Option value="Spanish">Spanish</Option>
                <Option value="French">French</Option>
                <Option value="Italian">Italian</Option>
                <Option value="Portuguese">Portuguese</Option>
                <Option value="German">German</Option>
                <Option value="Hindi">Hindi</Option>
                <Option value="Mandarin">Mandarin</Option>
                <Option value="Cantonese">Cantonese</Option>
                <Option value="Arabic">Arabic</Option>
                <Option value="Other">Other</Option>
              </Select>
              <FormFooter
                onCancel={() => {
                  navigate(`/`);
                }}
                primaryButton={{
                  text: "Submit",
                  onClick: () => create_ticket(),
                }}
              />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Toast
          variant="warning"
          title="Validation Error"
          body={
            <>
              {ticketValidation.map((error, index) => (
                <React.Fragment key={index}>
                  * <a>{error}</a>
                  {index !== ticketValidation.length - 1 && <br />}
                </React.Fragment>
              ))}
            </>
          }
          open={validationToastOpen}
          close={() => setValidationToastOpen(false)}
        />
        <Toast
          variant="progress"
          title="Creating ticket"
          body="Sending your ticket information to RSC team"
          open={progressToastOpen}
          close={() => setProgressToastOpen(false)}
        />
        <Toast
          variant="success"
          title="Ticket created successfully"
          body={
            <a href={ticketId} target="_blank" rel="noopener noreferrer">
              Click to open ticket
            </a>
          }
          open={successToastOpen}
          close={() => setSuccessToastOpen(false)}
        />
        <Toast
          variant="warning"
          title="Error in ticket creation"
          body={ticketWarning}
          open={warningToastOpen}
          close={() => setWarningToastOpen(false)}
        />
      </div>
    </Layout>
  );
};
