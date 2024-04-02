import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {  Error, HomeLayout, Login,Register,Dish,OrderView,Home, BucketList, DeliveryPartner,Worker,Admin,Owner,AdminIssueView, Trackdown} from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },{
        path:"userorderview",
        element:<OrderView/>

      },{
        path:"trackdown",
        element:<Trackdown/>
      },{
        path:"adminissueview",
        element:<AdminIssueView/>
      },{
        path:"owner",
        element:<Owner/>

      },{
        path:"admin",
        element:<Admin/>

      },{
        path:"login",
        element:<Worker/>
      },{
        path:"deliverypartner",
        element:<DeliveryPartner/>
      },

      {
        path: "register",
        element: <Register />,
      },
      {
        path:"home",
        element:<Home/>
      },{
        path:"dish",
        element:<Dish/>
      },{
        path:"bucketlist",
        element:<BucketList/>
      }
      
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
