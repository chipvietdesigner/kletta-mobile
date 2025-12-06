import React from 'react';
import { 
  ArrowLeft, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  Home, 
  Landmark, 
  TrendingUp, 
  Receipt, 
  MessageCircle,
  FileText,
  Plus,
  Package,
  Navigation,
  Camera,
  Upload,
  Check,
  X,
  Search,
  ArrowRight,
  User,
  Filter,
  MoreHorizontal,
  Send,
  Paperclip,
  Briefcase,
  Monitor,
  Car,
  Trash2,
  RefreshCw,
  Clock,
  PieChart,
  ShieldCheck,
  FileCheck,
  Phone,
  Gift,
  Bike,
  Info
} from 'lucide-react';
import { IconProps } from '../types';

export const IconBack = ({ className, size = 24, color = "currentColor" }: IconProps) => <ArrowLeft className={className} size={size} color={color} />;
export const IconSettings = ({ className, size = 24, color = "currentColor" }: IconProps) => <Settings className={className} size={size} color={color} />;
export const IconChevronDown = ({ className, size = 24, color = "currentColor" }: IconProps) => <ChevronDown className={className} size={size} color={color} />;
export const IconChevronRight = ({ className, size = 24, color = "currentColor" }: IconProps) => <ChevronRight className={className} size={size} color={color} />;
export const IconCheck = ({ className, size = 24, color = "currentColor" }: IconProps) => <Check className={className} size={size} color={color} />;
export const IconClose = ({ className, size = 24, color = "currentColor" }: IconProps) => <X className={className} size={size} color={color} />;
export const IconArrowRight = ({ className, size = 24, color = "currentColor" }: IconProps) => <ArrowRight className={className} size={size} color={color} />;
export const IconPlus = ({ className, size = 24, color = "currentColor" }: IconProps) => <Plus className={className} size={size} color={color} />;
export const IconSearch = ({ className, size = 24, color = "currentColor" }: IconProps) => <Search className={className} size={size} color={color} />;
export const IconUser = ({ className, size = 24, color = "currentColor" }: IconProps) => <User className={className} size={size} color={color} />;
export const IconFilter = ({ className, size = 24, color = "currentColor" }: IconProps) => <Filter className={className} size={size} color={color} />;
export const IconMore = ({ className, size = 24, color = "currentColor" }: IconProps) => <MoreHorizontal className={className} size={size} color={color} />;
export const IconSend = ({ className, size = 24, color = "currentColor" }: IconProps) => <Send className={className} size={size} color={color} />;
export const IconPaperclip = ({ className, size = 24, color = "currentColor" }: IconProps) => <Paperclip className={className} size={size} color={color} />;
export const IconBriefcase = ({ className, size = 24, color = "currentColor" }: IconProps) => <Briefcase className={className} size={size} color={color} />;
export const IconMonitor = ({ className, size = 24, color = "currentColor" }: IconProps) => <Monitor className={className} size={size} color={color} />;
export const IconCar = ({ className, size = 24, color = "currentColor" }: IconProps) => <Car className={className} size={size} color={color} />;
export const IconTrash = ({ className, size = 24, color = "currentColor" }: IconProps) => <Trash2 className={className} size={size} color={color} />;
export const IconRefresh = ({ className, size = 24, color = "currentColor" }: IconProps) => <RefreshCw className={className} size={size} color={color} />;
export const IconClock = ({ className, size = 24, color = "currentColor" }: IconProps) => <Clock className={className} size={size} color={color} />;
export const IconPieChart = ({ className, size = 24, color = "currentColor" }: IconProps) => <PieChart className={className} size={size} color={color} />;

// Onboarding Icons
export const IconShield = ({ className, size = 24, color }: IconProps) => <ShieldCheck className={className} size={size} color={color} />;
export const IconFile = ({ className, size = 24, color }: IconProps) => <FileText className={className} size={size} color={color} />;
export const IconFileCheck = ({ className, size = 24, color }: IconProps) => <FileCheck className={className} size={size} color={color} />;
export const IconUpload = ({ className, size = 24, color }: IconProps) => <Upload className={className} size={size} color={color} />;
export const IconCamera = ({ className, size = 24, color }: IconProps) => <Camera className={className} size={size} color={color} />;
export const IconPhone = ({ className, size = 24, color }: IconProps) => <Phone className={className} size={size} color={color} />;
export const IconGift = ({ className, size = 24, color }: IconProps) => <Gift className={className} size={size} color={color} />;
export const IconBike = ({ className, size = 24, color }: IconProps) => <Bike className={className} size={size} color={color} />;
export const IconInfo = ({ className, size = 24, color }: IconProps) => <Info className={className} size={size} color={color} />;

// Tab Icons
export const IconHome = ({ className, size = 24, color, strokeWidth }: IconProps) => <Home className={className} size={size} color={color} strokeWidth={strokeWidth} />;
export const IconBank = ({ className, size = 24, color, strokeWidth }: IconProps) => <Landmark className={className} size={size} color={color} strokeWidth={strokeWidth} />;
export const IconSales = ({ className, size = 24, color, strokeWidth }: IconProps) => <TrendingUp className={className} size={size} color={color} strokeWidth={strokeWidth} />;
export const IconExpenses = ({ className, size = 24, color, strokeWidth }: IconProps) => <Receipt className={className} size={size} color={color} strokeWidth={strokeWidth} />;
export const IconChat = ({ className, size = 24, color, strokeWidth }: IconProps) => <MessageCircle className={className} size={size} color={color} strokeWidth={strokeWidth} />;

// Action Icons
export const IconNewInvoice = ({ className, size = 24, color }: IconProps) => <FileText className={className} size={size} color={color} />;
export const IconAddEntry = ({ className, size = 24, color }: IconProps) => <Plus className={className} size={size} color={color} />;
export const IconNewProduct = ({ className, size = 24, color }: IconProps) => <Package className={className} size={size} color={color} />;
export const IconStartTrip = ({ className, size = 24, color }: IconProps) => <Navigation className={className} size={size} color={color} />;
export const IconScanReceipt = ({ className, size = 24, color }: IconProps) => <Camera className={className} size={size} color={color} />;
export const IconUploadReceipt = ({ className, size = 24, color }: IconProps) => <Upload className={className} size={size} color={color} />;

// Custom Logo Component
export const KlettaLogo = ({ className, color = 'black' }: { className?: string; color?: 'black' | 'white' }) => {
  const fill = color === 'black' ? '#111111' : '#FFFFFF';
  return (
   <svg width="196" height="55" viewBox="0 0 196 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_4069_53076)">
    <path d="M160.379 43.5621C160.379 40.2493 161.556 37.6089 163.914 35.6363C166.268 33.6661 169.628 32.458 173.991 32.0144L185.468 30.8252V29.6714C185.468 27.6893 184.855 26.1674 183.63 25.1056C182.405 24.0438 180.721 23.5129 178.573 23.5129C176.311 23.5129 174.532 24.0037 173.238 24.9829C171.943 25.9622 171.308 27.3047 171.332 29.006H161.464C161.535 24.8083 163.189 21.4648 166.434 18.9826C169.676 16.498 174.015 15.2568 179.449 15.2568C184.277 15.2568 188.243 16.5994 191.346 19.2799C194.449 21.9627 195.999 26.0447 195.999 31.526V53.7436H186.832L186.308 47.7951C185.374 49.7087 183.59 51.3062 180.954 52.5898C178.271 53.8262 175.473 54.4444 172.557 54.4444C168.918 54.4444 165.978 53.4463 163.739 51.4525C161.5 49.4586 160.379 46.8277 160.379 43.5621ZM185.466 38.0337V36.9129L176.438 37.9629C172.8 38.3829 170.98 39.8647 170.98 42.4059C170.98 43.6895 171.424 44.6805 172.309 45.379C173.196 46.0797 174.465 46.429 176.122 46.429C178.71 46.429 180.898 45.5724 182.681 43.857C184.465 42.1416 185.393 40.1997 185.463 38.0313L185.466 38.0337Z" fill={fill}/>
    <path d="M149.617 24.5631V39.8531C149.617 41.9531 150.002 43.4349 150.771 44.2961C151.54 45.1597 153.022 45.5915 155.214 45.5915C155.424 45.5915 155.67 45.5797 155.948 45.5561C156.229 45.5325 156.566 45.5089 156.963 45.4853C157.359 45.4617 157.696 45.4381 157.977 45.4145V53.673C155.434 54.1402 153.102 54.3738 150.979 54.3738C147.34 54.3738 144.634 53.6636 142.862 52.2407C141.135 50.7943 140.064 49.2205 139.644 47.5169C139.271 45.6033 139.084 43.6685 139.084 41.7077V24.5631H124.67V39.8531C124.67 41.9295 125.059 43.4042 125.842 44.2796C126.623 45.155 128.075 45.5915 130.198 45.5915C130.385 45.5915 130.618 45.5797 130.899 45.5561C131.18 45.5325 131.534 45.5089 131.966 45.4853C132.397 45.4617 132.765 45.4381 133.067 45.4145V53.673C130.524 54.1402 128.181 54.3738 126.034 54.3738C122.674 54.3738 120.057 53.7155 118.179 52.3965C116.3 51.0798 115.116 49.4517 114.627 47.5145C114.255 45.6009 114.068 43.6661 114.068 41.7053V24.5608H106.126V15.9885H114.068V4.30396H124.67V15.9908H139.084V4.30396H149.615V15.9908H158.572V24.5631H149.615H149.617Z" fill={fill}/>
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