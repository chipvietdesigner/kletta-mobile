
import React from 'react';
import { 
  ArrowLeft, 
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
  PaperPlaneRight,
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
  Folder
} from '@phosphor-icons/react';
import { IconProps } from '../types';

// Helper to map strokeWidth to weight
const getWeight = (strokeWidth?: number): "bold" | "regular" | "light" | "fill" | "thin" | "duotone" => {
  if (strokeWidth && strokeWidth >= 2.5) return "bold";
  if (strokeWidth && strokeWidth < 2) return "regular";
  return "bold"; // Default to bold for Kletta style
};

export const IconBack = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <ArrowLeft className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconSettings = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Gear className={className} size={size} color={color} weight={weight || "fill"} />; // Gear is usually filled or bold
export const IconGear = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Gear className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconChevronDown = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <CaretDown className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconChevronRight = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <CaretRight className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCheck = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Check className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconClose = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <X className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconArrowRight = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <ArrowRight className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconPlus = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Plus className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconMinus = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Minus className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconSearch = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <MagnifyingGlass className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconUser = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <User className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconFilter = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Funnel className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconMore = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <DotsThree className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconSend = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <PaperPlaneRight className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconPaperclip = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Paperclip className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconBriefcase = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Briefcase className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconMonitor = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Desktop className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCar = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Car className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconTrash = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Trash className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconRefresh = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <ArrowsClockwise className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconClock = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Clock className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconPieChart = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <ChartPieSlice className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconVerified = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <SealCheck className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconInvoice = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <FileText className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconAddTrip = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <MapPin className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconHandWaving = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <HandWaving className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconStar = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Star className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconDownload = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <DownloadSimple className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconShoppingCart = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <ShoppingCart className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconFolder = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Folder className={className} size={size} color={color} weight={weight || "bold"} />;

// Missing icons fixed
export const IconDotsThree = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <DotsThree className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconFileText = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <FileText className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconWarningCircle = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <WarningCircle className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconReceipt = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Receipt className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCoffee = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <Coffee className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconMagnifyingGlass = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <MagnifyingGlass className={className} size={size} color={color} weight={weight || "bold"} />;
// Added for WelcomeScreen consistency
export const IconChartPieSlice = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <ChartPieSlice className={className} size={size} color={color} weight={weight || "fill"} />;


// Invoice Flow Icons
export const IconTag = ({ className, size = 24, color, weight }: IconProps) => <Tag className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCalendarBlank = ({ className, size = 24, color, weight }: IconProps) => <CalendarBlank className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconPlusCircle = ({ className, size = 24, color, weight }: IconProps) => <PlusCircle className={className} size={size} color={color} weight={weight || "fill"} />;

// Invoice Detail
export const IconCheckCircle = ({ className, size = 24, color, weight }: IconProps) => <CheckCircle className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconCreditCard = ({ className, size = 24, color, weight }: IconProps) => <CreditCard className={className} size={size} color={color} weight={weight || "bold"} />;

// Summary Icons
export const IconShare = ({ className, size = 24, color, weight }: IconProps) => <ShareNetwork className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCoins = ({ className, size = 24, color, weight }: IconProps) => <Coins className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconTrendUp = ({ className, size = 24, color, weight }: IconProps) => <TrendUp className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconTrendDown = ({ className, size = 24, color, weight }: IconProps) => <TrendDown className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconMoney = ({ className, size = 24, color, weight }: IconProps) => <Money className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconQuestion = ({ className, size = 24, color, weight }: IconProps) => <Question className={className} size={size} color={color} weight={weight || "bold"} />;

// Settings Icons
export const IconSignOut = ({ className, size = 24, color, weight }: IconProps) => <SignOut className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconBell = ({ className, size = 24, color, weight }: IconProps) => <Bell className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconGlobe = ({ className, size = 24, color, weight }: IconProps) => <Globe className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconLock = ({ className, size = 24, color, weight }: IconProps) => <LockKey className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconUserCircle = ({ className, size = 24, color, weight }: IconProps) => <UserCircle className={className} size={size} color={color} weight={weight || "bold"} />;


// Status Bar Icons
export const IconBatteryFull = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <BatteryFull className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconWifiHigh = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <WifiHigh className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCellSignalFull = ({ className, size = 24, color = "currentColor", weight }: IconProps) => <CellSignalFull className={className} size={size} color={color} weight={weight || "fill"} />;

// Onboarding Icons
export const IconShield = ({ className, size = 24, color, weight }: IconProps) => <ShieldCheck className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconFile = ({ className, size = 24, color, weight }: IconProps) => <FileText className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconFileCheck = ({ className, size = 24, color, weight }: IconProps) => <FileText className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconUpload = ({ className, size = 24, color, weight }: IconProps) => <UploadSimple className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconCamera = ({ className, size = 24, color, weight }: IconProps) => <Camera className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconPhone = ({ className, size = 24, color, weight }: IconProps) => <Phone className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconGift = ({ className, size = 24, color, weight }: IconProps) => <Gift className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconBike = ({ className, size = 24, color, weight }: IconProps) => <Bicycle className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconInfo = ({ className, size = 24, color, weight }: IconProps) => <Info className={className} size={size} color={color} weight={weight || "bold"} />;

// Tab Icons
export const IconHome = ({ className, size = 24, color, strokeWidth, weight }: IconProps) => <House className={className} size={size} color={color} weight={weight || getWeight(strokeWidth)} />;
export const IconBank = ({ className, size = 24, color, strokeWidth, weight }: IconProps) => <Bank className={className} size={size} color={color} weight={weight || getWeight(strokeWidth)} />;
export const IconSales = ({ className, size = 24, color, strokeWidth, weight }: IconProps) => <TrendUp className={className} size={size} color={color} weight={weight || getWeight(strokeWidth)} />;
export const IconExpenses = ({ className, size = 24, color, strokeWidth, weight }: IconProps) => <Receipt className={className} size={size} color={color} weight={weight || getWeight(strokeWidth)} />;
export const IconChat = ({ className, size = 24, color, strokeWidth, weight }: IconProps) => <ChatCircle className={className} size={size} color={color} weight={weight || getWeight(strokeWidth)} />;

// Action Icons
export const IconNewInvoice = ({ className, size = 24, color, weight }: IconProps) => <FileText className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconAddEntry = ({ className, size = 24, color, weight }: IconProps) => <Plus className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconNewProduct = ({ className, size = 24, color, weight }: IconProps) => <Package className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconStartTrip = ({ className, size = 24, color, weight }: IconProps) => <NavigationArrow className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconScanReceipt = ({ className, size = 24, color, weight }: IconProps) => <Camera className={className} size={size} color={color} weight={weight || "bold"} />;
export const IconUploadReceipt = ({ className, size = 24, color, weight }: IconProps) => <UploadSimple className={className} size={size} color={color} weight={weight || "bold"} />;

// Extra Icons for replacing emojis
export const IconRun = ({ className, size = 24, color, weight }: IconProps) => <PersonSimpleRun className={className} size={size} color={color} weight={weight || "fill"} />;
export const IconSparkle = ({ className, size = 24, color, weight }: IconProps) => <Sparkle className={className} size={size} color={color} weight={weight || "fill"} />;

// Custom Logo Component
export const KlettaLogo = ({ className, color = 'black' }: { className?: string; color?: 'black' | 'white' }) => {
  const fill = color === 'black' ? '#111111' : '#FFFFFF';
  return (
   <svg width="100" height="28" viewBox="0 0 196 55" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_4069_53076)">
    <path d="M160.379 43.5621C160.379 40.2493 161.556 37.6089 163.914 35.6363C166.268 33.6661 169.628 32.458 173.991 32.0144L185.468 30.8252V29.6714C185.468 27.6893 184.855 26.1674 183.63 25.1056C182.405 24.0438 180.721 23.5129 178.573 23.5129C176.311 23.5129 174.532 24.0037 173.238 24.9829C171.943 25.9622 171.308 27.3047 171.332 29.006H161.464C161.535 24.8083 163.189 21.4648 166.434 18.9826C169.676 16.498 174.015 15.2568 179.449 15.2568C184.277 15.2568 188.243 16.5994 191.346 19.2799C194.449 21.9627 195.999 26.0447 195.999 31.526V53.7436H186.832L186.308 47.7951C185.374 49.7087 183.59 51.3062 180.954 52.5898C178.271 53.8262 175.473 54.4444 172.557 54.4444C168.918 54.4444 165.978 53.4463 163.739 51.4525C161.5 49.4586 160.379 46.8277 160.379 43.5621ZM185.466 38.0337V36.9129L176.438 37.9629C172.8 38.3829 170.98 39.8647 170.98 42.4059C170.98 43.6895 171.424 44.6805 172.309 45.379C173.196 46.0797 174.465 46.429 176.122 46.429C178.71 46.429 180.898 45.5724 182.681 43.857C184.465 42.1416 185.393 40.1997 185.463 38.0313L185.466 38.0313Z" fill={fill}/>
    <path d="M149.617 24.5631V39.8531C149.617 41.9531 150.002 43.4349 150.771 44.2961C151.54 45.1597 153.022 45.5915 155.214 45.5915C155.424 45.5915 155.67 45.5797 155.948 45.5561C156.229 45.5325 156.566 45.5089 156.963 45.4853C157.359 45.4617 157.696 45.4381 157.977 45.4145V53.673C155.434 54.1402 153.102 54.3738 150.979 54.3738C147.34 54.3738 144.634 53.6636 142.862 52.2407C141.135 50.7943 140.064 49.2205 139.644 47.5169C139.271 45.6033 139.084 43.6685 139.084 41.7077V24.5631H124.67V39.8531C124.67 41.9295 125.059 43.4042 125.842 44.2796C126.623 45.155 128.075 45.5915 130.198 45.5915C130.385 45.5915 130.618 45.5797 130.899 45.5561C131.18 45.5325 131.534 45.5089 131.966 45.4853C132.397 45.4617 132.765 45.4381 133.067 45.4145V53.673C130.524 54.1402 128.181 54.3738 126.034 54.3738C122.674 54.3738 120.057 53.7155 118.179 52.3965C116.3 51.0798 115.116 49.4517 114.627 47.5145C114.255 45.6009 114.068 43.6661 114.068 41.7073V24.5608H106.126V15.9885H114.068V4.30396H124.67V15.9908H139.084V4.30396H149.615V15.9908H158.572V24.5631H149.615H149.617Z" fill={fill}/>
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
