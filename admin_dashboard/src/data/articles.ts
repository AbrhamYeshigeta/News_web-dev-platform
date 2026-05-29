export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
  slug: string;
  readTime?: string;
  commentsCount?: number;
  status?: 'PUBLISHED' | 'DRAFT';
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'አፕል በ iOS 19 ውስጥ አብዮታዊ የ AI ባህሪያትን ይፋ አደረገ',
    excerpt: 'አዲሱ ዝመና በሁሉም ቤተኛ መተግበሪያዎች ውስጥ የጄኔሬቲቭ ሞዴሎች ጥልቅ ውህደት ያመጣል።',
    category: 'ቴክኖሎጂ',
    imageUrl: 'https://picsum.photos/seed/tech1/800/600',
    author: 'ዳዊት ቼን',
    date: 'ከ 3 ሰዓታት በፊት',
    slug: 'apple-ai-ios-19',
    readTime: '5 ደቂቃ',
    commentsCount: 124,
    status: 'PUBLISHED',
  },
  {
    id: '2',
    title: 'በመካከለኛው ምስራቅ የሰላም ድርድር ዲፕሎማሲያዊ ስኬት',
    excerpt: 'ለወራት ከዘለለ ጠንካራ ድርድር በኋላ ታሪካዊ ስምምነት ተደረሰ።',
    category: 'ዓለም-አቀፍ',
    imageUrl: 'https://picsum.photos/seed/world1/800/600',
    author: 'ኤሌና ሮሲ',
    date: 'ከ 5 ሰዓታት በፊት',
    slug: 'diplomatic-breakthrough-middle-east',
    readTime: '8 ደቂቃ',
    commentsCount: 89,
    status: 'PUBLISHED',
  },
  {
    id: '3',
    title: 'የዋጋ ግሽበት የመቀዝቀዝ ምልክቶች በማሳየቱ የአለም ገበያዎች ተነቃቅተዋል',
    excerpt: 'የአክሲዮን ኢንዴክሶች ከፍተኛ ደረጃ ላይ ደርሰዋል።',
    category: 'ቢዝነስ',
    imageUrl: 'https://picsum.photos/seed/business1/800/600',
    author: 'ማርከስ ቶርን',
    date: 'ከ 2 ሰዓታት በፊት',
    slug: 'global-markets-inflation-cooling',
    readTime: '4 ደቂቃ',
    commentsCount: 230,
    status: 'PUBLISHED',
  },
  {
    id: '4',
    title: 'አዲስ ጥናት የሜዲትራኒያን አመጋገብ ጥቅሞችን አረጋግጧል',
    excerpt: 'የረጅም ጊዜ ምርምር ላይ ከፍተኛ የእውቀት መሻሻል ታይቷል።',
    category: 'ጤና',
    imageUrl: 'https://picsum.photos/seed/health1/800/600',
    author: 'ዶ/ር ሳራ ስሚዝ',
    date: '1 ቀን በፊት',
    slug: 'mediterranean-diet-benefits',
    readTime: '6 ደቂቃ',
    commentsCount: 45,
    status: 'DRAFT',
  },
  {
    id: '5',
    title: 'ያልተጠበቀው ቡድን ለሻምፒዮናው ፍፃሜ አለፈ',
    excerpt: 'ባልተጠበቀ ውጤት የወቅቱን ሻምፒዮናዎች በትእይንት አሸንፏል።',
    category: 'ስፖርት',
    imageUrl: 'https://picsum.photos/seed/sports1/800/600',
    author: 'ማይክ ጆንሰን',
    date: 'ከ 4 ሰዓታት በፊት',
    slug: 'underdog-championship-finals',
    readTime: '3 ደቂቃ',
    commentsCount: 341,
    status: 'PUBLISHED',
  },
];
