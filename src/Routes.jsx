import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login-page';
import JobsPortal from './pages/jobs-portal';
import EventsHub from './pages/events-hub';
import MessagingInterface from './pages/messaging-interface';
import Dashboard from './pages/dashboard';
import MemberDirectory from './pages/member-directory';
import MemberProfilePage from './pages/member-profile-page';
import BusinessDirectory from './pages/business-directory';
import GroupsChaptersHub from './pages/groups-chapters-hub';
import MyProfilePage from './pages/my-profile-page';
import CommunityFeed from './pages/community-feed';
import HelpSupport from './pages/help-support';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/jobs-portal" element={<JobsPortal />} />
        <Route path="/events-hub" element={<EventsHub />} />
        <Route path="/messaging-interface" element={<MessagingInterface />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/member-directory" element={<MemberDirectory />} />
        <Route path="/member-profile-page" element={<MemberProfilePage />} />
        <Route path="/business-directory" element={<BusinessDirectory />} />
        <Route path="/groups-chapters-hub" element={<GroupsChaptersHub />} />
        <Route path="/my-profile-page" element={<MyProfilePage />} />
        <Route path="/community-feed" element={<CommunityFeed />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
