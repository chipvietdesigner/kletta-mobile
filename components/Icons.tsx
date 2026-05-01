
import React from 'react';
import { 
  ArrowLeft, 
  Backspace,
  Gear, 
  CaretDown, 
  CaretRight, 
  House, 
  Bank, 
  TrendUp, 
  TrendDown,
  Receipt, 
  ChatCircle,
  FileText,
  Plus, 
  Minus,
  Package,
  NavigationArrow,
  Camera,
  UploadSimple,
  Check,
  X,
  MagnifyingGlass,
  ArrowRight,
  User,
  Funnel,
  DotsThree,
  PaperPlaneTilt,
  Paperclip,
  Briefcase,
  Desktop,
  Car,
  Trash,
  ArrowsClockwise,
  Clock,
  ChartPieSlice,
  ShieldCheck,
  Phone,
  Gift,
  Bicycle,
  Info,
  PersonSimpleRun,
  Sparkle,
  SealCheck,
  MapPin,
  BatteryFull,
  WifiHigh,
  CellSignalFull,
  Tag,
  CalendarBlank,
  PlusCircle,
  HandWaving,
  Star,
  CheckCircle,
  CreditCard,
  ShareNetwork,
  Coins,
  Money,
  Question,
  SignOut,
  Bell,
  Globe,
  LockKey,
  UserCircle,
  WarningCircle,
  Coffee,
  DownloadSimple,
  ShoppingCart,
  Folder,
  FileArrowUp,
  Scan,
  PencilSimple,
  Motorcycle,
  Taxi,
  Truck,
  IdentificationCard,
  Scales,
  CircleNotch,
  ArrowSquareOut
} from '@phosphor-icons/react';
import { IconProps } from '../types';

// Helper to map strokeWidth to weight
const getWeight = (strokeWidth?: number): "bold" | "regular" | "light" | "fill" | "thin" | "duotone" => {
  if (strokeWidth && strokeWidth >= 2.5) return "bold";
  if (strokeWidth && strokeWidth < 2) return "regular";
  return "bold"; // Default to bold for Kletta style
};

export const IconBack: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <ArrowLeft className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconBackspace: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Backspace className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconSettings: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Gear className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconGear: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Gear className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconChevronDown: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <CaretDown className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconChevronRight: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <CaretRight className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCheck: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Check className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconClose: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <X className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconArrowRight: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <ArrowRight className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconPlus: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Plus className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconMinus: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Minus className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconSearch: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <MagnifyingGlass className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconUser: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <User className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconFilter: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Funnel className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconMore: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <DotsThree className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconSend: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <PaperPlaneTilt className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconPaperclip: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Paperclip className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconBriefcase: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Briefcase className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconMonitor: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Desktop className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCar: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Car className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconTrash: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Trash className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconRefresh: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <ArrowsClockwise className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconClock: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Clock className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconPieChart: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <ChartPieSlice className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconVerified: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <SealCheck className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconInvoice: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <FileText className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconAddTrip: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <MapPin className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconHandWaving: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <HandWaving className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconStar: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Star className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconDownload: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <DownloadSimple className={className} size={size} color={color} weight={weight || "bold"} />;

// Missing icons fixed
export const IconDotsThree: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <DotsThree className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconFileText: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <FileText className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconWarningCircle: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <WarningCircle className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconReceipt: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Receipt className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCoffee: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Coffee className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconMagnifyingGlass: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <MagnifyingGlass className={className} size={size} color={color} weight={weight || "bold"} />;
// Added for WelcomeScreen consistency
export const IconChartPieSlice: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <ChartPieSlice className={className} size={size} color={color} weight={weight || "fill"} />;


// Invoice Flow Icons
export const IconTag: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Tag className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCalendarBlank: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <CalendarBlank className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconPlusCircle: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <PlusCircle className={className} size={size} color={color} weight={weight || "fill"} />;

// Invoice Detail
export const IconCheckCircle: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <CheckCircle className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconCreditCard: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <CreditCard className={className} size={size} color={color} weight={weight || "bold"} />;

// Summary Icons
export const IconShare: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <ShareNetwork className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCoins: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Coins className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconTrendUp: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <TrendUp className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconTrendDown: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <TrendDown className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconMoney: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Money className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconQuestion: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Question className={className} size={size} color={color} weight={weight || "bold"} />;

// Settings Icons
export const IconSignOut: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <SignOut className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconBell: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Bell className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconGlobe: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Globe className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconLock: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <LockKey className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconUserCircle: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <UserCircle className={className} size={size} color={color} weight={weight || "bold"} />;


// Status Bar Icons
export const IconBatteryFull: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <BatteryFull className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconWifiHigh: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <WifiHigh className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCellSignalFull: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <CellSignalFull className={className} size={size} color={color} weight={weight || "fill"} />;

// Onboarding Icons
export const IconShield: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <ShieldCheck className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconFile: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <FileText className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconFileCheck: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <FileText className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconUpload: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <UploadSimple className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCamera: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Camera className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconPhone: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Phone className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconGift: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Gift className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconBike: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Bicycle className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconInfo: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Info className={className} size={size} color={color} weight={weight || "bold"} />;

// Tab Icons
export const IconHome: React.FC<IconProps> = ({ className, size = 24, color, strokeWidth, weight }) => <House className={className} size={size} color={color} weight={weight || getWeight(strokeWidth)} />;
export const IconBank: React.FC<IconProps> = ({ className, size = 24, color, strokeWidth, weight }) => <Bank className={className} size={size} color={color} weight={weight || getWeight(strokeWidth)} />;
export const IconSales: React.FC<IconProps> = ({ className, size = 24, color, strokeWidth, weight }) => <TrendUp className={className} size={size} color={color} weight={weight || getWeight(strokeWidth)} />;
export const IconExpenses: React.FC<IconProps> = ({ className, size = 24, color, strokeWidth, weight }) => <Receipt className={className} size={size} color={color} weight={weight || getWeight(strokeWidth)} />;
export const IconChat: React.FC<IconProps> = ({ className, size = 24, color, strokeWidth, weight }) => <ChatCircle className={className} size={size} color={color} weight={weight || getWeight(strokeWidth)} />;

// Action Icons
export const IconNewInvoice: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <FileText className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconAddEntry: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Plus className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconNewProduct: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Package className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconStartTrip: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <NavigationArrow className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconScanReceipt: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Camera className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconUploadReceipt: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <UploadSimple className={className} size={size} color={color} weight={weight || "bold"} />;

// Extra Icons for replacing emojis
export const IconRun: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <PersonSimpleRun className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconSparkle: React.FC<IconProps> = ({ className, size = 24, color, weight }) => <Sparkle className={className} size={size} color={color} weight={weight || "fill"} />;

// Fix for InvoiceDetailScreen missing icons
export const IconShoppingCart: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <ShoppingCart className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconFolder: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Folder className={className} size={size} color={color} weight={weight || "bold"} />;

// Flow Icons
export const IconFileArrowUp: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <FileArrowUp className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconScan: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Scan className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconPencilSimple: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <PencilSimple className={className} size={size} color={color} weight={weight || "bold"} />;

// Asset icons
export const IconMotorcycle: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Motorcycle className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconTaxi: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Taxi className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconVan: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Truck className={className} size={size} color={color} weight={weight || "bold"} />;

// Fix for IncompleteOnboardingScreen missing icons
export const IconIdentificationCard: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <IdentificationCard className={className} size={size} color={color} weight={weight || "bold"} />;

// New: Scales icon for CARE banner
export const IconScales: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <Scales className={className} size={size} color={color} weight={weight || "bold"} />;

// New: Spinner icon for loading states
export const IconSpinner: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <CircleNotch className={`${className} animate-spin`} size={size} color={color} weight={weight || "bold"} />;

// New: ArrowSquareOut for external links
export const IconArrowSquareOut: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", weight }) => <ArrowSquareOut className={className} size={size} color={color} weight={weight || "bold"} />;


// Custom Logo Component
export const KlettaLogo = ({ className, color = 'black' }: { className?: string; color?: 'black' | 'white' }) => {
  const fill = color === 'black' ? '#111111' : '#FFFFFF';
  return (
   <svg width="100" height="28" viewBox="0 0 196 55" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_4069_53076)">
    <path d="M160.379 43.5621C160.379 40.2493 161.556 37.6089 163.914 35.6363C166.268 33.6661 169.628 32.458 173.991 32.0144L185.468 30.8252V29.6714C185.468 27.6893 184.855 26.1674 183.63 25.1056C182.405 24.0438 180.721 23.5129 178.573 23.5129C176.311 23.5129 174.532 24.0037 173.238 24.9829C171.943 25.9622 171.308 27.3047 171.332 29.006H161.464C161.535 24.8083 163.189 21.4648 166.434 18.9826C169.676 16.498 174.015 15.2568 179.449 15.2568C184.277 15.2568 188.243 16.5994 191.346 19.2799C194.449 21.9627 195.999 26.0447 195.999 31.526V53.7436H186.832L186.308 47.7951C185.374 49.7087 183.59 51.3062 180.954 52.5898C178.271 53.8262 175.473 54.4444 172.557 54.4444C168.918 54.4444 165.978 53.4463 163.739 51.4525C161.5 49.4586 160.379 46.8277 160.379 43.5621ZM185.466 38.0337V36.9129L176.438 37.9629C172.8 38.3829 170.98 39.8647 170.98 42.4059C170.98 43.6895 171.424 44.6805 172.309 45.379C173.196 46.0797 174.465 46.429 176.122 46.429C178.71 46.429 180.898 45.5724 182.681 43.857C184.465 42.1416 185.393 40.1997 185.463 38.0313L185.466 38.0337Z" fill={fill}/>
    <path d="M149.617 24.5631V39.8531C149.617 41.9531 150.002 43.4349 150.771 44.2961C151.54 45.1597 153.022 45.5915 155.214 45.5915C155.424 45.5915 155.67 45.5797 155.948 45.5561C156.229 45.5325 156.566 45.5089 156.963 45.4853C157.359 45.4617 157.696 45.4381 157.977 45.4145V53.673C155.434 54.1402 153.102 54.3738 150.979 54.3738C147.34 54.3738 144.634 53.6636 142.862 52.2407C141.135 50.7943 140.064 49.2205 139.644 47.5169C139.271 45.6033 139.084 43.6685 139.084 41.7077V24.5631H124.67V39.8531C124.67 41.9295 125.059 43.4042 125.842 44.2796C126.623 45.155 128.075 45.5915 130.198 45.5915C130.385 45.5915 130.618 45.5797 130.899 45.5561C131.18 45.5325 131.534 45.5089 131.966 45.4853C132.397 45.4617 132.765 45.4381 133.067 45.4145V53.673C130.524 54.1402 128.181 54.3738 126.034 54.3738C122.674 54.3738 120.057 53.7155 118.179 52.3965C116.3 51.0798 115.116 49.4517 114.627 47.5145C114.255 45.6009 114.068 43.6661 114.068 41.7077V24.5608H106.126V15.9885H114.068V4.30396H124.67V15.9908H139.084V4.30396H149.615V15.9908H158.572V24.5631H149.615H149.617Z" fill={fill}/>
    <path d="M105.567 41.9175C104.611 45.8367 102.464 48.8923 99.1301 51.0844C95.7253 53.3236 91.6079 54.4444 86.7802 54.4444C80.6454 54.4444 75.7115 52.6488 71.9811 49.0551C68.2482 45.4639 66.3818 40.7165 66.3818 34.8152C66.3818 28.914 68.2176 24.2656 71.8914 20.6626C75.5652 17.0595 80.341 15.2568 86.2186 15.2568C92.0963 15.2568 96.4001 16.8896 99.8994 20.1553C103.399 23.4209 105.147 27.6658 105.147 32.8922C105.147 33.7794 105.02 35.0488 104.762 36.7052H76.9102V37.0544C76.9102 39.9001 77.7903 42.1275 79.5529 43.7367C81.3131 45.3459 83.6986 46.1505 86.7071 46.1505C88.7127 46.1505 90.4635 45.7706 91.9547 45.0132C93.4483 44.2558 94.496 43.2223 95.1047 41.9175H105.567ZM77.1226 29.8814H94.3709C94.2529 27.9701 93.4271 26.4175 91.8863 25.2283C90.3479 24.0391 88.3871 23.4445 86.0086 23.4445C83.6302 23.4445 81.8157 24.0226 80.2183 25.1764C78.6209 26.3302 77.5874 27.8993 77.1226 29.8814Z" fill={fill}/>
    <path d="M51.7266 0H62.3281V53.7437H51.7266V0Z" fill={fill}/>
    <path d="M27.7949 25.1816L49.2607 53.7734H35.1777L20.2715 33.9326L20.0117 34.2373C15.3673 39.6888 12.8164 46.6153 12.8164 53.7754H1.61816C1.61816 44.4983 4.92445 35.5255 10.9424 28.4668L33.6738 1.80664H47.7764L27.7949 25.1816ZM35.1797 53.7754L35.1582 53.7734H35.1777L35.1797 53.7754ZM7.83398 0C12.9774 0.000125744 15.5488 2.57232 15.5488 7.71582C15.5487 12.8591 12.9772 15.4305 7.83398 15.4307C2.69048 15.4307 0.11829 12.8592 0.118164 7.71582C0.118164 2.57219 2.69036 0 7.83398 0Z" fill={fill}/>
    </g>
    <defs>
    <clipPath id="clip0_4069_53076">
    <rect width="196" height="54.4444" fill={fill}/>
    </clipPath>
    </defs>
    </svg>
  );
};
