
import React, { useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { SignUpEmailScreen, VerifyEmailCodeScreen, SignUpCreatePasscodeScreen, SignUpBusinessLocationScreen } from './screens/SignUpScreens';
import { 
    OnboardingWelcome, OnboardingStep1, OnboardingStep2, OnboardingStep3, OnboardingStep4,
    OnboardingStep5, OnboardingPhoneVerify, OnboardingStep6, OnboardingStep7, OnboardingStep8, OnboardingManualEntry
} from './screens/OnboardingScreens';
import { 
  IncompleteOnboardingEntry, 
  IncompleteTaxInfo, 
  IncompleteTaxConfirm, 
  IncompletePhone,
  IncompleteVerifyPhoneCode
} from './screens/IncompleteOnboarding';
import { AddToInvoiceScreen, InvoiceCreateDetailsScreen } from './screens/NewInvoiceScreens';
import { 
  InvoicePaymentMethodScreen, InvoiceCustomerSelectScreen, InvoiceNewCustomerScreen, 
  InvoiceConfirmCustomerScreen, InvoiceDueDateScreen, InvoiceNotesScreen, 
  InvoicePreviewScreen, InvoiceSuccessScreen 
} from './screens/InvoiceFlowScreens';
import { InvoiceDetailScreen } from './screens/InvoiceDetailScreen';
import { SummaryScreen } from './screens/SummaryScreen';
import { 
  BusinessIncomeScreen, OtherIncomeScreen, BusinessExpensesScreen, 
  BusinessExpensesScreen as IncompleteBusinessExpensesScreen,
  NonAllowableExpensesScreen, ClaimedKilometersScreen, CashWithdrawalScreen, TaxPrepaymentsScreen 
} from './screens/SummaryDetailScreens';
import { SettingsScreen } from './screens/SettingsScreen';
import { 
  ScanReceiptCamera, ScanReceiptPreview, ScanReceiptAnalyzing, ScanReceiptReview 
} from './screens/ScanReceiptFlow';
import { TaxReturnScreen } from './screens/TaxReturnScreen';
import { AddEntryScreen } from './screens/AddEntryScreen';
import { 
  ProductSelectTypeScreen, 
  ProductStepName, 
  ProductStepTax, 
  ProductStepPrice, 
  ProductStepArt, 
  ProductSuccessScreen 
} from './screens/ProductFlowScreens';
import { AddVehicleScreen } from './screens/AddVehicleScreen';
import { ScreenName } from './types';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [navParams, setNavParams] = useState<any>({});

  const navigate = (screen: ScreenName, params?: any) => {
    setNavParams(params || {});
    setCurrentScreen(screen);
  };

  const goBack = () => {
    switch (currentScreen) {
        case 'login': navigate('welcome'); break;
        case 'signup-email': navigate('welcome'); break;
        case 'signup-verify': navigate('signup-email'); break;
        case 'signup-create-passcode': navigate('signup-verify'); break;
        case 'signup-business-location': navigate('signup-create-passcode'); break;
        case 'welcome': navigate('splash'); break;
        case 'onboarding-welcome': navigate('signup-business-location'); break; 
        case 'onboarding-1': navigate('onboarding-welcome'); break; 
        case 'onboarding-2': navigate('onboarding-1'); break;
        case 'onboarding-3': navigate('onboarding-2'); break;
        case 'onboarding-manual-entry': navigate('onboarding-3'); break;
        case 'onboarding-4': navigate('onboarding-3'); break;
        case 'onboarding-5': navigate('onboarding-4'); break;
        case 'onboarding-phone-verify': navigate('onboarding-5'); break;
        case 'onboarding-6': navigate('onboarding-phone-verify'); break;
        case 'onboarding-7': navigate('onboarding-6'); break;
        case 'onboarding-8': navigate('onboarding-7'); break;
        case 'incomplete-onboarding-tax-info': navigate('home', { showIncompleteOnboarding: true }); break;
        case 'incomplete-onboarding-tax-confirm': navigate('incomplete-onboarding-tax-info'); break;
        case 'incomplete-onboarding-phone': navigate('incomplete-onboarding-tax-confirm'); break;
        case 'incomplete-onboarding-verify-code': navigate('incomplete-onboarding-phone'); break;
        case 'new-invoice': navigate('home'); break;
        case 'invoice-create-details': navigate('new-invoice'); break;
        case 'invoice-payment-method': navigate('invoice-create-details'); break;
        case 'invoice-customer-select': navigate('invoice-payment-method'); break;
        case 'invoice-customer-new': navigate('invoice-customer-select'); break;
        case 'invoice-customer-confirm': navigate('invoice-customer-new'); break;
        case 'invoice-due-date': navigate('invoice-customer-confirm'); break;
        case 'invoice-notes': navigate('invoice-due-date'); break;
        case 'invoice-preview': navigate('invoice-notes'); break;
        case 'invoice-success': navigate('home'); break;
        case 'invoice-detail': navigate('home', { tab: 'sales' }); break; 
        case 'summary': navigate('home'); break;
        case 'summary-business-income': navigate('home', { tab: 'summary' }); break;
        case 'summary-other-income': navigate('home', { tab: 'summary' }); break;
        case 'summary-business-expenses': navigate('home', { tab: 'summary' }); break;
        case 'summary-nonallowable-expenses': navigate('home', { tab: 'summary' }); break;
        case 'summary-claimed-kilometers': navigate('home', { tab: 'summary' }); break;
        case 'summary-cash-withdrawal': navigate('home', { tab: 'summary' }); break;
        case 'summary-tax-prepayments': navigate('home', { tab: 'summary' }); break;
        case 'settings': navigate('home'); break;
        case 'scan-receipt-camera': 
          if (navParams?.type === 'statement') navigate('onboarding-3');
          else navigate('home'); 
          break;
        case 'scan-receipt-preview': navigate('scan-receipt-camera', navParams); break;
        case 'scan-receipt-analyzing': navigate('scan-receipt-camera', navParams); break;
        case 'scan-receipt-review': 
          if (navParams?.type === 'statement') navigate('onboarding-3');
          else navigate('home', { tab: 'expenses' }); 
          break;
        case 'tax-return': navigate('home'); break;
        case 'add-entry': navigate('home'); break;
        case 'product-select-type': navigate('home'); break;
        case 'product-step-name': navigate('home'); break;
        case 'product-step-tax': navigate('product-step-name', navParams); break;
        case 'product-step-price': navigate('product-step-tax', navParams); break;
        case 'product-step-art': navigate('product-step-price', navParams); break;
        case 'product-success': navigate('home'); break;
        case 'add-vehicle': navigate('home', { tab: 'assets' }); break;
        default: break;
    }
  };

  const renderScreen = () => {
    // Determine if the current screen is a setup/onboarding flow that should overlay the dashboard
    const isSetupOverlay = currentScreen.startsWith('onboarding-') || 
                         (currentScreen.startsWith('incomplete-onboarding-') && currentScreen !== 'incomplete-onboarding-entry');

    const screenComponent = (() => {
      switch (currentScreen) {
        case 'splash': return <SplashScreen onFinish={() => navigate('welcome')} />;
        case 'welcome': return <WelcomeScreen navigate={navigate} goBack={goBack} />;
        case 'login': return <LoginScreen navigate={navigate} goBack={goBack} />;
        case 'signup-email': return <SignUpEmailScreen navigate={navigate} goBack={goBack} />;
        case 'signup-verify': return <VerifyEmailCodeScreen navigate={navigate} goBack={goBack} params={navParams} />;
        case 'signup-create-passcode': return <SignUpCreatePasscodeScreen navigate={navigate} goBack={goBack} />;
        case 'signup-business-location': return <SignUpBusinessLocationScreen navigate={navigate} goBack={goBack} />;
        case 'onboarding-welcome': return <OnboardingWelcome navigate={navigate} goBack={goBack} />;
        case 'onboarding-1': return <OnboardingStep1 navigate={navigate} goBack={goBack} />;
        case 'onboarding-2': return <OnboardingStep2 navigate={navigate} goBack={goBack} />;
        case 'onboarding-3': return <OnboardingStep3 navigate={navigate} goBack={goBack} />;
        case 'onboarding-4': return <OnboardingStep4 navigate={navigate} goBack={goBack} />;
        case 'onboarding-manual-entry': return <OnboardingManualEntry navigate={navigate} goBack={goBack} params={navParams} />;
        case 'onboarding-5': return <OnboardingStep5 navigate={navigate} goBack={goBack} />;
        case 'onboarding-phone-verify': return <OnboardingPhoneVerify navigate={navigate} goBack={goBack} params={navParams} />;
        case 'onboarding-6': return <OnboardingStep6 navigate={navigate} goBack={goBack} />;
        case 'onboarding-7': return <OnboardingStep7 navigate={navigate} goBack={goBack} />;
        case 'onboarding-8': return <OnboardingStep8 navigate={navigate} goBack={goBack} />;
        case 'incomplete-onboarding-entry': return <HomeScreen navigate={navigate} goBack={goBack} params={{ showIncompleteOnboarding: true }} />;
        case 'incomplete-onboarding-tax-info': return <IncompleteTaxInfo navigate={navigate} goBack={goBack} />;
        case 'incomplete-onboarding-tax-confirm': return <IncompleteTaxConfirm navigate={navigate} goBack={goBack} />;
        case 'incomplete-onboarding-phone': return <IncompletePhone navigate={navigate} goBack={goBack} />;
        case 'incomplete-onboarding-verify-code': return <IncompleteVerifyPhoneCode navigate={navigate} goBack={goBack} params={navParams} />;
        case 'new-invoice': return <AddToInvoiceScreen navigate={navigate} goBack={goBack} />;
        case 'invoice-create-details': return <InvoiceCreateDetailsScreen navigate={navigate} goBack={goBack} />;
        case 'invoice-payment-method': return <InvoicePaymentMethodScreen navigate={navigate} goBack={goBack} />;
        case 'invoice-customer-select': return <InvoiceCustomerSelectScreen navigate={navigate} goBack={goBack} />;
        case 'invoice-customer-new': return <InvoiceNewCustomerScreen navigate={navigate} goBack={goBack} />;
        case 'invoice-customer-confirm': return <InvoiceConfirmCustomerScreen navigate={navigate} goBack={goBack} params={navParams} />;
        case 'invoice-due-date': return <InvoiceDueDateScreen navigate={navigate} goBack={goBack} />;
        case 'invoice-notes': return <InvoiceNotesScreen navigate={navigate} goBack={goBack} />;
        case 'invoice-preview': return <InvoicePreviewScreen navigate={navigate} goBack={goBack} />;
        case 'invoice-success': return <InvoiceSuccessScreen navigate={navigate} goBack={goBack} params={navParams} />;
        case 'invoice-detail': return <InvoiceDetailScreen navigate={navigate} goBack={goBack} params={navParams} />;
        case 'summary': return <SummaryScreen navigate={navigate} goBack={goBack} />;
        case 'summary-business-income': return <BusinessIncomeScreen navigate={navigate} goBack={goBack} />;
        case 'summary-other-income': return <OtherIncomeScreen navigate={navigate} goBack={goBack} />;
        case 'summary-business-expenses': return <BusinessExpensesScreen navigate={navigate} goBack={goBack} />;
        case 'summary-nonallowable-expenses': return <NonAllowableExpensesScreen navigate={navigate} goBack={goBack} />;
        case 'summary-claimed-kilometers': return <ClaimedKilometersScreen navigate={navigate} goBack={goBack} />;
        case 'summary-cash-withdrawal': return <CashWithdrawalScreen navigate={navigate} goBack={goBack} />;
        case 'summary-tax-prepayments': return <TaxPrepaymentsScreen navigate={navigate} goBack={goBack} />;
        case 'settings': return <SettingsScreen navigate={navigate} goBack={goBack} />;
        case 'scan-receipt-camera': return <ScanReceiptCamera navigate={navigate} goBack={goBack} params={navParams} />;
        case 'scan-receipt-preview': return <ScanReceiptPreview navigate={navigate} goBack={goBack} params={navParams} />;
        case 'scan-receipt-analyzing': return <ScanReceiptAnalyzing navigate={navigate} goBack={goBack} params={navParams} />;
        case 'scan-receipt-review': return <ScanReceiptReview navigate={navigate} goBack={goBack} params={navParams} />;
        case 'tax-return': return <TaxReturnScreen navigate={navigate} goBack={goBack} params={navParams} />;
        case 'add-entry': return <AddEntryScreen navigate={navigate} goBack={goBack} />;
        case 'product-select-type': return <ProductSelectTypeScreen navigate={navigate} goBack={goBack} />;
        case 'product-step-name': return <ProductStepName navigate={navigate} goBack={goBack} params={navParams} />;
        case 'product-step-tax': return <ProductStepTax navigate={navigate} goBack={goBack} params={navParams} />;
        case 'product-step-price': return <ProductStepPrice navigate={navigate} goBack={goBack} params={navParams} />;
        case 'product-step-art': return <ProductStepArt navigate={navigate} goBack={goBack} params={navParams} />;
        case 'product-success': return <ProductSuccessScreen navigate={navigate} goBack={goBack} params={navParams} />;
        case 'add-vehicle': return <AddVehicleScreen navigate={navigate} goBack={goBack} />;
        case 'home': return <HomeScreen navigate={navigate} goBack={goBack} params={navParams} />;
        default: return <SplashScreen onFinish={() => navigate('welcome')} />;
      }
    })();

    if (isSetupOverlay) {
        return (
            <>
                <HomeScreen navigate={navigate} goBack={goBack} params={{ tab: 'home' }} />
                {screenComponent}
            </>
        );
    }

    return screenComponent;
  };

  return (
    <div className="relative w-full h-[100dvh] md:w-[402px] md:h-[874px] bg-white md:rounded-[24px] shadow-2xl overflow-hidden font-aktifo mx-auto selection:bg-kletta-yellow selection:text-kletta-dark">
      <div className="w-full h-full relative z-0">
        {renderScreen()}
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[140px] h-[5px] bg-black/30 rounded-full z-50 pointer-events-none mix-blend-difference"></div>
    </div>
  );
};

export default App;
