import HomePage from "../Pages/HomePage/HomePage";
import AppointmentPage from "../Pages/AppointmentPage/AppointmentPage";
import Notfound from "../Pages/NotFoundPage/NotFound";
import SurveyPage from "../Pages/SurveyPage/SurveyPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import ResultSurvey from "../Pages/ResultSurvey/ResultSurvey";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/Appointment",
    page: AppointmentPage,
  },
  {
    path: "/Survey",
    page: SurveyPage,
    isShowHeader: true,
  },
  {
    path: "/profile",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/result-survey",
    page: ResultSurvey,
    isShowHeader: true,
  },
  {
    path: "*",
    page: Notfound,
  },
];
