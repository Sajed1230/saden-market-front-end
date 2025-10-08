import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from '../redux/store.js';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter >
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);


    //  category: "smartphones",
    //   name: 'Saden Tablet Pro 12.9"',
    //   description:
    //     "Professional tablet with desktop-class performance, perfect for creative work, productivity, and entertainment.",
    //   features: [
    //     '12.9" Liquid Retina Display',
    //     "M2 Chip Performance",
    //     "Apple Pencil Support",
    //     "All-Day Battery",
    //   ],
    //   currentPrice: "$1,099",
    //   originalPrice: "$1,299",
    //   discount: "15% OFF",
    //   badge: "Premium",
    //   icon: FaTabletAlt, 

  //image and name and desctiption  and addind manulay 1 ,2 ,3 ,4 and more features to product  and currentPrie and OriginalPrice and discount and badge 