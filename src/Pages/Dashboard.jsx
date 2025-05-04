//  import * as React from 'react';
//  import PropTypes from 'prop-types';
//  import Box from '@mui/material/Box';
//  import Typography from '@mui/material/Typography';
//  import { createTheme } from '@mui/material/styles';
//  import DescriptionIcon from '@mui/icons-material/Description';
//  import { AppProvider } from '@toolpad/core/AppProvider';
//  import { DashboardLayout } from '@toolpad/core/DashboardLayout';
//  import { useDemoRouter } from '@toolpad/core/internal';
//  import MyLoanRequest from './MyLoanRequest';
//  import Profile from './Profile';

//  const demoTheme = createTheme({
//    cssVariables: {
//      colorSchemeSelector: 'data-toolpad-color-scheme',
//    },
//    colorSchemes: { light: true, dark: true },
//    breakpoints: {
//      values: {
//        xs: 0,
//        sm: 600,
//        md: 600,
//        lg: 1200,
//        xl: 1536,
//      },
//    },
//  });


//  function RenderPageContent({ pathname }) {
//    switch (pathname) {
//      case '/myLoanRequest':
//        return <MyLoanRequest />;
//      case '/profile':
//        // return (
//        //   <Box sx={{ p: 4 }}>
//        //     <Typography variant="h5">Profile</Typography>
//        //     <Typography>This is the About Us page.</Typography>
//        //   </Box>
//        // );
//  return <Profile/>

//      default:
//        return (
//          <Box sx={{ p: 4 }}>
//            <Typography variant="h5">404</Typography>
//            <Typography>Page not found: {pathname}</Typography>
//          </Box>
//        );
//    }
//  }

//  RenderPageContent.propTypes = {
//    pathname: PropTypes.string.isRequired,
//  };

//  function DashboardLayoutNavigationLinks(props) {
//    const { window } = props;
//    const router = useDemoRouter('/myLoanRequest');
//    const demoWindow = window !== undefined ? window() : undefined;

//    return (
//      <AppProvider
//        navigation={[
//          {
//            segment: 'myLoanRequest',
//            title: 'My Loan Request',
//            icon: <DescriptionIcon />,
//          },
//          {
//            segment: 'profile',
//            title: 'Profile',
//            icon: <DescriptionIcon />,
//          },
//        ]}
//        router={router}
//        theme={demoTheme}
//        window={demoWindow}
//      >
//        <DashboardLayout>
//          <RenderPageContent pathname={router.pathname} />
//        </DashboardLayout>
//      </AppProvider>
//    );
//  }

//  DashboardLayoutNavigationLinks.propTypes = {
//    window: PropTypes.func,
//  };

//  export default DashboardLayoutNavigationLinks;





