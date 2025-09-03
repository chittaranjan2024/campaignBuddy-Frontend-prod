import { Routes, Route } from "react-router-dom";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import Welcome from "./pages/public/Welcome";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/template/Templates";
import TemplateEditor from "./pages/template/TemplateEditor";
import CreateTemplate from "./pages/template/CreateTemplate";
import CreateCampaign from "./pages/campaign/CreateCampaign";
import CampaignDetails from "./pages/campaign/CampaignDetails";
import ContactList from "./pages/contact/ContactList";
import ScheduleCampaign from "./pages/campaign/ScheduleCampaign";
import CampaignList from "./pages/campaign/CampaignList";
import SendCampaign from "./pages/campaign/SendCampaign";
import CampaignActivity from "./pages/campaign/CampaignActivity";
import ImportContacts from "./pages/contact/ImportContacts";
import AddContactsToList from "./pages/contact/AddContactsToList";
import CreateMailingList from "./pages/Mailing/CreateMailingList";
import MailingList from "./pages/Mailing/MailingList";
import EditMailingList from "./pages/Mailing/EditMailingList";
import MailingListDetails from "./pages/Mailing/MailingListDetails";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoute from "./route/ProtectedRoute";
import CreateContact from "./pages/contact/CreateContact";
import ContactManager from "./pages/contact/ContactManager";
import AllContacts from "./pages/contact/AllContacts";
import EditContact from "./pages/contact/EditContact";
import BrowseTemplates from "./pages/template/BrowseTemplates";
import EditCampaign from "./pages/campaign/EditCampaign";
import AboutDeveloper from "./pages/AboutDeveloper";
import SubscriberList from "./pages/contact/SubscriberList";
import UnsubscriberList from "./pages/contact/UnsubscriberList";
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes under DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/templates" element={<ProtectedRoute><Templates/></ProtectedRoute>} />
        <Route path="/templates/create" element={<ProtectedRoute><CreateTemplate/></ProtectedRoute>} />
        <Route path="/templates/new" element={<ProtectedRoute><TemplateEditor /></ProtectedRoute>} />
        <Route path="/templates/browse" element={<ProtectedRoute><BrowseTemplates /></ProtectedRoute>} />

        <Route path="/templates/:id/edit" element={<ProtectedRoute><TemplateEditor /></ProtectedRoute>} />
        <Route path="/create-campaign/" element={<ProtectedRoute><CreateCampaign /></ProtectedRoute>} />
        <Route path="/send-campaign/:id" element={<ProtectedRoute><SendCampaign /></ProtectedRoute>} />
        <Route path="/edit-campaign/:id" element={<ProtectedRoute><EditCampaign /></ProtectedRoute>} />
        <Route path="/campaign-details/:id" element={<ProtectedRoute><CampaignDetails /></ProtectedRoute>} />
        <Route path="/schedule-campaign/:id" element={<ProtectedRoute><ScheduleCampaign /></ProtectedRoute>} />
        <Route path="/campaign-list/" element={<ProtectedRoute><CampaignList /></ProtectedRoute>} />
        <Route path="/campaign-activity/" element={<ProtectedRoute><CampaignActivity /></ProtectedRoute>} />
        <Route path="/contact/new" element={<ProtectedRoute><CreateContact /></ProtectedRoute>} />
        <Route path="/contact/manage" element={<ProtectedRoute><ContactManager /></ProtectedRoute>} />
        <Route path="/contact/all" element={<ProtectedRoute><AllContacts/></ProtectedRoute>} />
        <Route path="/contact/edit/:id" element={<ProtectedRoute><EditContact/></ProtectedRoute>} />
        <Route path="/subscribers-list" element={<ProtectedRoute><SubscriberList/></ProtectedRoute>} />
        <Route path="/unsubscribers-list" element={<ProtectedRoute><UnsubscriberList/></ProtectedRoute>} />


        <Route path="/add-contacts-to-list/:id" element={<ProtectedRoute><AddContactsToList /></ProtectedRoute>} />
        <Route path="/create-list/" element={<ProtectedRoute><CreateMailingList /></ProtectedRoute>} />
        <Route path="/mailing-list/" element={<ProtectedRoute><MailingList /></ProtectedRoute>} />
        <Route path="/edit-list/:id" element={<ProtectedRoute><EditMailingList /></ProtectedRoute>} />
        <Route path="/mailing-list-details/:id" element={<ProtectedRoute><MailingListDetails /></ProtectedRoute>} />
        <Route path="/import-contacts/" element={<ProtectedRoute><ImportContacts /></ProtectedRoute>} />
        <Route path="/account-settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
        <Route path="/about-developer" element={<ProtectedRoute><AboutDeveloper /></ProtectedRoute>} />

      </Route>
    </Routes>
  );
}

export default App;
